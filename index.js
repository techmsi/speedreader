'use strict';
const electron = require('electron');
const app = electron.app;
var ipc = require('electron').ipcMain;

// report crashes to the Electron project
// require('crash-reporter').start();

// debug
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.openDevTools();
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
