import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { Variable } from "astal";
import Apps from "gi://AstalApps";
import AppButton from "./AppButton";
import { handleInput } from "../../lib/utils";
import PopupWindow from "../PopupWindow";

export default function () {
    const { CENTER } = Gtk.Align;
    const apps = new Apps.Apps();

    const text = Variable("");
    const maxItems = text((text) => (text.length === 0 ? 0 : 8));
    const list = text((text) =>
        apps.fuzzy_query(text).slice(0, maxItems.get()),
    );

    const hide = () => {
        App.get_window("AppLauncher")!.hide();
    };

    const onEnter = () => {
        const input = text.get();
        const result = handleInput(input, apps);

        if (typeof result === "string") {
            text.set(result);
            return;
        }

        if (result instanceof Apps.Application) {
            result.launch();
            hide();
            return;
        }
    };

    return (
        <PopupWindow
            name="AppLauncher"
            application={App}
            transition={Gtk.RevealerTransitionType.SLIDE_DOWN}
            layout="top-center"
            onShow={() => text.set("")}
            onKeyPressEvent={function (self, event: Gdk.Event) {
                if (event.get_keyval()[1] === Gdk.KEY_Escape) self.hide();
            }}
        >
            <box
                hexpand={false}
                widthRequest={500}
                className="applauncher"
                vertical
            >
                <entry
                    placeholderText=" Search"
                    text={text()}
                    onChanged={(self) => text.set(self.text)}
                    onActivate={onEnter}
                    setup={(self) => {
                        App.connect("window-toggled", (_, win) => {
                            if (
                                win.name == "AppLauncher" &&
                                win.visible == true
                            ) {
                                self.grab_focus();
                            }
                        });
                    }}
                />
                <box spacing={6} vertical>
                    {list.as((list) =>
                        list.map((app) => <AppButton app={app} />),
                    )}
                </box>
                <box
                    halign={CENTER}
                    className="not-found"
                    vertical
                    visible={list.as(
                        (l) => text.get().length > 0 && l.length === 0,
                    )}
                >
                    <icon icon="system-search-symbolic" />
                    <label label="No match found" />
                </box>
            </box>
        </PopupWindow>
    );
}
