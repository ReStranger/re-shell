import { GLib, Variable } from "astal";
import BarButton from "./BarButton";
import { openMenu } from "../../../lib/utils";

interface DateTimeFormatProps {
    format: string;
}

const DateTimeFormat = ({ format }: DateTimeFormatProps) => {
    const time = Variable<string>("").poll(1000, () => {
        return GLib.DateTime.new_now_local().format(format)!;
    });
    return (
        <label
            className="format"
            onDestroy={() => time.drop()}
            label={time()}
        />
    );
};
const Time = () => {
    return (
        <BarButton
            className="Time"
            cursor="pointer"
            onClicked={() => {
                openMenu("dashboard");
            }}
        >
            <DateTimeFormat format="%H:%M" />
        </BarButton>
    );
};

const Date = () => {
    return (
        <BarButton
            className="Date"
            cursor="pointer"
            onClicked={() => {
                openMenu("dashboard");
            }}
        >
            <DateTimeFormat format="%a %e" />
        </BarButton>
    );
};

export default () => {
    return (
        <box className="Clock">
            <Time />
            <Date />
        </box>
    );
};
