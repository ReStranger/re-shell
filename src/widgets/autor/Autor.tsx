import { Astal } from "astal/gtk3";
export default function () {
    return (
        <window
            className="Autor"
            layer={Astal.Layer.BACKGROUND}
            anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT}
        >
            <box className="AutorBox">
                <label className="logo" label="󱄅" />
                <label label="re:shell" />
            </box>
        </window>
    );
}
