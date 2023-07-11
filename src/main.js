import './style.css';
const cont = document.getElementById("todo-list")
const tasklist = document.getElementById("list-item")
let tasks = [
    {   
    description: "driving",
    completed :false,
    index:0
    },
     {   
    description: "styding",
    completed :true,
    index:1
    },
      {   
    description: "swimming",
    completed :false,
    index:2
    },
];

tasks.forEach((element) => {
  tasklist.innerHTML += `<div class="li-div"><div id="li-id"><input type="checkbox">${element.description}</div><i class="fa-solid fa-ellipsis-vertical"></i></div>`
})


