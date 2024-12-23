import { Astal, App, Gtk } from "astal/gtk3";
import PopupWindow from "../PopupWindow";
import { openMenu } from "../../lib/utils";

export default function () {
    return (
        <PopupWindow
            name={"quick-settings"}
            transition={Gtk.RevealerTransitionType.SLIDE_DOWN}
            className="QuickSettings"
        >
            <box
                className="QuickSettings"
                vertical
                valign={Gtk.Align.START}
            ></box>
        </PopupWindow>
    );
}
