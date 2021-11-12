const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
	const win = new BrowserWindow({
		width: 420,
		height: 482,
		resizable: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			webSecurity: false,
		},
	});

	win.setMenu(null);
	win.webContents.openDevTools();
	console.log(__dirname);
	win.loadFile(path.join(__dirname, "index.html"));
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
