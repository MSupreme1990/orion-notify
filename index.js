const {
    app,
    BrowserWindow,
    Menu,
    Tray,
    nativeImage,
    Notification
} = require('electron');
const path = require('path');
const url = require('url');
const platform = require('os').platform();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win,
    tray = null;

const assetsFolder = path.join(__dirname, 'assets', platform);

function doNotify() {
    let myNotification = new Notification({
        title: 'Title',
        body: 'Lorem Ipsum Dolor Sit Amet',
        icon: path.join(assetsFolder, 'images/type-task.png'),
    });

    myNotification.onclick = () => {
        console.log('Notification clicked');
    };
    myNotification.show();
}

function createWindow() {
    let trayImage;

    // Determine appropriate icon for platform
    if (platform === 'darwin') {
        trayImage = nativeImage.createFromPath(path.join(assetsFolder, 'images/trayTemplate.png'));
        trayImage.setTemplateImage(true);
    } else if (platform === 'win32') {
        trayImage = path.join(assetsFolder, 'images/tray.ico');
    } else {
        trayImage = path.join(assetsFolder, 'images/tray.png');
    }

    tray = new Tray(trayImage);
    tray.setToolTip('This is my application.');

    tray.on('click', () => {
        doNotify();
        // win.isVisible() ? win.hide() : win.show();
    });

    console.log(path.join(__dirname, 'assets/icon/png/64x64.png'));
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, 'assets/icon/png/64x64.png')
    });

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.