import { bind } from "astal";
import { App, Gtk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import BarButton from "./BarButton";

export default function () {
    const hypr = Hyprland.get_default();
    const focused = bind(hypr, "focusedClient");

    return (
        <BarButton className="Focused" visible={focused.as(Boolean)}>
            {focused.as(
                (client) =>
                    client && (
                        <label
                            label={bind(client, "title").as((title) =>
                                title
                                    ? title.length > 25
                                        ? title.substring(0, 25) + " ..."
                                        : title
                                    : "",
                            )}
                        />
                    ),
            )}
        </BarButton>
    );
}
