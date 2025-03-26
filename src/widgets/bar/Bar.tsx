import { App, Astal, Gdk } from "astal/gtk4";

const Left = () => <box></box>;

const Center = () => (
    <box>
        <label label="ags" />
    </box>
);

const Right = () => <box></box>;

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

    return (
        <window
            visible
            cssClasses={["bar"]}
            name={"bar"}
            namespace={"bar"}
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            application={App}
        >
            <centerbox cssName="centerbox">
                <Left />
                <Center />
                <Right />
            </centerbox>
        </window>
    );
}
