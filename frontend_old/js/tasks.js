
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
    `${BASE_URL}/todos`,
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
        showError("Unable to process task");

    }

}

addTaskBtn.addEventListener(
"click",
async () => {

    try {

        const title =
            taskInput.value.trim();

        if (!title) {

           showWarning("Please enter a task");

            return;

        }

        await fetch(
            `${BASE_URL}/todos`,
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
        showSuccess("Task Added Successfully");

        loadTasks();

    } catch (error) {

        console.error(error);
showError("Unable to process task");
    }

});

async function toggleTask(id, completed) {

    try {
        showLoader("Updating Task...");

        await fetch(
    `${BASE_URL}/todos/${id}`,
    {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
            completed
        })
    }
);
        hideLoader();
        showSuccess("Task Updated Successfully");
        loadTasks();

    } catch (error) {
        hideLoader();
       
console.error(error);

showError("Unable to process task");
    }

}

async function deleteTask(id) {

    try {
        showLoader("Deleting Task...");
await fetch(
    `${BASE_URL}/todos/${id}`,
    {
        method: "DELETE",
        headers: {
            Authorization:
            `Bearer ${token}`
        }
    }
);
        hideLoader();
        loadTasks();

    } catch (error) {

        console.error(error);
        hideLoader();
        showError("Unable to process task");

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

