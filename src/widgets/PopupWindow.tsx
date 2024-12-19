import { App, Astal, Widget } from "astal/gtk3";
import { popupWindowNames } from "../lib/variables";
import { activePopupWindows } from "../lib/utils";

type PopupWindowProps = {} & Widget.WindowProps;

const PopupWindow = ({
    application = App,
    layer = Astal.Layer.OVERLAY,
    keymode = Astal.Keymode.EXCLUSIVE,
    visible = false,
    child,
    setup,
    className,
    ...props
}: PopupWindowProps) => (
    <window
        className={`popup-window ${className}`}
        application={application}
        layer={layer}
        keymode={keymode}
        visible={visible}
        {...props}
        setup={(self) => {
            const windowNames = popupWindowNames;
            windowNames.set([...windowNames.get(), self.name]);

            // Set window visible when it's added to popupWindowNames
            self.set_visible(!!visible);

            self.hook(self, "notify::visible", () => {
                if (!self.visible && activePopupWindows().length === 0) {
                    self.set_visible(false);
                }
            });

            if (setup) setup(self);
        }}
    >
        {child}
    </window>
);

export default PopupWindow;
