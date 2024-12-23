import { App, Gdk } from "astal/gtk3";
import { GtkWidget } from "../lib/types/widget";
import Apps from "gi://AstalApps";
import { popupWindowNames } from "./variables";

export const closeAllMenus = (): void => {
    const menuWindows = App.get_windows()
        .filter((w) => {
            if (w.name) {
                return /.*menu/.test(w.name);
            }

            return false;
        })
        .map((window) => window.name);

    menuWindows.forEach((window) => {
        if (window) {
            App.get_window(window)?.set_visible(false);
        }
    });
};

export const openMenu = async (
    //clicked: GtkWidget,
    //event: Gdk.Event,
    window: string,
): Promise<void> => {
    try {
        closeAllMenus();
        App.toggle_window(window);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error calculating menu position: ${error.stack}`);
        } else {
            console.error(`Unknown error occurred: ${error}`);
        }
    }
};

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
