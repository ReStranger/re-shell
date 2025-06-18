import GLib from "gi://GLib";

export function ensureDirectory(path: string) {
  if (!GLib.file_test(path, GLib.FileTest.IS_DIR)) {
    GLib.mkdir_with_parents(path, 0o755);
  }
}
