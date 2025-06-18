import "lib/session";
import app from "ags/gtk4/app";
import style from "./styles/style.scss";
import windows from "windows";

app.start({
  css: style,
  main() {
    windows.map((w) => app.get_monitors().map(w));
  },
});
