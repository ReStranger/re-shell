import { Astal, App, Gtk } from "astal/gtk3";
import PopupWindow from "../PopupWindow";
import { openMenu } from "../../lib/utils";
import AudioSlider from "./sliders/AudioSlider";
import MediaPlayer from "../mediaplayer/MediaPlayer";

export default function () {
    return (
        <PopupWindow
            name={"quick-settings"}
            layout="top-center"
            transition={Gtk.RevealerTransitionType.SLIDE_DOWN}
        >
            <box className="QuickSettings" vertical valign={Gtk.Align.START}>
                <box className="SliderSection" vertical>
                    <AudioSlider />
                </box>
                <MediaPlayer />
            </box>
        </PopupWindow>
    );
}
