import { Astal, App, Gtk } from "astal/gtk3";
import PopupWindow from "../PopupWindow";
import { toggleWindow } from "../../lib/utils";
import Network from "./buttons/Network";

export default function () {
    return (
        <PopupWindow
            valign={Gtk.Align.START}
            visible={false}
            //margin={12}
            name="quick-settings"
            namespace="quick-settings"
            className="QuickSettings"
            layer={Astal.Layer.OVERLAY}
            exclusivity={Astal.Exclusivity.NORMAL}
            keymode={Astal.Keymode.EXCLUSIVE}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            onKeyPressEvent={(self, event) => {
                const [keyEvent, keyCode] = event.get_keycode();
                if (keyEvent && keyCode == 9) {
                    toggleWindow(self.name);
                }
            }}
        >
            <revealer
                revealChild={false}
                transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
                transitionDuration={400}
                setup={(self) => {
                    App.connect("window-toggled", (app) => {
                        const win = app.get_window("quick-settings");
                        const vis = win?.get_visible();
                        if (win?.name === "quick-settings") {
                            self.set_reveal_child(vis ?? false);
                        }
                    });
                }}
            >
                <box
                    className="QuickSettings"
                    vertical
                    valign={Gtk.Align.START}
                >
                    <Network />
                </box>
            </revealer>
        </PopupWindow>
    );
}
