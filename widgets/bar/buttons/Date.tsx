import { Gtk } from "ags/gtk4";
import PanelButton from "widgets/bar/PanelButton";
import { createPoll } from "ags/time";
import app from "ags/gtk4/app";

const time = createPoll("", 1000, "date");

export default () => (
    <PanelButton
        window="testwindow"
        $clicked={() => {
            app.toggle_window("testwindow");
        }}
    >
        <label justify={Gtk.Justification.CENTER} label={time} />
    </PanelButton>
);
