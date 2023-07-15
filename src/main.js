import './style.css';
import { tasks, renderTasks, saveTasksToLocalStorage } from './Add-Remove.js';

const taskInput = document.getElementById('task-input');

// assigning the object to the array with the input value
function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  renderTasks();
  saveTasksToLocalStorage();
  taskInput.value = '';
}

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && taskInput.value !== '') {
    // important part which takes the value data coming from the input to our object in the array
    addTask(taskInput.value);
  }
});

document.querySelector('.sign').addEventListener('click', () => {
  if (taskInput.value !== '') {
    addTask(taskInput.value);
  }
});
