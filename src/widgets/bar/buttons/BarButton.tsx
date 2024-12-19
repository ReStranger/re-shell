import { App, Gtk, Gdk } from "astal/gtk3";
import { ButtonProps } from "astal/gtk3/widget";

type Props = ButtonProps & {
    child?: JSX.Element;
};

export default ({ child, className, onClicked, ...props }: Props) => {
    return (
        <button
            className={`BarItem BarButton ${className}`}
            onClicked={onClicked}
            valign={Gtk.Align.CENTER}
            {...props}
        >
            {child}
        </button>
    );
};
