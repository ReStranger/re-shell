import { Astal, App, Gtk } from "astal/gtk3";
import PopupWindow from "../PopupWindow";
import { toggleWindow } from "../../lib/utils";

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
            <box className="QuickSettings" vertical valign={Gtk.Align.START}>
                <button>sss</button>
                <button>sss</button>
                <button>sss</button>
                <button>sss</button>
                <button>sss</button>
            </box>
        </PopupWindow>
    );
}
