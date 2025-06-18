import GLib from "gi://GLib";
import { execAsync, exec } from "ags/process";

/**
 * @returns execAsync(["bash", "-c", cmd])
 */
export async function bash(
  strings: TemplateStringsArray | string,
  ...values: unknown[]
) {
  const cmd =
    typeof strings === "string"
      ? strings
      : strings.flatMap((str, i) => str + `${values[i] ?? ""}`).join("");

  return execAsync(["bash", "-c", cmd]).catch((err) => {
    console.error(cmd, err);
    return "";
  });
}

export function ensureDirectory(path: string) {
  if (!GLib.file_test(path, GLib.FileTest.IS_DIR)) {
    GLib.mkdir_with_parents(path, 0o755);
  }
}

/**
 * @returns true if all of the `bins` are found
 */
export function dependencies(...bins: string[]) {
  const missing = bins.filter((bin) => {
    try {
      exec(["which", bin]);
      return false;
    } catch {
      return true;
    }
  });

  if (missing.length > 0) {
    console.warn(`Missing dependencies: ${missing.join(", ")}`);
  }

  return missing.length === 0;
}
