import { App } from "astal/gtk3";
import { popupWindowNames } from "./variables";

export function activePopupWindows() {
    const windowNames = popupWindowNames.get();

    return App.get_windows().filter(
        (window) => windowNames.includes(window.name) && window.visible,
    );
}

export function toggleWindow(windowName: string) {
    const window = App.get_window(windowName);
    if (!window) {
        return;
    }
    window.visible = !window.visible;
}
