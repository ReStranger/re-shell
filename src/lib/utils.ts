import { App } from "astal/gtk3";

export function toggleWindow(name: string) {
    App.toggle_window(`${name}`);
}
