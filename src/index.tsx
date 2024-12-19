import { App } from "astal/gtk3";
import scss from "./styles/index.scss";
import Bar from "./widgets/bar/Bar";
import ScreenCorners from "./widgets/bar/ScreenCorners";

export default function () {
    App.start({
        css: scss,
        gtkTheme: "adw-gtk3",
        main() {
            App.get_monitors().map(Bar);
            App.get_monitors().map(ScreenCorners);
        },
    });
}
