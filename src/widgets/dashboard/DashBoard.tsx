import { Gtk } from "astal/gtk3";
import PopupWindow from "../PopupWindow";
import { openMenu } from "../../lib/utils";
import NotificationsList from "./NotificationsList";
import Calendar from "./Calendar";

export default function () {
    return (
        <PopupWindow
            name={"dashboard"}
            layout="top"
            transition={Gtk.RevealerTransitionType.SLIDE_DOWN}
        >
            <box className="DashBoard">
                <box className="NotificationBox">
                    <NotificationsList />
                </box>
                <box className="CalendarBox">
                    <Calendar />
                </box>
            </box>
        </PopupWindow>
    );
}
