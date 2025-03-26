import { Astal, Gdk } from "astal/gtk4";

export default (gdkmonitor: Gdk.Monitor) => {
    const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;
    return (
        <window
            cssClasses={["screen-corner"]}
            name={"screen-corner"}
            namespace={"screen-corner"}
            gdkmonitor={gdkmonitor}
            anchor={TOP | BOTTOM | LEFT | RIGHT}
            layer={Astal.Layer.BOTTOM}
            visible={true}
        >
            <box cssClasses={["shadow"]}>
                <box cssClasses={["border"]} vexpand hexpand>
                    <box cssClasses={["corner"]} vexpand hexpand />
                </box>
            </box>
        </window>
    );
};
