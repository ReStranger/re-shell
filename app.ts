import "lib/session";
import "style/style";
import app from "ags/gtk4/app";
import style from "./styles/style.scss";
import windows from "windows";

app.start({
  main() {
    windows.map((w) => app.get_monitors().map(w));
  },
});
