
// =========================
// OneDesk V3 Statistics (UI)
// =========================

document.getElementById("totalTasks").textContent = "28";
document.getElementById("totalNotes").textContent = "16";
document.getElementById("totalCalories").textContent = "15240";
document.getElementById("totalWater").textContent = "24 L";

document.getElementById("weeklySummary").textContent =
"You completed 28 tasks this week, created 16 notes, logged 15,240 kcal and drank 24 litres of water. Great consistency!";

const productivity = document.getElementById("productivityChart");

new Chart(productivity,{

type:"line",

data:{

labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

datasets:[{

label:"Tasks",

data:[5,8,6,10,7,9,12],

borderColor:"#7C3AED",

backgroundColor:"rgba(124,58,237,.2)",

fill:true,

tension:.4

}]

},

options:{

responsive:true,

plugins:{
legend:{display:false}
}

}

});

const health = document.getElementById("healthChart");

new Chart(health,{

type:"bar",

data:{

labels:["Calories","Water"],

datasets:[{

data:[2200,3.6],

backgroundColor:[

"#7C3AED",

"#06B6D4"

]

}]

},

options:{

responsive:true,

plugins:{
legend:{display:false}
}

}

});

console.log("Statistics Loaded");

