const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
	const win = new BrowserWindow({
		width: 420,
		height: 482,
		resizable: false,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),

			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	win.setMenu(null);
	win.loadFile("index.html");
}

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
