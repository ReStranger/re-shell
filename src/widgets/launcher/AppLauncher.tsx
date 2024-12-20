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
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM}
            exclusivity={Astal.Exclusivity.IGNORE}
            keymode={Astal.Keymode.ON_DEMAND}
            application={App}
            onShow={() => text.set("")}
            onKeyPressEvent={function (self, event: Gdk.Event) {
                if (event.get_keyval()[1] === Gdk.KEY_Escape) self.hide();
            }}
        >
            {/*
            <revealer
                revealChild={false}
                transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
                transitionDuration={400}
                setup={(self) => {
                    App.connect("window-toggled", (app) => {
                        const win = app.get_window("AppLauncher");
                        const vis = win?.get_visible();
                        if (win?.name === "AppLauncher") {
                            self.set_reveal_child(vis ?? false);
                        }
                    });
                }}
            >
        */}
            <box className="AppsList">
                <eventbox widthRequest={1920} expand onClick={hide} />
                <box hexpand={false} vertical>
                    <eventbox heightRequest={100} onClick={hide} />
                    <box widthRequest={500} className="applauncher" vertical>
                        <entry
                            placeholderText=" Search"
                            text={text()}
                            onChanged={(self) => text.set(self.text)}
                            onActivate={onEnter}
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
                    <eventbox className="eventbox" expand onClick={hide} />
                </box>
                <eventbox widthRequest={1920} expand onClick={hide} />
            </box>

            {/*
            </revealer>
            */}
        </PopupWindow>
    );
}
