const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

  const email =
  document.getElementById("email").value;

  const password =
  document.getElementById("password").value;
    try {
        showLoader("Signing In...");
const response = await fetch(
    `${BASE_URL}/api/auth/login`,
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

    hideLoader();

    showError(data.message);

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
hideLoader();

showSuccess("Login Successful");

setTimeout(() => {

    window.location.href = "../v3/index.html";


}, 1000);
    }

    catch(error){

     hideLoader();

    console.error(error);

    showError("Server Error");

}

});
const togglePassword =
document.getElementById("togglePassword");

const password =
document.getElementById("password");

if(togglePassword){

togglePassword.onclick=()=>{

if(password.type==="password"){

password.type="text";

togglePassword.className="ti ti-eye-off eye-toggle";

}else{

password.type="password";

togglePassword.className="ti ti-eye eye-toggle";

}

};

}