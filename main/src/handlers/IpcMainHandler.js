const ClassifyHandler = require('./classify/ClassifyHandler');

class IpcMainHandler {
  init(ipcMain) {
    const classifyHandler = new ClassifyHandler();
    classifyHandler.init(ipcMain);

  }
}

module.exports = IpcMainHandler;