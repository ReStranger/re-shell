import { Gtk } from "ags/gtk4";
import PanelButton from "widgets/bar/PanelButton";
import { createPoll } from "ags/time";
import options from "options";

const { format, action } = options.bar.date;

const time = createPoll("", 1000, ["date", `+${format.getValue()}`]);

export default () => (
    <PanelButton
        // TODO: Uncomment after implementing DateMenu
        // window="datemenu"
        $clicked={() => {
            action.getValue();
        }}
    >
        <label justify={Gtk.Justification.CENTER} label={time} />
    </PanelButton>
);
