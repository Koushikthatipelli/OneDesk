
// =========================
// OneDesk V3 Settings (UI)
// =========================

const darkMode=document.getElementById("darkMode");
const animations=document.getElementById("animations");

darkMode.addEventListener("change",()=>{

if(darkMode.checked){

document.body.classList.remove("light-mode");

}else{

document.body.classList.add("light-mode");

}

});

animations.addEventListener("change",()=>{

document.body.classList.toggle(
"reduce-motion",
!animations.checked
);

});

document.querySelector(".danger-btn").onclick=()=>{

if(confirm("Logout from OneDesk?")){

localStorage.removeItem("token");
localStorage.removeItem("user");
window.location.href="login.html";

}

};

document.querySelector(".action-btn").onclick=()=>{

alert("Change Password UI will be connected in backend phase.");

};

console.log("OneDesk V3 Settings Loaded");

