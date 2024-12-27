import { bind } from "astal";
import Battery from "gi://AstalBattery";

export default function () {
    const bat = Battery.get_default();

    return (
        <box className="Battery" visible={bind(bat, "isPresent")}>
            <overlay
                child={<slider value={bind(bat, "percentage")} />}
                overlay={
                    <label
                        className="percentage"
                        label={bind(bat, "percentage").as(
                            (p) => `${Math.floor(p * 100)} %`,
                        )}
                    />
                }
            />
        </box>
    );
}
