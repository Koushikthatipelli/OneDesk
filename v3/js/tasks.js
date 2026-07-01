// ==========================================
// OneDesk V3 Tasks
// Backend Connected
// ==========================================

const API =
"http://localhost:5000/api/todos";

const token =
localStorage.getItem("token");

const headers={

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

};

const taskList=
document.getElementById("taskList");

const taskForm=
document.getElementById("taskForm");

const newTaskBtn=
document.getElementById("newTaskBtn");

const cancelTask=
document.getElementById("cancelTask");

const saveTask=
document.getElementById("saveTask");

const searchTask=
document.getElementById("searchTask");

const progressPercent=
document.getElementById("progressPercent");

const emptyState=
document.getElementById("emptyState");

let tasks=[];

let editingId=null;

// ===========================
// Load Tasks
// ===========================

async function loadTasks(){

try{

const response=

await fetch(

API,

{

headers

}

);

const data=

await response.json();

tasks=

data.todos||

data;

renderTasks();

}

catch(error){

console.error(error);

}

}

// ===========================
// Open Form
// ===========================

newTaskBtn.onclick=()=>{

editingId=null;

taskForm.style.display="block";

};

// ===========================
// Cancel
// ===========================

cancelTask.onclick=()=>{

taskForm.style.display="none";

editingId=null;

};

// ===========================
// Save
// ===========================

saveTask.onclick=

async()=>{

const title=

document.getElementById(

"taskTitle"

).value;

const desc=

document.getElementById(

"taskDescription"

).value;

const priority=

document.getElementById(

"taskPriority"

).value;

const due=

document.getElementById(

"taskDate"

).value;

const category=

document.getElementById(

"taskCategory"

).value;

if(!title){

alert("Enter Task");

return;

}

const body={

title,

desc,

priority,

due,

category

};

if(editingId){

await fetch(

API+"/"+editingId,

{

method:"PUT",

headers,

body:JSON.stringify(body)

}

);

editingId=null;

}else{

await fetch(

API,

{

method:"POST",

headers,

body:JSON.stringify(body)

}

);

}

taskForm.style.display="none";

document.getElementById(

"taskTitle"

).value="";

document.getElementById(

"taskDescription"

).value="";

loadTasks();

};
// ===========================
// Render Tasks
// ===========================

function renderTasks(){

taskList.innerHTML="";

if(tasks.length===0){

emptyState.style.display="flex";

progressPercent.innerHTML="0%";

return;

}

emptyState.style.display="none";

let completed=0;

tasks.forEach(task=>{

if(task.completed)

completed++;

taskList.innerHTML+=`

<div class="task-card ${task.completed?"completed":""}">

<div class="task-left">

<h2 class="task-title">

${task.title}

</h2>

<p class="task-description">

${task.desc||""}

</p>

<div class="task-meta">

<span class="priority ${(task.priority||"Medium").toLowerCase()}">

${task.priority||"Medium"}

</span>

<span class="meta-item">

${task.category||"General"}

</span>

<span class="meta-item">

${task.due||""}

</span>

</div>

</div>

<div class="task-right">

<button

class="icon-btn complete-btn"

onclick="toggleTask('${task._id}')">

✓

</button>

<button

class="icon-btn edit-btn"

onclick="editTask('${task._id}')">

✎

</button>

<button

class="icon-btn delete-btn"

onclick="deleteTask('${task._id}')">

🗑

</button>

</div>

</div>

`;

});

const percent=

Math.round(

(completed/tasks.length)*100

);

progressPercent.innerHTML=

percent+"%";

}

// ===========================
// Delete
// ===========================

async function deleteTask(id){

try{

await fetch(

API+"/"+id,

{

method:"DELETE",

headers

}

);

loadTasks();

}

catch(error){

console.log(error);

}

}

// ===========================
// Complete
// ===========================

async function toggleTask(id){

const task=

tasks.find(

t=>t._id===id

);

if(!task) return;

await fetch(

API+"/"+id,

{

method:"PUT",

headers,

body:JSON.stringify({

completed:!task.completed

})

}

);

loadTasks();

}

// ===========================
// Edit
// ===========================

function editTask(id){

const task=

tasks.find(

t=>t._id===id

);

if(!task) return;

editingId=id;

document.getElementById(

"taskTitle"

).value=

task.title;

document.getElementById(

"taskDescription"

).value=

task.desc||"";

document.getElementById(

"taskPriority"

).value=

task.priority||"Medium";

document.getElementById(

"taskDate"

).value=

task.due||"";

document.getElementById(

"taskCategory"

).value=

task.category||"General";

taskForm.style.display="block";

}
// ===========================
// Search Tasks
// ===========================

searchTask.onkeyup=()=>{

const value=

searchTask.value.toLowerCase();

document.querySelectorAll(

".task-card"

).forEach(card=>{

card.style.display=

card.innerText

.toLowerCase()

.includes(value)

?

"flex"

:

"none";

});

};

// ===========================
// Check Login
// ===========================

if(!token){

alert(

"Please login first."

);

window.location.href=

"login.html";

}

// ===========================
// Initialize
// ===========================

window.onload=()=>{

loadTasks();

};

renderTasks();