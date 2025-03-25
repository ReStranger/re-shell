import { App } from "astal/gtk4";
import scss from "./styles/index.scss";
import Bar from "src/widgets/bar/Bar";
import windows from "src/windows";

export default () => {
  App.start({
    css: scss,
    main() {
      windows.map((win) => App.get_monitors().map(win));
    },
  });
};
