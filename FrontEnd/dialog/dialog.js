export class Dialog {
  showDialog(title, message) {
    const dialogBlock = document.createElement('dialog');
    dialogBlock.innerHTML = `
        <div>
          <p class="dialog-title">${title}</p>
          <div class="dialog_text-block">${message}</div>
          <button class="dialog-close">Close</button>
        </div>
      `;
    document.body.append(dialogBlock);
    const closeButton = dialogBlock.querySelector('.dialog-close');

    const closeDialog = () => {
      dialogBlock.close();
      dialogBlock.remove();
    };
    closeButton.addEventListener('click', closeDialog);

    dialogBlock.addEventListener('keydown', (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (event.code === 'Enter') {
        closeDialog();
      }
    });

    dialogBlock.showModal();
  }

  static isDialogOpen() {
    return !!document.querySelector('dialog');
  }
}
