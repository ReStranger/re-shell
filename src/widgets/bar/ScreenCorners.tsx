import { App, Astal, Gtk, Gdk } from "astal/gtk3";

export default (gdkmonitor: Gdk.Monitor) => {
    const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;
    return (
        <window
            className="screen-corner"
            gdkmonitor={gdkmonitor}
            name={`corner${gdkmonitor}`}
            anchor={TOP | BOTTOM | LEFT | RIGHT}
            clickThrough={true}
            layer={Astal.Layer.BOTTOM}
        >
            <box className="shadow">
                <box className="border" expand={true}>
                    <box className="corner" expand={true} />
                </box>
            </box>
        </window>
    );
};
