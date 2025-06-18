/* eslint-disable max-len */
import { type Opt } from "lib/options";
import options from "options";
import { monitorFile, writeFileAsync } from "ags/file";
import app from "ags/gtk4/app";
import { bash, dependencies } from "lib/utils";

const deps = [
  "font",
  "theme",
  "bar.corners",
  "bar.flatButtons",
  "bar.position",
  "bar.battery.charging",
  "bar.battery.blocks",
];

const { dark, light, blur, scheme } = options.theme;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const t = (dark: Opt<any> | string, light: Opt<any> | string) =>
  scheme.getValue() === "dark" ? `${dark}` : `${light}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const $ = (name: string, value: string | Opt<any>) => `$${name}: ${value};`;
const variables = () => [
  $(
    "bg",
    blur.getValue()
      ? `transparentize(${t(dark.bg.getValue(), light.bg.getValue())}, ${blur.getValue() / 100})`
      : t(dark.bg.getValue(), light.bg.getValue()),
  ),
  $("fg", t(dark.fg.getValue(), light.fg.getValue())),
];

async function resetCss() {
  if (!dependencies("sass", "fd")) return;

  try {
    const vars = `${TMP}/variables.scss`;
    const scss = `${TMP}/main.scss`;
    const css = `${TMP}/main.css`;

    const fd = await bash(`fd ".scss" ${SRC}`);
    const files = fd.split(/\s+/);
    const imports = [vars, ...files].map((f) => `@import '${f}';`);

    await writeFileAsync(vars, variables().join("\n"));
    await writeFileAsync(scss, imports.join("\n"));
    await bash`sass ${scss} ${css}`;

    app.apply_css(css, true);
  } catch (error) {
    error instanceof Error ? logError(error) : console.error(error);
  }
}

monitorFile(`${SRC}/style`, resetCss);
options.handler(deps, resetCss);
await resetCss();
