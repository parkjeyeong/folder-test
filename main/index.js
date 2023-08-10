const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const IpcMainHandler = require('./src/handlers/IpcMainHandler');

function createWindow() {
  const win = new BrowserWindow({
    title: app.getName() + ' V' + app.getVersion(),
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 630,
    frame: true,
    titleBarStyle: 'default',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });
  
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '..', '..', 'renderer', 'build', 'index.html'));
  } else {
    win.loadURL('http://127.0.0.1:3000');
  }
}

// 루트 디렉토리의 package.json에 설정된 버전을 프로젝트의 버전으로 설정
if (!app.isPackaged) {
  const rootDirPackageJsonPath = path.join(__dirname, '..', 'package.json');
  const rootDirPackageJsonData = fs.readFileSync(rootDirPackageJsonPath);
  const rootPackageJson = JSON.parse(rootDirPackageJsonData);
  app.getVersion = () => {
    return rootPackageJson.version;
  }
}

app.whenReady().then(() => {
  const newPath = path.join(app.getPath('appData'), 'Ko-Mapper', app.getName());
  app.setPath('userData', newPath);

  createUserTempFolder();

  // 자동 업데이트 설정


  


  const ipcMainHandler = new IpcMainHandler();
  ipcMainHandler.init(ipcMain);

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length < 1) {
    createWindow();
  }
});

function createUserTempFolder() {
  const userDataPath = app.getPath('userData');
  const userTempPath = path.join(userDataPath, 'temp');
  if (!fs.existsSync(userTempPath)) {
    fs.mkdirSync(userTempPath, {recursive: true});
  }

  global.userTempPath = userTempPath;
}