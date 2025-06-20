import { Astal, Gdk, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { createState } from "node_modules/ags/gnim/src/jsx";
import options from "options";

const [visible, setVisible] = createState(false);
const [revaled, setRevealed] = createState(false);

type LayoutType =
    | "top-right"
    | "top-left"
    | "top-center"
    | "center"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center";

type PopupWindowProps = Omit<Astal.Window.ConstructorProps, "name"> & {
    name: string;
    layout?: LayoutType;
    transition?: Gtk.RevealerTransitionType;
    children: any;
};

function Padding(winName: string) {
    return (
        <button
            cssClasses={["button-padding"]}
            canFocus={false}
            $clicked={() => app.get_window(winName)?.hide()}
            hexpand
            vexpand
        />
    );
}

const PopupRevealer = (
    name: string,
    transition: Gtk.RevealerTransitionType,
    children: any,
) => (
    <box css={"padding: 1px;"}>
        <revealer
            transitionType={transition}
            transitionDuration={options.transition.getValue()}
            revealChild={revaled}
            $={(self) => {
                self.connect("notify::child-revealed", ({ childRevealed }) =>
                    setVisible(childRevealed),
                );
            }}
        >
            <box class={"window-content"}>{children}</box>
        </revealer>
    </box>
);

type LayoutProps = {
    name: string;
    position: LayoutType;
    transition: Gtk.RevealerTransitionType;
    children: any;
};

const Layout = ({ name, children, position, transition }: LayoutProps) => {
    switch (position) {
        case "top-right":
            return (
                <box>
                    {Padding(name)}
                    <box hexpand={false} orientation={Gtk.Orientation.VERTICAL}>
                        {PopupRevealer(name, transition, children)}
                        {Padding(name)}
                    </box>
                </box>
            );
        case "top-center":
            return (
                <box>
                    {Padding(name)}
                    <box hexpand={false} orientation={Gtk.Orientation.VERTICAL}>
                        {PopupRevealer(name, transition, children)}
                        {Padding(name)}
                    </box>
                    {Padding(name)}
                </box>
            );
        case "top-left":
            return (
                <box>
                    <box hexpand={false} orientation={Gtk.Orientation.VERTICAL}>
                        {PopupRevealer(name, transition, children)}
                        {Padding(name)}
                    </box>
                    {Padding(name)}
                </box>
            );
        case "bottom-right":
            return (
                <box>
                    {Padding(name)}
                    <box hexpand={false} orientation={Gtk.Orientation.VERTICAL}>
                        {Padding(name)}
                        {PopupRevealer(name, transition, children)}
                    </box>
                </box>
            );
        case "bottom-center":
            return (
                <box>
                    {Padding(name)}
                    <box hexpand={false} orientation={Gtk.Orientation.VERTICAL}>
                        {Padding(name)}
                        {PopupRevealer(name, transition, children)}
                    </box>
                    {Padding(name)}
                </box>
            );
        case "bottom-left":
            return (
                <box>
                    <box hexpand={false} orientation={Gtk.Orientation.VERTICAL}>
                        {Padding(name)}
                        {PopupRevealer(name, transition, children)}
                    </box>
                    {Padding(name)}
                </box>
            );
        default:
            return (
                <box orientation={Gtk.Orientation.VERTICAL}>
                    {Padding(name)}
                    <box>
                        {Padding(name)}
                        {PopupRevealer(name, transition, children)}
                        {Padding(name)}
                    </box>
                    {Padding(name)}
                </box>
            );
    }
};

export default ({
    name,
    children,
    layout = "center",
    transition = Gtk.RevealerTransitionType.SLIDE_DOWN,
}: PopupWindowProps) => {
    const { TOP, BOTTOM, RIGHT, LEFT } = Astal.WindowAnchor;

    function show() {
        setVisible(true);
        setRevealed(true);
    }
    function hide() {
        setRevealed(false);
    }

    function init(self: Gtk.Window) {
        // override existing show and hide methods
        Object.assign(self, { show, hide });
    }

    return (
        <window
            visible={visible}
            name={name}
            namespace={name}
            cssClasses={[name, "popup-window"]}
            keymode={Astal.Keymode.ON_DEMAND}
            layer={Astal.Layer.TOP}
            anchor={TOP | BOTTOM | RIGHT | LEFT}
            $={init}
            application={app}
        >
            <Gtk.EventControllerKey
                $key-pressed={({ widget }, keyval: number) => {
                    if (keyval === Gdk.KEY_Escape) {
                        widget.hide();
                    }
                }}
            />
            <Layout name={name} position={layout} transition={transition}>
                {children}
            </Layout>
        </window>
    );
};
