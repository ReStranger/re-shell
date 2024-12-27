import { bind } from "astal";
import AstalWp from "gi://AstalWp?version=0.1";
import icons from "../../../lib/icons";
import BrightnessService from "../../../lib/services/brightness";

export default function () {
    return (
        <box className="BrightnessSlider">
            <icon icon={icons.brightness.screen} />
            <slider
                hexpand
                onDragged={({ value }) => (BrightnessService!.screen = value)}
                value={bind(BrightnessService).as((b) => b.screen)}
            />
        </box>
    );
}
