export class PanelView {
  constructor() {
    const panels = document.querySelector('.panels');
    this.currentItemIndex = 0;
    this.panelElement = document.createElement('div');
    this.panelElement.classList.add('panel');
    this.panelElement.innerHTML = `
        <div class="panel__disks"></div>
        <div class="panel__path"></div>
        <div class="panel__content"></div>
    `;
    this.disksElement = this.panelElement.querySelector('.panel__disks');
    panels.append(this.panelElement);
  }
  initListeners() {}

  renderDisks(disks) {
    for (const disk of disks) {
      const diskButton = document.createElement('button');
      diskButton.textContent = disk;
      diskButton.classList.add('disk-button');
      this.disksElement.append(diskButton);
    }
  }

  renderPath(path) {}

  renderContent(content) {}

  renderCurrentItem(index) {}

  renderSelectedDisk(index) {}

  emit(event, data) {}

  on(event, callback) {}
}
