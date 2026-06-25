const registerForm =
    document.getElementById("registerForm");

registerForm.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

        const name =
            document.getElementById("name").value;

      const email =
    document.getElementById("email").value;

const password =
    document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            alert(
                "Passwords do not match!"
            );

            return;

        }

        try {

            const response =
                await fetch(
                    `${API_URL}/auth/register`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                            "application/json"
                        },

                        body: JSON.stringify({

                            name,
                            email,
                            password

                        })

                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                alert(
                    data.message
                );

                return;

            }

            alert(
                "Registration Successful!"
            );

            window.location.href =
                "login.html";

        }

        catch (error) {

            console.error(
                error
            );

            alert(
                "Server Error"
            );

        }

    }
);