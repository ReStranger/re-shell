import { Astal, Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import options from "options";

const { corners, transparent } = options.bar;

export default (gdkmonitor: Gdk.Monitor) => {
  const { TOP, BOTTOM, RIGHT, LEFT } = Astal.WindowAnchor;
  const name = `screen-corner`;

  return (
    <window
      visible
      name={`${name}${gdkmonitor}`}
      namespace={name}
      cssClasses={[name]}
      anchor={TOP | BOTTOM | RIGHT | LEFT}
      layer={Astal.Layer.BOTTOM}
      gdkmonitor={gdkmonitor}
      application={app}
      $={(self) => {
        corners.getValue() > 0
          ? self.add_css_class("corners")
          : self.remove_css_class("corners");
        transparent.getValue()
          ? self.add_css_class("hidden")
          : self.remove_css_class("hidden");
      }}
    >
      <box class="shadow">
        <box class="border" vexpand hexpand>
          <box class="corner" vexpand hexpand />
        </box>
      </box>
    </window>
  );
};
