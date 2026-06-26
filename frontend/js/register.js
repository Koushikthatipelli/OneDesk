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

            showWarning("Passwords do not match");

            return;

        }

        try {
            showLoader("Creating Account...");

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

               showError(data.message);

                return;

            }

            showSuccess("Account Created Successfully");
           hideLoader();
            window.location.href =
                "login.html";

        }

        catch (error) {
             hideLoader();

            console.error(
                error
            );

            alert(
                "Server Error"
            );

        }

    }
);