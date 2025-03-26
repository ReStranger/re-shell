import { hook } from "astal/_astal";
import { App } from "astal/gtk4";
import { ButtonProps } from "astal/gtk4/widget";

type PanelButtonProps = ButtonProps & {
    window?: string;
};

export default ({ window = "", child, setup, ...rest }: PanelButtonProps) => (
    <button
        setup={(self) => {
            let open = false;

            self.add_css_class("panel-button");
            self.add_css_class(window);

            hook(self, App, (_, win, visible) => {
                if (win !== window) return;

                if (open && !visible) {
                    open = false;
                    self.remove_css_class("active");
                }

                if (visible) {
                    open = true;
                    self.add_css_class("active");
                }
            });
            if (setup) setup(self);
        }}
        {...rest}
    >
        {child}
    </button>
);
