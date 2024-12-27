import { Gtk, Widget } from "astal/gtk3";
import icons from "../../../lib/icons";
import Binding, { Subscribable } from "astal/binding";
import Astal from "gi://Astal?version=3.0";

type QSButtonProps = {
    icon: Widget.IconProps["icon"];
    label: Widget.LabelProps["label"];
    menuName?: string;
    connection?: [Subscribable<unknown>, () => boolean];
    className?: Widget.ButtonProps["className"];
} & Widget.ButtonProps;

export default function ({
    icon,
    label,
    menuName,
    connection,
    className = "",
    ...props
}: QSButtonProps) {
    return (
        <box className={`QSButton ${className}`}>
            <button className="QSToggle">
                <box halign={Gtk.Align.START}>
                    <icon icon={icon} halign={Gtk.Align.START} />
                    <label label={label} halign={Gtk.Align.START} />
                </box>
            </button>

            {menuName && (
                <button className="QSToggleMenu">
                    <icon icon={icons.ui.arrow.right} />
                </button>
            )}
        </box>
    );
}
