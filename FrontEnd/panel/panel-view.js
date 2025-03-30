export class PanelView {
  constructor() {
    const panels = document.querySelector('.panels');
    this.currentItemIndex = 0;
    this.panelElement = document.createElement('div');
    this.panelElement.classList.add('panel');
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
    this.panelContent = this.panelElement.querySelector('.panel__table');
    this.panelBody = this.panelElement.querySelector('.panel__body');
    panels.append(this.panelElement);
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

    content.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (b.isDirectory && !a.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });

    if (this.path.length > 1) {
      content = [
        { name: '..', size: '<DIR>', date: '', isDirectory: true },
        ...content,
      ];
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
      cellName.classList.add(item.isDirectory ? 'directory' : 'file');
      if (item.name === '..') {
        cellName.classList.add('arrow_up');
      }
      row.append(cellName, cellSize, cellDate);
      this.panelBody.append(row);
    }
  }

  renderDisks(disks) {
    this.panelDisks.innerHTML = '';
    for (const disk of disks) {
      const diskButton = document.createElement('button');
      diskButton.textContent = disk[0];
      diskButton.classList.add('disk-button');
      this.panelDisks.append(diskButton);
    }
  }

  renderSelectedDisk(index) {
    this.panelDisks.querySelector('.selected')?.classList.remove('selected');
    this.panelDisks
      .querySelectorAll('.disk-button')
      [index].classList.add('selected');
  }

  renderCurrentItem(index) {
    this.panelBody
      .querySelector('.selected__row')
      ?.classList.remove('selected__row');
    this.panelBody.querySelectorAll('tr')[index].classList.add('selected__row');
  }

  renderPath(path) {
    this.pathElement.textContent = path.join(' > ');
    this.path = path;
  }

  initListeners() {}

  emit(event, data) {}

  on(event, callback) {}
}
