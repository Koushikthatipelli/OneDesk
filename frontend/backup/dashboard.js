const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addTaskBtn.addEventListener("click", () => {

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();

    taskInput.value = "";

    renderTasks();
});

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.classList.add("task-item");

        li.innerHTML = `
            <div class="task-left">
                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})"
                >

                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>
            </div>

            <button
                class="delete-btn"
                onclick="deleteTask(${index})"
            >
                Delete
            </button>
        `;

        taskList.appendChild(li);

    });
}

function toggleTask(index){

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    renderTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}
const noteInput =
    document.getElementById("noteInput");

const saveNoteBtn =
    document.getElementById("saveNoteBtn");

const notesContainer =
    document.getElementById("notesContainer");

let notes =
    JSON.parse(localStorage.getItem("notes")) || [];

renderNotes();

saveNoteBtn.addEventListener("click", () => {

    const noteText =
        noteInput.value.trim();

    if(noteText === ""){
        alert("Enter a note");
        return;
    }

    notes.push(noteText);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    noteInput.value = "";

    renderNotes();
});

function renderNotes(){

    notesContainer.innerHTML = "";

    notes.forEach((note,index)=>{

        const noteCard =
            document.createElement("div");

        noteCard.classList.add("note-card");

        noteCard.innerHTML = `
            <span class="note-text">
                ${note}
            </span>

            <button
                onclick="deleteNote(${index})"
                class="delete-btn"
            >
                Delete
            </button>
        `;

        notesContainer.appendChild(noteCard);
    });
}

function deleteNote(index){

    notes.splice(index,1);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    renderNotes();
}
const plannerTime =
    document.getElementById("plannerTime");

const plannerTask =
    document.getElementById("plannerTask");

const addPlannerBtn =
    document.getElementById("addPlannerBtn");

const plannerList =
    document.getElementById("plannerList");

let plannerData =
    JSON.parse(localStorage.getItem("planner")) || [];

renderPlanner();

addPlannerBtn.addEventListener("click", () => {

    const time =
        plannerTime.value;

    const task =
        plannerTask.value.trim();

    if(time === "" || task === ""){
        alert("Fill all fields");
        return;
    }

    plannerData.push({
        time,
        task
    });

    localStorage.setItem(
        "planner",
        JSON.stringify(plannerData)
    );

    plannerTime.value = "";
    plannerTask.value = "";

    renderPlanner();
});

function renderPlanner(){

    plannerList.innerHTML = "";

    plannerData.forEach((item,index)=>{

        const div =
            document.createElement("div");

        div.classList.add("planner-item");

        div.innerHTML = `
            <div class="planner-left">
                <span class="planner-time">
                    ${item.time}
                </span>

                <span>
                    ${item.task}
                </span>
            </div>

            <button
                class="delete-btn"
                onclick="deletePlanner(${index})"
            >
                Delete
            </button>
        `;

        plannerList.appendChild(div);

    });
}

function deletePlanner(index){

    plannerData.splice(index,1);

    localStorage.setItem(
        "planner",
        JSON.stringify(plannerData)
    );

    renderPlanner();
}
const subjectInput =
    document.getElementById("subjectInput");

const hoursInput =
    document.getElementById("hoursInput");

const addStudyBtn =
    document.getElementById("addStudyBtn");

const studyList =
    document.getElementById("studyList");

let studies =
    JSON.parse(localStorage.getItem("studies")) || [];

renderStudies();

addStudyBtn.addEventListener("click", () => {

    const subject =
        subjectInput.value.trim();

    const hours =
        hoursInput.value;

    if(subject === "" || hours === ""){
        alert("Fill all fields");
        return;
    }

    studies.push({
        subject,
        hours
    });

    localStorage.setItem(
        "studies",
        JSON.stringify(studies)
    );

    subjectInput.value = "";
    hoursInput.value = "";

    renderStudies();
});

function renderStudies(){

    studyList.innerHTML = "";

    studies.forEach((item,index)=>{

        const div =
            document.createElement("div");

        div.classList.add("study-item");

        div.innerHTML = `
            <div>
                <strong>${item.subject}</strong>
            </div>

            <div>
                <span class="study-hours">
                    ${item.hours} hrs
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteStudy(${index})"
                >
                    Delete
                </button>
            </div>
        `;

        studyList.appendChild(div);

    });
}

function deleteStudy(index){

    studies.splice(index,1);

    localStorage.setItem(
        "studies",
        JSON.stringify(studies)
    );

    renderStudies();
}
const foodInput =
    document.getElementById("foodInput");

const calorieInput =
    document.getElementById("calorieInput");

const addCalorieBtn =
    document.getElementById("addCalorieBtn");

const calorieList =
    document.getElementById("calorieList");

const totalCalories =
    document.getElementById("totalCalories");

let calories =
    JSON.parse(localStorage.getItem("calories")) || [];

renderCalories();

addCalorieBtn.addEventListener("click", () => {

    const food =
        foodInput.value.trim();

    const calorie =
        calorieInput.value;

    if(food === "" || calorie === ""){
        alert("Fill all fields");
        return;
    }

    calories.push({
        food,
        calorie:Number(calorie)
    });

    localStorage.setItem(
        "calories",
        JSON.stringify(calories)
    );

    foodInput.value = "";
    calorieInput.value = "";

    renderCalories();
});

function renderCalories(){

    calorieList.innerHTML = "";

    let total = 0;

    calories.forEach((item,index)=>{

        total += item.calorie;

        const div =
            document.createElement("div");

        div.classList.add("calorie-item");

        div.innerHTML = `
            <div>
                <strong>${item.food}</strong>
            </div>

            <div>
                ${item.calorie} cal

                <button
                    class="delete-btn"
                    onclick="deleteCalorie(${index})"
                >
                    Delete
                </button>
            </div>
        `;

        calorieList.appendChild(div);

    });

    totalCalories.textContent =
        `Total: ${total} Calories`;
}

function deleteCalorie(index){

    calories.splice(index,1);

    localStorage.setItem(
        "calories",
        JSON.stringify(calories)
    );

    renderCalories();
}
const heightInput =
    document.getElementById("heightInput");

const weightInput =
    document.getElementById("weightInput");

const calculateBmiBtn =
    document.getElementById("calculateBmiBtn");

const bmiResult =
    document.getElementById("bmiResult");

calculateBmiBtn.addEventListener("click", () => {

    const height =
        Number(heightInput.value);

    const weight =
        Number(weightInput.value);

    if(!height || !weight){

        alert("Enter height and weight");

        return;
    }

    const bmi =
        weight / ((height / 100) ** 2);

    let category = "";

    if(bmi < 18.5){
        category = "Underweight";
    }
    else if(bmi < 25){
        category = "Normal";
    }
    else if(bmi < 30){
        category = "Overweight";
    }
    else{
        category = "Obese";
    }

    bmiResult.innerHTML =
        `BMI: ${bmi.toFixed(1)}<br>${category}`;
});
const linkNameInput =
    document.getElementById("linkNameInput");

const linkUrlInput =
    document.getElementById("linkUrlInput");

const addLinkBtn =
    document.getElementById("addLinkBtn");

const linksList =
    document.getElementById("linksList");

let links =
    JSON.parse(localStorage.getItem("links")) || [];

renderLinks();

addLinkBtn.addEventListener("click", () => {

    const name =
        linkNameInput.value.trim();

    const url =
        linkUrlInput.value.trim();

    if(name === "" || url === ""){
        alert("Fill all fields");
        return;
    }

    links.push({
        name,
        url
    });

    localStorage.setItem(
        "links",
        JSON.stringify(links)
    );

    linkNameInput.value = "";
    linkUrlInput.value = "";

    renderLinks();
});

function renderLinks(){

    linksList.innerHTML = "";

    links.forEach((link,index)=>{

        const div =
            document.createElement("div");

        div.classList.add("link-item");

        div.innerHTML = `
            <strong>${link.name}</strong>

            <div class="link-actions">

                <button
                    class="open-btn"
                    onclick="window.open('${link.url}','_blank')"
                >
                    Open
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteLink(${index})"
                >
                    Delete
                </button>

            </div>
        `;

        linksList.appendChild(div);
    });
}

function deleteLink(index){

    links.splice(index,1);

    localStorage.setItem(
        "links",
        JSON.stringify(links)
    );

    renderLinks();
}
const journalInput =
    document.getElementById("journalInput");

const saveJournalBtn =
    document.getElementById("saveJournalBtn");

const journalList =
    document.getElementById("journalList");

let journals =
    JSON.parse(localStorage.getItem("journals")) || [];

renderJournals();

saveJournalBtn.addEventListener("click", () => {

    const text =
        journalInput.value.trim();

    if(text === ""){
        alert("Write something");
        return;
    }

    journals.unshift({
        date: new Date().toLocaleDateString(),
        text
    });

    localStorage.setItem(
        "journals",
        JSON.stringify(journals)
    );

    journalInput.value = "";

    renderJournals();
});

function renderJournals(){

    journalList.innerHTML = "";

    journals.forEach((entry,index)=>{

        const div =
            document.createElement("div");

        div.classList.add("journal-entry");

        div.innerHTML = `
            <div class="journal-date">
                ${entry.date}
            </div>

            <p>${entry.text}</p>

            <button
                class="delete-btn"
                onclick="deleteJournal(${index})"
            >
                Delete
            </button>
        `;

        journalList.appendChild(div);
    });
}

function deleteJournal(index){

    journals.splice(index,1);

    localStorage.setItem(
        "journals",
        JSON.stringify(journals)
    );

    renderJournals();
}