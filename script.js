const squares = document.querySelectorAll('.square');
const placeholders = document.querySelectorAll('.placeholder');

const links = document.querySelectorAll('#input-button');
const inputs = document.querySelectorAll('#input');

links.forEach((link, index) => {
  link.addEventListener('click', () => {
    inputs[index].value = '';
  });
});

function addSquareEventListeners(square) {
  square.addEventListener('dragstart', dragstart);
  square.addEventListener('dragend', dragend);
}

function dragstart(event) {
  event.target.classList.add('hold');
  setTimeout(() => event.target.classList.add('hide'), 0);
}

function dragend(event) {
  event.target.classList.remove('hold', 'hide');
  saveStateToLocalStorage();
}

function dragover(event) {
  event.preventDefault();
}

function dragenter(event) {
  event.target.classList.add('hovered');
}

function dragleave(event) {
  event.target.classList.remove('hovered');
}

function dragdrop(event) {
  event.target.classList.remove('hovered');

  const draggedElement = document.querySelector('.square.hold');
  if (draggedElement) {
    const clone = draggedElement.cloneNode(true);
    clone.classList.remove('hold', 'hide');
    event.target.appendChild(clone);
    addSquareEventListeners(clone);

    clone.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (e.button === 2) {
        clone.remove();
      }
    });
  }
}

placeholders.forEach((placeholder) => {
  placeholder.addEventListener('dragover', dragover);
  placeholder.addEventListener('dragenter', dragenter);
  placeholder.addEventListener('dragleave', dragleave);
  placeholder.addEventListener('drop', dragdrop);
});

squares.forEach((square) => {
  square.addEventListener('dragstart', dragstart);
  square.addEventListener('dragend', dragend);
});

document.addEventListener('DOMContentLoaded', function () {
  // Получаем все элементы input с классом "user-data"
  let inputElements = document.querySelectorAll('.user-data');

  // Проходим по каждому элементу
  inputElements.forEach(function (inputElement) {
    // Получаем значение из локального хранилища
    let storedInputValue = localStorage.getItem(inputElement.id);

    // Проверяем, есть ли сохраненное значение
    if (storedInputValue !== null) {
      // Устанавливаем значение в поле input
      inputElement.value = storedInputValue;
    }

    // Получаем кнопку по её id, предположим, что у кнопки id="clear-button"
    let clearButton = document.getElementById('clear-button');

    // Добавляем обработчик события для события input
    inputElement.addEventListener('input', function () {
      // Обновляем значение в локальном хранилище при вводе
      localStorage.setItem(inputElement.id, inputElement.value);
    });
  });
});
