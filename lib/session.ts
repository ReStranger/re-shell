import GLib from "gi://GLib";
import { ensureDirectory } from "lib/utils";

declare global {
    const OPTIONS: string;
    const TMP: string;
    const USER: string;
}

Object.assign(globalThis, {
    OPTIONS: `${GLib.get_user_cache_dir()}/ags/options.json`,
    TMP: `${GLib.get_tmp_dir()}/re-shell`,
    USER: GLib.get_user_name(),
});

ensureDirectory(TMP);
