// ===========================
// Greeting + Date + Clock
// ===========================

function updateDateTime() {

    const now = new Date();

    const hour = now.getHours();

    const greeting = document.getElementById("greeting");
    const clock = document.getElementById("clock");
    const date = document.getElementById("date");

    if(hour < 12){
        greeting.textContent = "Good Morning";
    }else if(hour < 18){
        greeting.textContent = "Good Afternoon";
    }else{
        greeting.textContent = "Good Evening";
    }

    clock.textContent = now.toLocaleTimeString();

    date.textContent = now.toDateString();

}

setInterval(updateDateTime,1000);

updateDateTime();


// ===========================
// Focus Timer
// ===========================

let timer = 25 * 60;
let interval;

const countdown = document.getElementById("countdown");

function updateTimer(){

    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    countdown.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}

updateTimer();

document.getElementById("StartBtn").onclick = function(){

    clearInterval(interval);

    interval = setInterval(function(){

        if(timer > 0){
            timer--;
            updateTimer();
        }

    },1000);

};

document.getElementById("StopBtn").onclick = function(){

    clearInterval(interval);

};

document.getElementById("ResetBtn").onclick = function(){

    clearInterval(interval);

    timer = 25 * 60;

    updateTimer();

};


// ===========================
// To Do List
// ===========================

let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];

const TaskInput = document.getElementById("TaskInput");

const TaskList = document.getElementById("TaskList");

function SaveTasks(){

    localStorage.setItem("Tasks",JSON.stringify(Tasks));

}

function RenderTasks(){

    taskList.innerHTML = "";

    tasks.forEach(function(Task,index){

        let li = document.createElement("li");

        if(Task.done){
            li.classList.add("done");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div>

            <button onclick="toggleTask(${index})">✓</button>

            <button onclick="editTask(${index})">Edit</button>

            <button onclick="deleteTask(${index})">Delete</button>

            </div>
        `;

        taskList.appendChild(li);

    });

}

document.getElementById("addTask").onclick = function(){

    if(TaskInput.value.trim() == "") return;

    tasks.push({

        text:TaskInput.value,

        done:false

    });

    taskInput.value="";

    saveTasks();

    renderTasks();

};

function toggleTask(index){

    tasks[index].done=!Tasks[index].done;

    saveTasks();

    renderTasks();

}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();

}

function editTask(index){

    let newTask = prompt("Edit Task",tasks[index].text);

    if(newTask){

        tasks[index].text = newTask;

        saveTasks();

        renderTasks();

    }

}

renderTasks();


// ===========================
// Quick Links
// ===========================

let links = JSON.parse(localStorage.getItem("links")) || [];

const linkContainer = document.getElementById("linkContainer");

function saveLinks(){

    localStorage.setItem("links",JSON.stringify(links));

}

function renderLinks(){

    linkContainer.innerHTML = "";

    links.forEach(function(link){

        let btn = document.createElement("button");

        btn.textContent = link.name;

        btn.onclick = function(){

            window.open(link.url,"_blank");

        };

        linkContainer.appendChild(btn);

    });

}

document.getElementById("SaveLink").onclick = function(){

    const name = document.getElementById("LinkName").value;

    const url = document.getElementById("LinkURL").value;

    if(name=="" || url=="") return;

    links.push({

        name:name,

        url:url

    });

    saveLinks();

    renderLinks();

};

renderLinks();