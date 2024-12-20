import { App } from "astal/gtk3";
import Apps from "gi://AstalApps";
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

export function isMathExpression(input: string): boolean {
    return /^[\d+\-*/().\s^]+$/.test(input);
}

export function evaluateExpression(input: string): number | null {
    try {
        const preparedInput = input.replace(/\^/g, "**");
        const result = Function(`"use strict"; return (${preparedInput})`)();
        if (typeof result === "number" && isFinite(result)) {
            return result;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export function handleInput(
    input: string,
    apps: Apps.Apps,
): string | null | Apps.Application {
    input = input.trim();
    if (isMathExpression(input)) {
        const evaluated = evaluateExpression(input);
        if (evaluated !== null) {
            return String(evaluated);
        }
    }

    const app = apps.fuzzy_query(input)?.[0];
    if (app) {
        return app;
    }

    return null;
}
