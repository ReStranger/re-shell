import icons from "../../../lib/icons";
import BarButton from "./BarButton";
export default function () {
    return (
        <BarButton className="PowerBarButton" cursor="pointer">
            <icon icon={icons.powermenu.shutdown} />
        </BarButton>
    );
}
