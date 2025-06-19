import { opt, mkOptions } from "lib/options";

const options = mkOptions(OPTIONS, {
    autotheme: opt(false),

    theme: {
        dark: {
            primary: {
                bg: opt("#51a4e7"),
                fg: opt("#141414"),
            },
            error: {
                bg: opt("#e55f86"),
                fg: opt("#141414"),
            },
            bg: opt("#171717"),
            fg: opt("#eeeeee"),
            widget: opt("#eeeeee"),
            border: opt("#eeeeee"),
        },
        light: {
            primary: {
                bg: opt("#426ede"),
                fg: opt("#eeeeee"),
            },
            error: {
                bg: opt("#b13558"),
                fg: opt("#eeeeee"),
            },
            bg: opt("#fffffa"),
            fg: opt("#080808"),
            widget: opt("#080808"),
            border: opt("#080808"),
        },

        blur: opt(0),
        scheme: opt<"dark" | "light">("dark"),
        widget: { opacity: opt(94) },
        border: {
            width: opt(1),
            opacity: opt(96),
        },

        shadows: opt(true),
        padding: opt(7),
        spacing: opt(5),
        radius: opt(15),
    },

    transition: opt(200),

    font: {
        size: opt(13),
        name: opt("Ubuntu Nerd Font"),
    },
    bar: {
        flatButtons: opt(true),
        corners: opt(50),
        transparent: opt(false),
    },
    hyprland: {
        gaps: opt(2.4),
        inactiveBorder: opt("#282828"),
        gapsWhenOnly: opt(false),
    },
    position: opt<"top" | "bottom">("top"),
    date: {
        format: opt("%H:%M - %A %e"),
        // TODO: Uncomment after implementing DateMenu
        // action: opt(app.toggle_window("datemenu")),
    },
});

globalThis["options"] = options;
export default options;
