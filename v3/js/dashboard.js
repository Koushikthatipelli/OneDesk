// ========================================
// OneDesk V3 Dashboard
// Premium Version
// ========================================

// ========================================
// API
// ========================================

const API_TASKS =
"http://localhost:5000/api/todos";

const API_NOTES =
"http://localhost:5000/api/notes";

const API_HEALTH =
"http://localhost:5000/api/health/analytics";

// ========================================
// Authentication
// ========================================

const token =
localStorage.getItem("token");

if(!token){

window.location.href=
"../frontend/login.html";

}

const headers={

Authorization:`Bearer ${token}`

};

// ========================================
// User
// ========================================

const user=

JSON.parse(

localStorage.getItem("user")

);

if(user){

document.getElementById(

"greeting"

).innerHTML=

`👋 Hello, ${user.name}`;

}

// ========================================
// Greeting
// ========================================

function getGreeting(){

const hour=

new Date().getHours();

if(hour<12)

return "Good Morning ☀️";

if(hour<17)

return "Good Afternoon 🌤";

if(hour<21)

return "Good Evening 🌇";

return "Good Night 🌙";

}

// ========================================
// Clock
// ========================================

function updateClock(){

const now=

new Date();

document.getElementById(

"todayDate"

).innerHTML=

`${getGreeting()} • ${now.toLocaleDateString()}`;

document.getElementById(

"liveTime"

).innerHTML=

now.toLocaleTimeString();

}

updateClock();

setInterval(

updateClock,

1000

);

// ========================================
// Dashboard Data
// ========================================

let dashboard={

tasks:[],

notes:[],

health:{}

};
// ========================================
// Load Dashboard Data
// ========================================

async function loadDashboard(){

try{

const [

taskRes,

noteRes,

healthRes

]=await Promise.all([

fetch(

API_TASKS,

{headers}

),

fetch(

API_NOTES,

{headers}

),

fetch(

API_HEALTH,

{headers}

)

]);

const taskData=

await taskRes.json();

const noteData=

await noteRes.json();

const healthData=

await healthRes.json();

dashboard.tasks=

taskData.todos||

[];

dashboard.notes=

noteData.notes||

[];

dashboard.health=

healthData.today||

{};

updateCards();

updateProgress();

loadRecentTasks();

}

catch(error){

console.error(

"Dashboard Error:",

error

);

}

}

// ========================================
// Update Dashboard Cards
// ========================================

function updateCards(){

document.getElementById(

"taskCount"

).textContent=

dashboard.tasks.length;

document.getElementById(

"notesCount"

).textContent=

dashboard.notes.length;

document.getElementById(

"calorieCount"

).textContent=

dashboard.health.calories || 0;

document.getElementById(

"waterCount"

).textContent=

((dashboard.health.water||0)/1000)

.toFixed(2)+" L";

}
// ========================================
// Progress Bars
// ========================================

function updateProgress(){

    const completed = dashboard.tasks.filter(
        task => task.completed
    ).length;

    const total = dashboard.tasks.length;

    const taskPercent =
        total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("taskProgress").textContent =
        taskPercent + "%";

    document.getElementById("taskBar").style.width =
        taskPercent + "%";

    // Calories Goal (2000 kcal)

    const calories =
        dashboard.health.calories || 0;

    const caloriePercent =
        Math.min(
            Math.round((calories / 2000) * 100),
            100
        );

    document.getElementById("calorieProgress").textContent =
        caloriePercent + "%";

    document.getElementById("calorieBar").style.width =
        caloriePercent + "%";

    // Water Goal (4000 ml)

    const water =
        dashboard.health.water || 0;

    const waterPercent =
        Math.min(
            Math.round((water / 4000) * 100),
            100
        );

    document.getElementById("waterProgress").textContent =
        waterPercent + "%";

    document.getElementById("waterBar").style.width =
        waterPercent + "%";

    // Protein Goal (150 g)

    const protein =
        dashboard.health.protein || 0;

    const proteinPercent =
        Math.min(
            Math.round((protein / 150) * 100),
            100
        );

    document.getElementById("proteinProgress").textContent =
        proteinPercent + "%";

    document.getElementById("proteinBar").style.width =
        proteinPercent + "%";

}

// ========================================
// Recent Tasks
// ========================================

function loadRecentTasks(){

    const container =
        document.getElementById("recentTasks");

    container.innerHTML = "";

    if(dashboard.tasks.length === 0){

        container.innerHTML = `

        <div class="empty-card">

            <i class="ti ti-checklist"></i>

            <p>No tasks yet.</p>

        </div>

        `;

        return;

    }

    dashboard.tasks
        .slice(0,3)
        .forEach(task => {

        container.innerHTML += `

        <div class="task-item">

            <div class="task-left">

                <div class="task-status"></div>

                <div>

                    <div class="task-title">

                        ${task.title}

                    </div>

                    <div class="task-date">

                        ${task.category || "General"}

                    </div>

                </div>

            </div>

        </div>

        `;

    });

}

// ========================================
// Quick Actions
// ========================================

document.getElementById("addTaskBtn").onclick = () => {

    window.location.href = "tasks.html";

};

document.getElementById("addNoteBtn").onclick = () => {

    window.location.href = "notes.html";

};

document.getElementById("addFoodBtn").onclick = () => {

    window.location.href = "health.html";

};

document.getElementById("addWaterBtn").onclick = () => {

    window.location.href = "health.html";

};

// ========================================
// Initialize
// ========================================

window.onload = async () => {

    updateClock();

    setInterval(updateClock,1000);

    await loadDashboard();

};

console.log("✅ OneDesk Premium Dashboard Loaded");