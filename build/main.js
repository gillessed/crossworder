"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Electron = require("electron");
var path = require("path");
var url = require("url");
var process = require("process");
process.setMaxListeners(0);
var app = Electron.app;
var globalShortcut = Electron.globalShortcut;
var mainWindow;
function createWindow() {
    globalShortcut.register('CommandOrControl+Q', function () {
        app.quit();
    });
    globalShortcut.register('CommandOrControl+D', function () {
        mainWindow.webContents.openDevTools();
    });
    mainWindow = new Electron.BrowserWindow({
        title: 'Tabletop Mapper',
        show: false,
    });
    mainWindow.setMenu(null);
    mainWindow.maximize();
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    mainWindow.on('ready-to-show', function () {
        mainWindow.show();
    });
}
app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map