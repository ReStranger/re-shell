import { bind } from "astal";
import Wp from "gi://AstalWp";

export default function () {
    try {
        const speaker = Wp.get_default()?.audio.defaultSpeaker!;
        return (
            <box className="AudioSlider">
                <icon icon={bind(speaker, "volumeIcon")} />
                <slider
                    hexpand
                    onDragged={({ value }) => (speaker.volume = value)}
                    value={bind(speaker, "volume")}
                />
            </box>
        );
    } catch (error) {
        return <box className="AudioSlider" />;
    }
}
