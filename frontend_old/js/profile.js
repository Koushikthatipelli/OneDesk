
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

// User Details

if (user) {

    document.getElementById(
        "userName"
    ).textContent =
    user.name;

    document.getElementById(
        "userEmail"
    ).textContent =
    user.email;

}

// Random Motivation

const quotes = [

    "Success is the sum of small efforts repeated daily.",

    "Stay consistent and trust the process.",

    "Small progress every day adds up.",

    "Focus on becoming better than yesterday.",

    "Discipline beats motivation.",

    "Dream big. Start small. Act now.",

    "Your future is created by what you do today."

];

document.getElementById(
    "profileQuote"
).textContent =

quotes[
    Math.floor(
        Math.random() *
        quotes.length
    )
];

// Logout

document.getElementById(
    "logoutBtn"
).addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        window.location.href =
            "login.html";

    }
);

