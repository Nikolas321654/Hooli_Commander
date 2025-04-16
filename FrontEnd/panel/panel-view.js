export class PanelView {
  constructor(index) {
    this.events = {};
    const panels = document.querySelector('.panels');
    this.currentItemIndex = 0;
    this.panelElement = document.createElement('div');
    this.panelElement.classList.add('panel');
    this.panelElement.dataset.index = index;
    this.panelElement.innerHTML = `
      <div class="panel__buttons">
        <div class="panel__disks"></div>
        <div class="panel__navigation">
          <button class="disk-button disk-button__root">/</button>
          <button class="disk-button disk-button__up">..</button>
        </div>
      </div> 
      <div class="panel__path"></div>
      <table class="panel__table">
        <thead>
          <tr class="file-info">
            <th class="file-name">Name</th>
            <th class="file-size">Size</th>
            <th class="file-date">Date</th>
          </tr>
        </thead>
        <tbody class="panel__body"></tbody>
      </table>
    `;
    this.panelDisks = this.panelElement.querySelector('.panel__disks');
    this.pathElement = this.panelElement.querySelector('.panel__path');
    this.panelBody = this.panelElement.querySelector('.panel__body');
    this.panelButtons = this.panelElement.querySelector('.panel__buttons');
    this.buttonRoot = this.panelElement.querySelector('.disk-button__root');
    this.buttonUp = this.panelElement.querySelector('.disk-button__up');
    this.panelNavigation =
      this.panelElement.querySelector('.panel__navigation');
    panels.append(this.panelElement);
    this.initListeners();
  }

  formatDate(date) {
    if (!date) return '';
    const dateYear = date.split('T')[0].split('-').reverse().join('.');
    const time = date
      .split('T')[1]
      .split('.')[0]
      .split(':')
      .splice(0, 2)
      .join(':');
    return `${dateYear} ${time}`;
  }

  renderContent(content) {
    for (let i = 0; i < content.length; i++) {
      content[i].index = i;
    }

    this.panelBody.innerHTML = '';
    for (const item of content) {
      const row = document.createElement('tr');
      const cellName = document.createElement('td');
      const cellSize = document.createElement('td');
      const cellDate = document.createElement('td');
      cellName.textContent = item.isDirectory ? `[${item.name}]` : item.name;
      cellSize.textContent = item.isDirectory ? '<DIR>' : item.size;
      cellDate.textContent = this.formatDate(item.date);
      row.dataset.index = item.index;
      row.classList.add(item.isDirectory ? 'directory' : 'file');
      row.append(cellName, cellSize, cellDate);
      this.panelBody.append(row);
    }
  }

  renderDisks(disks) {
    this.panelDisks.innerHTML = '';
    for (let i = 0; i < disks.length; i++) {
      const disk = disks[i];
      const diskButton = document.createElement('button');
      diskButton.textContent = disk[0];
      diskButton.classList.add('disk-button');
      diskButton.dataset.index = i;
      this.panelDisks.append(diskButton);
    }
  }

  renderSelectedDisk(index) {
    this.panelDisks
      .querySelector('.disk-button_selected')
      ?.classList.remove('disk-button_selected');
    this.panelDisks
      .querySelectorAll('.disk-button')
      [index].classList.add('disk-button_selected');
  }

  renderCurrentItem(index) {
    this.currentItemIndex = index;
    this.panelBody
      .querySelector('.row_selected')
      ?.classList.remove('row_selected');
    this.panelBody.querySelectorAll('tr')[index].classList.add('row_selected');
  }

  renderPath(path) {
    this.pathElement.textContent = path.join(' / ');
    this.path = path;
  }

  on(eventName, callback) {
    this.events[eventName] = callback;
  }

  emit(eventName, ...data) {
    const callback = this.events[eventName];
    if (callback) callback(...data);
  }

  initListeners() {
    this.panelDisks.addEventListener('click', (event) => {
      if (!event.target.dataset.index) return;
      const index = +event.target.dataset.index;
      this.emit('changeDisk', index);
    });

    this.buttonRoot.addEventListener('click', () => {
      const index = +this.panelDisks.querySelector('.disk-button_selected')
        .dataset.index;
      this.emit('rootClick', index);
    });

    this.buttonUp.addEventListener('click', () => {
      this.emit('upClick');
    });

    this.panelBody.addEventListener('dblclick', this.onDblClick.bind(this));
    this.panelBody.addEventListener('click', this.onContentClick.bind(this));
  }

  onContentClick(event) {
    this.panelBody
      .querySelector('.row_selected')
      ?.classList.remove('row_selected');
    this.currentItemIndex = +event.target.parentElement.dataset.index;
    if (event.target.tagName !== 'TD') return;
    event.target.parentElement.classList.add('row_selected');
  }

  onDblClick(event) {
    const index = +event.target.parentElement.dataset.index;
    this.emit('openContentItem', index);
  }
}
