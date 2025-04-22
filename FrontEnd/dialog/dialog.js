export function showDialog(message) {
  const dialogBlock = document.createElement('dialog');
  dialogBlock.innerHTML = `
      <div>
        <p>${message}</p>
        <button class="dialog-close">Закрити</button>
      </div>
    `;
  document.body.append(dialogBlock);
  const closeButton = dialogBlock.querySelector('.dialog-close');

  closeButton.addEventListener('click', () => {
    dialogBlock.close();
    dialogBlock.remove();
  });

  closeButton.addEventListener('keydown', (event) => {
    event.stopPropagation();
    if (event.code === 'Enter') {
      dialogBlock.close();
      dialogBlock.remove();
    }
  });

  dialogBlock.showModal();
}
