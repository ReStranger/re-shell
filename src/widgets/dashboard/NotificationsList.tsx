import { Astal, Gtk } from "astal/gtk3";
import { Variable, bind, timeout } from "astal";
import { type Subscribable } from "astal/binding";
import Notifd from "gi://AstalNotifd";
import Notification from "../notificetion/Notification";

class NotifiationMap implements Subscribable {
    // the underlying map to keep track of id widget pairs
    private map: Map<number, Gtk.Widget> = new Map();

    // it makes sense to use a Variable under the hood and use its
    // reactivity implementation instead of keeping track of subscribers ourselves
    private var: Variable<Array<Gtk.Widget>> = Variable([]);

    // notify subscribers to rerender when state changes
    private notifiy() {
        this.var.set([...this.map.values()].reverse());
    }

    constructor() {
        const notifd = Notifd.get_default();

        notifd.ignoreTimeout = true;

        notifd.connect("notified", (_, id) => {
            this.set(
                id,
                Notification({
                    notification: notifd.get_notification(id)!,

                    onHoverLost: () => {},

                    setup: () => {},
                }),
            );
        });

        // notifications can be closed by the outside before
        // any user input, which have to be handled too
        notifd.connect("resolved", (_, id) => {
            this.delete(id);
        });
    }

    private set(key: number, value: Gtk.Widget) {
        // in case of replacecment destroy previous widget
        this.map.get(key)?.destroy();
        this.map.set(key, value);
        this.notifiy();
    }

    private delete(key: number) {
        this.map.get(key)?.destroy();
        this.map.delete(key);
        this.notifiy();
    }

    // needed by the Subscribable interface
    get() {
        return this.var.get();
    }

    // needed by the Subscribable interface
    subscribe(callback: (list: Array<Gtk.Widget>) => void) {
        return this.var.subscribe(callback);
    }
}

export default function () {
    const notifs = new NotifiationMap();
    const { CENTER } = Gtk.Align;
    const noNotifyBox = (
        <box halign={CENTER} className="not-notifs-found" vertical>
            <icon icon="system-search-symbolic" />
            <label label="No notifications found" />
        </box>
    );
    const updateNoNotifyVisibility = () => {
        const notifications = notifs.get();
        noNotifyBox.visible = notifications.length === 0;
    };

    notifs.subscribe(() => {
        updateNoNotifyVisibility();
    });

    updateNoNotifyVisibility();
    return (
        <box vertical>
            {noNotifyBox}
            {bind(notifs)}
        </box>
    );
}
