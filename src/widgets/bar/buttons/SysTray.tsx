import { bind } from "astal";
import Tray from "gi://AstalTray";

export default function SysTray() {
    const tray = Tray.get_default();

    return (
        <>
            {bind(tray, "items").as((items) =>
                items.length > 0 ? (
                    <box className="SysTray">
                        {items.map((item) => (
                            <menubutton
                                tooltipMarkup={bind(item, "tooltipMarkup")}
                                usePopover={false}
                                actionGroup={bind(item, "action-group").as(
                                    (ag) => ["dbusmenu", ag],
                                )}
                                menuModel={bind(item, "menu-model")}
                            >
                                <icon gicon={bind(item, "gicon")} />
                            </menubutton>
                        ))}
                    </box>
                ) : (
                    ""
                ),
            )}
        </>
    );
}
