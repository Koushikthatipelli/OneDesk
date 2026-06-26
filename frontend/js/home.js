
const user =
    JSON.parse(
        localStorage.getItem("user")
    );

const token =
    localStorage.getItem("token");

if (!token) {

    window.location.href =
        "login.html";

}

if (user) {

    document.getElementById(
        "userName"
    ).textContent =
    `${user.name} 👋`;

}

function goTasks() {

    window.location.href =
        "tasks.html";

}
function goHealth(){

    window.location.href =
        "health.html";

}

function goNotes() {

    window.location.href =
        "notes.html";

}

// Task Count

async function loadTaskCount() {

    try {

        const response =
            (
              (`${API_URL}/todos`),
                {
                    headers: {
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

        const tasks =
            await response.json();

        document.getElementById(
            "taskCount"
        ).textContent =
            `${tasks.length} Tasks Available`;

    }

    catch (error) {

        console.error(error);

    }

}
loadTaskCount();

// Quotes

const quotes = [

    "Small progress is still progress.",

    "Consistency beats motivation.",

    "Focus on the next step.",

    "Dream big. Start small.",

    "Your future is built today."

];

document.getElementById(
    "dailyQuote"
).textContent =

quotes[
    Math.floor(
        Math.random() *
        quotes.length
    )
];

// Greeting

function updateGreeting() {

    const hour =
        new Date().getHours();

    let greeting =
        "Good Evening";

    if (hour < 12) {

        greeting =
            "Good Morning ☀️";

    }

    else if (hour < 17) {

        greeting =
            "Good Afternoon 🌤️";

    }

    else if (hour < 21) {

        greeting =
            "Good Evening 🌇";

    }

    else {

        greeting =
            "Good Night 🌙";

    }

    document.getElementById(
        "greeting"
    ).textContent =
    greeting;

}

// Real Time Clock

function updateClock() {

    const now =
        new Date();

    const time =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

    const date =
        now.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    document.getElementById(
        "liveTime"
    ).textContent =
    time;

    document.getElementById(
        "liveDate"
    ).textContent =
    date;

}

updateGreeting();

updateClock();

setInterval(
    updateClock,
    1000
);
