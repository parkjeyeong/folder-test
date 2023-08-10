const classifyController = require('../../controllers/ClassifyController');

class ClassifyHandler {
  init(ipcMain) {
    ipcMain.handle('load-image', classifyController.loadImage);
  }
}

module.exports = ClassifyHandler;