const tasklist = document.getElementById('list-item');
const clearall = document.querySelector('#clearall');

let tasks = [];
export { tasks };

// save to local storage the object coming from the tasks array
export function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// updating the index of the array elements by order
function updateTaskIndexes() {
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
}

// deleting elements by the splice method by index one by one
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskIndexes();
  saveTasksToLocalStorage();
}

// displaying the elemnts to the current dom with events
export function renderTasks() {
  tasklist.innerHTML = '';
  tasks.forEach((element, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'li-div';

    const taskText = document.createElement('div');
    taskText.id = 'li-id';
    taskText.innerHTML = `<input type="checkbox"><p class="description">${element.description}</p>`;
    taskDiv.appendChild(taskText);

    const trashcan = document.createElement('i');
    trashcan.className = 'fa-solid fa-trash-can trash';
    taskDiv.appendChild(trashcan);

    const dots = document.createElement('i');
    dots.className = 'fa-solid delete fa-ellipsis-vertical';
    taskDiv.appendChild(dots);

    tasklist.appendChild(taskDiv);
    const checkbox = taskText.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        if (!element.completed)
          element.completed = true 
          saveTasksToLocalStorage()          
        
        trashcan.style.display = 'block';
        checkbox.style.color = 'black'
        taskDiv.style.backgroundColor = 'rgb(240, 216, 80)';
        trashcan.addEventListener('click', () => {
          deleteTask(index);
          renderTasks();
        });
        taskText.style.textDecoration = 'line-through';
      } else if (!checkbox.checked) {
        taskText.style.textDecoration = 'none';
        trashcan.style.display = 'none';
        element.completed = false
        saveTasksToLocalStorage() 
        renderTasks();
      }
    });

    const Span = taskText.querySelector('.description');
    Span.addEventListener('click', () => {
      Span.contentEditable = true;
      Span.addEventListener('blur', () => {
        const values = Array.from(tasklist.children).indexOf(taskDiv);
        tasks[values].description = Span.textContent;
        saveTasksToLocalStorage();
      });
    });

    clearall.addEventListener('click', () => {
      clearCompleted();
    });
  });
}


// just to make sure if there was an items in the local storage we grap it
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}


function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasksToLocalStorage();
  renderTasks();
}