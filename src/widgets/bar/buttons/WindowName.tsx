import { bind } from "astal";
import { App, Gtk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import BarButton from "./BarButton";
import { openMenu } from "../../../lib/utils";

export default function () {
    try {
        const hypr = Hyprland.get_default();
        const focused = bind(hypr, "focusedClient");

        return (
            <box className="WindowName">
                <BarButton
                    className="Focused"
                    visible={focused.as(Boolean)}
                    onClick={() => openMenu("tool-bar")}
                >
                    {focused.as(
                        (client) =>
                            client && (
                                <label
                                    label={bind(client, "title").as((title) =>
                                        title
                                            ? title.length > 25
                                                ? title.substring(0, 25) +
                                                  " ..."
                                                : title
                                            : "",
                                    )}
                                />
                            ),
                    )}
                </BarButton>
            </box>
        );
    } catch (error) {
        return;
        <box className="WindowName" />;
    }
}
