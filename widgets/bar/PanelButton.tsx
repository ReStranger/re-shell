import { Gtk } from "ags/gtk4";
import { toggleClassName } from "lib/utils";
import { CCProps } from "ags";
import options from "options";
import app from "ags/gtk4/app";

type PanelButtonProps = CCProps<Gtk.Button, Gtk.Button.ConstructorProps> & {
    window?: string;
    flat?: boolean;
};

export default ({
    window = "",
    flat,
    children,
    $,
    ...rest
}: PanelButtonProps) => (
    <button
        $={(self) => {
            let open = false;
            toggleClassName(self, "panel-button");
            toggleClassName(self, window);

            toggleClassName(
                self,
                "flat",
                flat ?? options.bar.flatButtons.getValue(),
            );
            app.connect("window-toggled", (_, win: Gtk.Window) => {
                const winName = win.get_name() ?? win.name;
                if (winName !== window) return;

                const isVisible = win.is_visible?.() ?? win.visible;
                if (open && isVisible === false) {
                    open = false;
                    toggleClassName(self, "active", false);
                }
                if (isVisible) {
                    open = true;
                    toggleClassName(self, "active");
                }
            });

            if ($) $(self);
        }}
        {...rest}
    >
        <box>{children}</box>
    </button>
);
