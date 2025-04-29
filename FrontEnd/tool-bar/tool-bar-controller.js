import { ToolBarModel } from './tool-bar-model.js';
import { ToolBarView } from './tool-bar-view.js';
import { Dialog } from '../dialog/dialog.js';

export class ToolBarController {
  constructor() {
    this.view = new ToolBarView();
    this.model = new ToolBarModel();
    this.initCallbacks();
  }

  initCallbacks() {
    this.view.on('showInfoDialog', this.showInfoDialog.bind(this));
  }

  showInfoDialog() {
    const author = this.model.authorInfo;
    const dialog = new Dialog();
    dialog.showDialog('Author', this.view.formatAuthor(author));
  }
}
