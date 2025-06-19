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

const {
    dark,
    light,
    blur,
    scheme,
    padding,
    spacing,
    radius,
    shadows,
    border,
    widget,
} = options.theme;

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
    $("primary-bg", t(dark.primary.bg.getValue(), light.primary.bg.getValue())),
    $("primary-fg", t(dark.primary.fg.getValue(), light.primary.fg.getValue())),

    $("error-bg", t(dark.error.bg.getValue(), light.error.bg.getValue())),
    $("error-fg", t(dark.error.fg.getValue(), light.error.fg.getValue())),

    $("scheme", scheme.getValue()),
    $("padding", `${padding.getValue()}pt`),
    $("spacing", `${spacing.getValue()}pt`),
    $("radius", `${radius.getValue()}px`),
    $("transition", `${options.transition.getValue()}ms`),

    $("shadows", `${shadows.getValue()}`),

    $(
        "widget-bg",
        `transparentize(${t(dark.widget.getValue(), light.widget.getValue())}, ${widget.opacity.getValue() / 100})`,
    ),

    $(
        "hover-bg",
        `transparentize(${t(dark.widget.getValue(), light.widget.getValue())}, ${(widget.opacity.getValue() * 0.9) / 100})`,
    ),
    $("hover-fg", `lighten(${t(dark.fg.getValue(), light.fg.getValue())}, 8%)`),

    $("border-width", `${border.width.getValue()}px`),
    $(
        "border-color",
        `transparentize(${t(dark.border.getValue(), light.border.getValue())}, ${border.opacity.getValue() / 100})`,
    ),
    $("border", "$border-width solid $border-color"),
    $(
        "active-gradient",
        `linear-gradient(to right, ${t(dark.primary.bg.getValue(), light.primary.bg.getValue())}, darken(${t(dark.primary.bg.getValue(), light.primary.bg.getValue())}, 4%))`,
    ),
    $("shadow-color", t("rgba(0,0,0,.6)", "rgba(0,0,0,.4)")),

    $("bar-position", options.bar.position.getValue()),
    $("hyprland-gaps-multiplier", `${options.hyprland.gaps.getValue()}`),
    $("screen-corner-multiplier", `${options.bar.corners.getValue() * 0.01}`),
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
        if (error instanceof Error) {
            logError(error);
        } else {
            console.error(error);
        }
    }
}

monitorFile(`${SRC}/styles`, resetCss);
options.handler(deps, resetCss);
await resetCss();
