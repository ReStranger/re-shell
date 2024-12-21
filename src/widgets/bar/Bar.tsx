import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import Clock from "./buttons/Clock";
import WindowName from "./buttons/WindowName";

const Start = () => {
    return (
        <box halign={Gtk.Align.START} className="Start">
            <WindowName />
        </box>
    );
};

const Center = () => {
    return (
        <box className="Center">
            <Clock />
        </box>
    );
};

const End = () => {
    return <box halign={Gtk.Align.END} className="End"></box>;
};

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
    return (
        <window
            className="Bar"
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            application={App}
        >
            <centerbox>
                <Start />
                <Center />
                <End />
            </centerbox>
        </window>
    );
}
