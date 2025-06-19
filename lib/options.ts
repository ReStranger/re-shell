import { Variable } from "lib/variable";
import { readFile, writeFile, monitorFile } from "ags/file";
import { ensureDirectory } from "lib/utils";

type OptProps = {
    persistent?: boolean;
};

export class Opt<T = unknown> extends Variable<T> {
    constructor(initial: T, { persistent = false }: OptProps = {}) {
        super(initial);
        this.initial = initial;
        this.persistent = persistent;
    }
    initial: T;
    id = "";
    persistent: boolean;

    toString() {
        return `${this.getValue}`;
    }
    toJSON() {
        return `opt:${this.getValue}`;
    }

    getValue = (): T => {
        return super.get();
    };

    init(cacheFile: string) {
        const cacheV = JSON.parse(readFile(cacheFile) || "{}")[this.id];
        if (cacheV !== undefined) this.set(cacheV);

        this.subscribe(() => {
            const cache = JSON.parse(readFile(cacheFile) || "{}");
            cache[this.id] = this.getValue;
            writeFile(cacheFile, JSON.stringify(cache, null, 2));
        });
    }
    reset() {
        if (this.persistent) return;

        if (JSON.stringify(this.getValue) !== JSON.stringify(this.initial)) {
            this.set(this.initial);
            return this.id;
        }
    }
}

export const opt = <T>(initial: T, opts?: OptProps) => new Opt(initial, opts);

function getOptions(object: object, path = ""): Opt[] {
    return Object.keys(object).flatMap((key) => {
        const obj: Opt = object[key];
        const id = path ? path + "." + key : key;

        if (obj instanceof Variable) {
            obj.id = id;
            return obj;
        }

        if (typeof obj === "object") return getOptions(obj, id);

        return [];
    });
}

export function mkOptions<T extends object>(cacheFile: string, object: T) {
    for (const opt of getOptions(object)) opt.init(cacheFile);

    ensureDirectory(cacheFile.split("/").slice(0, -1).join("/"));

    const configFile = `${TMP}/config.json`;
    const values = getOptions(object).reduce(
        (obj, { id, getValue }) => ({ [id]: getValue(), ...obj }),
        {},
    );
    writeFile(configFile, JSON.stringify(values, null, 2));

    monitorFile(configFile, () => {
        const cache = JSON.parse(readFile(configFile) || "{}");
        for (const opt of getOptions(object)) {
            if (JSON.stringify(cache[opt.id]) !== JSON.stringify(opt.getValue))
                opt.getValue = cache[opt.id];
        }
    });

    function sleep(ms = 0) {
        return new Promise((r) => setTimeout(r, ms));
    }

    async function reset(
        [opt, ...list] = getOptions(object),
        id = opt?.reset(),
    ): Promise<Array<string>> {
        if (!opt) return sleep().then(() => []);

        return id
            ? [id, ...(await sleep(50).then(() => reset(list)))]
            : await sleep().then(() => reset(list));
    }

    return Object.assign(object, {
        configFile,
        array: () => getOptions(object),
        async reset() {
            return (await reset()).join("\n");
        },
        handler(deps: string[], callback: () => void) {
            for (const opt of getOptions(object)) {
                if (deps.some((i) => opt.id.startsWith(i)))
                    opt.subscribe(callback);
            }
        },
    });
}
