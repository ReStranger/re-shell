import app from "ags/gtk4/app";
import { Astal, Gtk, Gdk } from "ags/gtk4";
import Date from "./buttons/Date";
import options from "options";
import SysTray from "widgets/bar/buttons/SysTray";

const { position } = options.bar;

const StartWidget = () => (
    <box _type="start" hexpand halign={Gtk.Align.CENTER}></box>
);
const CenterWidget = () => (
    <box _type="center">
        <Date />
    </box>
);

const EndWidget = () => (
    <box _type="end" hexpand halign={Gtk.Align.END}>
        <SysTray />
    </box>
);

export default (gdkmonitor: Gdk.Monitor) => {
    const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;

    return (
        <window
            visible
            name={`bar${gdkmonitor}`}
            class="bar"
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={
                (position.getValue() === "top" ? TOP : BOTTOM) | LEFT | RIGHT
            }
            application={app}
        >
            <centerbox
                cssName="centerbox"
                css={"min-width: 2px; min-height: 2px;"}
            >
                <StartWidget />
                <CenterWidget />
                <EndWidget />
            </centerbox>
        </window>
    );
};
