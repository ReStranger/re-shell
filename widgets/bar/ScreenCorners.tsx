import { Astal, Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { toggleClassName } from "lib/utils";
import options from "options";

const { corners, transparent } = options.bar;

export default (gdkmonitor: Gdk.Monitor) => {
    const { TOP, BOTTOM, RIGHT, LEFT } = Astal.WindowAnchor;
    const name = "screen-corner";

    return (
        <window
            visible
            name={`${name}${gdkmonitor}`}
            namespace={name}
            cssClasses={[name]}
            anchor={TOP | BOTTOM | RIGHT | LEFT}
            layer={Astal.Layer.BOTTOM}
            gdkmonitor={gdkmonitor}
            application={app}
            $={(self) => {
                toggleClassName(self, "corners", corners.getValue() > 0);
                toggleClassName(self, "hidden", transparent.getValue());
            }}
        >
            <box class="shadow">
                <box class="border" vexpand hexpand>
                    <box class="corner" vexpand hexpand />
                </box>
            </box>
        </window>
    );
};
