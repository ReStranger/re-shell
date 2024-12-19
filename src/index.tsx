import { App } from "astal/gtk3";
import scss from "./styles/index.scss";
import Bar from "./widgets/bar/Bar";
import ScreenCorners from "./widgets/bar/ScreenCorners";
import QuickSettings from "./widgets/quicksettings/QuickSettings";

export default function () {
    App.start({
        css: scss,
        gtkTheme: "adw-gtk3",
        main() {
            App.get_monitors().map(Bar);
            App.get_monitors().map(ScreenCorners);
            App.get_monitors().map(QuickSettings);
        },
    });
}
