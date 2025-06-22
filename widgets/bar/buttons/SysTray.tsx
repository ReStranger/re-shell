import AstalTray from "gi://AstalTray";
import { Gtk } from "ags/gtk4";
import { For, createBinding } from "ags";
import { toggleClassName } from "lib/utils";
import options from "options";

export default (flat?: boolean = true) => {
    const Tray = AstalTray.get_default();

    const init = (button: Gtk.MenuButton, item: AstalTray.TrayItem) => {
        button.menuModel = item.menuModel;
        button.insert_action_group("dbusmenu", item.actionGroup);
        createBinding(item, "actionGroup").subscribe(() => {
            button.insert_action_group("dbusmenu", item.actionGroup);
        });
        toggleClassName(
            button,
            "flat",
            flat ?? options.bar.flatButtons.getValue(),
        );
    };

    return (
        <box class={"sys-tray"}>
            <box>
                <For each={createBinding(Tray, "items")}>
                    {(item) => {
                        const trayItem = item as AstalTray.TrayItem;
                        return (
                            <menubutton
                                $={(self) => init(self, trayItem)}
                                class={"tray-item"}
                            >
                                <image gicon={trayItem.gicon} />
                            </menubutton>
                        );
                    }}
                </For>
            </box>
        </box>
    );
};
