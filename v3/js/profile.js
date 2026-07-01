
// =========================
// OneDesk V3 Profile (UI)
// =========================

const user={
name:"Koushik",
email:"koushik@example.com",
goal:"Stay Productive"
};

document.getElementById("userName").textContent=user.name;
document.getElementById("userEmail").textContent=user.email;

document.getElementById("fullName").value=user.name;
document.getElementById("email").value=user.email;
document.getElementById("goal").value=user.goal;

document.getElementById("editProfileBtn").onclick=()=>{

document.getElementById("fullName").focus();

};

document.getElementById("saveProfile").onclick=()=>{

user.name=document.getElementById("fullName").value;
user.email=document.getElementById("email").value;
user.goal=document.getElementById("goal").value;

document.getElementById("userName").textContent=user.name;
document.getElementById("userEmail").textContent=user.email;

alert("Profile updated successfully!");

};

console.log("OneDesk V3 Profile Loaded");

