
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

async function loadTasks() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/todos",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const tasks = await response.json();

        updateProgress(tasks);

        taskList.innerHTML = "";

        tasks.forEach(task => {

            const li =
                document.createElement("div");

            li.classList.add("task-card");

            li.innerHTML = `

                <div class="task-item">

                    <div class="left-task">

                        <input
                            type="checkbox"
                            ${task.completed ? "checked" : ""}
                            onchange="
                                toggleTask(
                                    '${task._id}',
                                    this.checked
                                )
                            "
                        >

                        <span class="
                            task-title
                            ${task.completed ? "completed" : ""}
                        ">
                            ${task.title}
                        </span>

                    </div>

                    <div style="
                        display:flex;
                        align-items:center;
                        gap:10px;
                    ">

                        ${
                            task.completed
                            ? `<span class="completed-badge">
                                Completed
                               </span>`
                            : ""
                        }

                        <button
                            class="delete-btn"
                            onclick="deleteTask('${task._id}')">
                            Delete
                        </button>

                    </div>

                </div>

            `;

            taskList.appendChild(li);

        });

    } catch (error) {

        console.error(error);

    }

}

addTaskBtn.addEventListener(
"click",
async () => {

    try {

        const title =
            taskInput.value.trim();

        if (!title) {

            alert("Enter a task");

            return;

        }

        await fetch(
            "http://localhost:5000/api/todos",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${token}`
                },

                body: JSON.stringify({
                    title
                })
            }
        );

        taskInput.value = "";

        loadTasks();

    } catch (error) {

        console.error(error);

    }

});

async function toggleTask(id, completed) {

    try {

        await fetch(
            `http://localhost:5000/api/todos/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${token}`
                },

                body: JSON.stringify({
                    completed
                })
            }
        );

        loadTasks();

    } catch (error) {

        console.error(error);

    }

}

async function deleteTask(id) {

    try {

        await fetch(
            `http://localhost:5000/api/todos/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        loadTasks();

    } catch (error) {

        console.error(error);

    }

}

function updateProgress(tasks) {

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    const total =
        tasks.length;

    const percentage =
        total === 0
        ? 0
        : Math.round(
            (completed / total) * 100
        );

    document.getElementById(
        "progressText"
    ).textContent =
    `${percentage}%`;

    document.getElementById(
        "progressFill"
    ).style.width =
    `${percentage}%`;

}

loadTasks();

