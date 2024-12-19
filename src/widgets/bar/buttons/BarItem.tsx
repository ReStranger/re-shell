import { App, Gtk, Gdk } from "astal/gtk3";
import { BoxProps } from "astal/gtk3/widget";

type Props = BoxProps & {
    child?: JSX.Element;
};

export default ({ child, className, ...props }: Props) => {
    return (
        <box
            className={`BarItem  ${className}`}
            valign={Gtk.Align.CENTER}
            {...props}
        >
            {child}
        </box>
    );
};
