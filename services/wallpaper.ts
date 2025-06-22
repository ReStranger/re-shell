import { dependencies, sh } from "lib/utils";
import GObject, { register } from "ags/gobject";
import GLib from "gi://GLib";
import { execAsync } from "ags/process";
import { monitorFile } from "ags/file";

const currentWallpaper = `/home/${GLib.get_user_name()}/.config/background`;

@register({ GTypeName: "Wallpaper" })
class Wallpaper extends GObject.Object {
    #subscribers = new Set<() => void>();

    subscribe(callback: () => void): () => void {
        this.#subscribers.add(callback);
        return () => this.#subscribers.delete(callback);
    }

    #blockMonitor = false;

    #wallpaper() {
        if (!dependencies("swww")) return;

        sh("hyprctl cursorpos")
            .then((pos) => {
                sh([
                    "swww",
                    "img",
                    "--invert-y",
                    "--transition-type",
                    "grow",
                    "--transition-pos",
                    pos.replace(" ", ""),
                    currentWallpaper,
                ])
                    .then(() => {
                        this.#subscribers.forEach((cb) => cb());
                    })
                    .catch((e) => console.log("ошибка swww", e));
            })
            .catch(() => () => console.log("ошибка hyprctl"));
    }
    async #setWallpaper(path: string) {
        this.#blockMonitor = true;

        await sh(`cp ${path} ${currentWallpaper}`);
        this.#wallpaper();

        this.#blockMonitor = false;
    }
    readonly set = (properties: { path: string }) => {
        this.#setWallpaper(properties.path);
    };

    get wallpaper() {
        return currentWallpaper;
    }
    constructor() {
        super();

        if (!dependencies("swww")) return this;

        // gtk portal
        monitorFile(currentWallpaper, () => {
            if (!this.#blockMonitor) this.#wallpaper();
        });

        execAsync("swww-daemon")
            .then(this.#wallpaper)
            .catch(() => null);
    }
    emitChanged() {
        this.emit("wallpaper");
    }
}

export default new Wallpaper();
