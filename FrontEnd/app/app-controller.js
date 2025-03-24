import { AppModel } from './app-model.js';
import { AppView } from './app-view.js';

export class AppController {
  constructor() {
    this.model = new AppModel();
    this.view = new AppView();
  }
}
