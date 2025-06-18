import app from "ags/gtk4/app";
import { Astal, Gtk, Gdk } from "ags/gtk4";

const StartWidget = () => (
  <box _type="start" hexpand halign={Gtk.Align.CENTER}></box>
);
const CenterWidget = () => <box _type="center"></box>;

const EndWidget = () => (
  <box _type="end" hexpand halign={Gtk.Align.CENTER}></box>
);

export default (gdkmonitor: Gdk.Monitor) => {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      name={`bar${gdkmonitor}`}
      class="bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox cssName="centerbox" css={"min-width: 2px; min-height: 2px;"}>
        <StartWidget />
        <CenterWidget />
        <EndWidget />
      </centerbox>
    </window>
  );
};
