import { App } from "astal/gtk3";
import scss from "./styles/index.scss";
import Bar from "./widgets/bar/Bar";
import ScreenCorners from "./widgets/bar/ScreenCorners";
import QuickSettings from "./widgets/quicksettings/QuickSettings";
import AppLauncher from "./widgets/launcher/AppLauncher";
import NotificationPopups from "./widgets/notificetion/NotificationPopups";
import MediaPlayer from "./widgets/mediaplayer/MediaPlayer";
import ToolBar from "./widgets/toolbar/ToolBar";
import Autor from "./widgets/autor/Autor";

export default function () {
    App.start({
        css: scss,
        gtkTheme: "adw-gtk3",
        main() {
            App.get_monitors().map(Bar);
            App.get_monitors().map(ScreenCorners);
            App.get_monitors().map(QuickSettings);
            App.get_monitors().map(ToolBar);
            App.get_monitors().map(NotificationPopups);
            AppLauncher();
            App.get_window("AppLauncher")!.hide();
            App.get_monitors().map(Autor);
        },
    });
}
