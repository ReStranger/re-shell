import "lib/session";
import "styles/style";
import app from "ags/gtk4/app";
import windows from "windows";

app.start({
    main() {
        windows.map((w) => app.get_monitors().map(w));
    },
});
