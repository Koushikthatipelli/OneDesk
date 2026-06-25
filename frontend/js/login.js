const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const email =
        document.querySelector('input[type="email"]').value;

    const password =
        document.querySelector('input[type="password"]').value;

    try {

        const response = await fetch(
            `${API_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);
            return;

        }

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        alert("Login Successful!");

        window.location.href = "home.html";

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

});