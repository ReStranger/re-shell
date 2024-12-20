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
        anchor={
            Astal.WindowAnchor.TOP |
            Astal.WindowAnchor.BOTTOM |
            Astal.WindowAnchor.LEFT |
            Astal.WindowAnchor.RIGHT
        }
        {...props}
        setup={(self) => {
            const windowNames = popupWindowNames;
            windowNames.set([...windowNames.get(), self.name]);

            self.set_visible(!!visible);

            self.hook(self, "notify::visible", () => {
                if (!self.visible && activePopupWindows().length === 0) {
                    self.set_visible(false);
                }
            });

            if (setup) setup(self);
        }}
    >
        <eventbox
            vexpand={true}
            hexpand={true}
            onClick={(self) => {
                const window = self.parent;
                if (window) {
                    window.visible = false;
                }
            }}
        >
            {child}
        </eventbox>
    </window>
);

export default PopupWindow;
