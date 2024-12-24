import { App, Gtk } from "astal/gtk3";
import Apps from "gi://AstalApps";

const hide = () => {
    App.get_window("AppLauncher")!.hide();
};

interface AppButtonProps {
    app: Apps.Application;
}

export default function ({ app }: AppButtonProps) {
    return (
        <button
            className="AppButton"
            onClicked={() => {
                hide();
                app.launch();
            }}
        >
            <box>
                <icon icon={app.iconName} />
                <box valign={Gtk.Align.CENTER} vertical>
                    <label
                        className="name"
                        truncate
                        xalign={0}
                        label={app.name}
                    />
                    {app.description && (
                        <label
                            className="description"
                            maxWidthChars={43}
                            wrap
                            truncate
                            xalign={0}
                            label={app.description}
                        />
                    )}
                </box>
            </box>
        </button>
    );
}
