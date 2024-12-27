import { Astal, App, Gtk } from "astal/gtk3";
import PopupWindow from "../PopupWindow";
import { openMenu } from "../../lib/utils";
import AudioSlider from "./sliders/AudioSlider";
import MediaPlayer from "../mediaplayer/MediaPlayer";
import BrightnessSlider from "./sliders/BrightnessSlider";
import QSNetwork from "./buttons/QSNetwork";

export default function () {
    return (
        <PopupWindow
            name={"quick-settings"}
            layout="top-right"
            transition={Gtk.RevealerTransitionType.SLIDE_DOWN}
        >
            <box className="QuickSettings" vertical valign={Gtk.Align.START}>
                <box className="ButtonSection" vertical>
                    <box className="firstLine">
                        <QSNetwork />
                        <QSNetwork />
                    </box>
                    <box className="secondLine">
                        <QSNetwork />
                        <QSNetwork />
                    </box>
                </box>
                <box className="SliderSection" vertical>
                    <AudioSlider />
                    <BrightnessSlider />
                </box>
                <MediaPlayer />
            </box>
        </PopupWindow>
    );
}
