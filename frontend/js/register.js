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

                await fetch(`${BASE_URL}/api/auth/register`,  
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

    hideLoader();

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
const togglePassword =
document.getElementById("togglePassword");

const toggleConfirmPassword =
document.getElementById("toggleConfirmPassword");

const password =
document.getElementById("password");

const confirmPassword =
document.getElementById("confirmPassword");

if(togglePassword){

togglePassword.onclick=()=>{

password.type=
password.type==="password"
? "text"
: "password";

togglePassword.className=
password.type==="password"
? "ti ti-eye eye-toggle"
: "ti ti-eye-off eye-toggle";

};

}

if(toggleConfirmPassword){

toggleConfirmPassword.onclick=()=>{

confirmPassword.type=
confirmPassword.type==="password"
? "text"
: "password";

toggleConfirmPassword.className=
confirmPassword.type==="password"
? "ti ti-eye eye-toggle"
: "ti ti-eye-off eye-toggle";

};

}