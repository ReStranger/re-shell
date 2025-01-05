import { bind } from "astal";
import Network from "gi://AstalNetwork";
import Wp from "gi://AstalWp";
import BarButton from "./BarButton";
import { openMenu } from "../../../lib/utils";

function WifiBarIcon() {
    const network = Network.get_default();
    const wifi = bind(network, "wifi");

    return (
        <box visible={wifi.as(Boolean)}>
            {wifi.as(
                (wifi) =>
                    wifi && (
                        <icon
                            tooltipText={bind(wifi, "ssid").as(String)}
                            className="Wifi"
                            icon={bind(wifi, "iconName")}
                        />
                    ),
            )}
        </box>
    );
}
export function AudioBarIcon() {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!;

    return <icon className="AudioBarIcon" icon={bind(speaker, "volumeIcon")} />;
}

export default function () {
    return (
        <BarButton
            className="QSBarItems"
            cursor="pointer"
            onClicked={() => {
                openMenu("quick-settings");
            }}
        >
            <box>
                <WifiBarIcon />
                <AudioBarIcon />
            </box>
        </BarButton>
    );
}
