import QSButton from "./QSButton";
import icons from "../../../lib/icons";

export default function () {
    return (
        <QSButton
            icon={icons.network.wired}
            label="network"
            menuName="network"
            cursor="pointer"
        />
    );
}
