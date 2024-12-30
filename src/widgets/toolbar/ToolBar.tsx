import { Gtk } from "astal/gtk3";
import PopupWindow from "../PopupWindow";

export default function () {
    return (
        <PopupWindow
            name={"tool-bar"}
            layout="top-left"
            transition={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        >
            <box className="ToolBar" vertical>
                <box className="head" vertical>
                    <box>
                        <button>
                            <label label="APIs" />
                        </button>
                        <button>
                            <label label="Tools" />
                        </button>
                    </box>
                    <box className="sourceChoice">
                        <button></button>
                        <button></button>
                        <button></button>
                    </box>
                </box>
            </box>
        </PopupWindow>
    );
}
