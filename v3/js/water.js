
// =========================
// OneDesk V3 Water (UI)
// =========================

let totalWater = 0;
const goal = 4000;

const history = [];

const todayWater = document.getElementById("todayWater");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const historyBox = document.getElementById("waterHistory");

function updateDashboard(){

    todayWater.textContent =
    (totalWater/1000).toFixed(2) + " L";

    const percent =
    Math.min((totalWater/goal)*100,100);

    progressFill.style.width =
    percent + "%";

    progressText.textContent =
    Math.round(percent) + "% Completed";

}

function renderHistory(){

    historyBox.innerHTML="";

    history.forEach(item=>{

        historyBox.innerHTML += `

<div class="history-card">

<div>

<strong>${item.amount} ml</strong>

<br>

<small>${item.time}</small>

</div>

<i class="ti ti-droplet-filled"></i>

</div>

`;

    });

}

document.querySelectorAll(".water-btn").forEach(btn=>{

    btn.onclick=()=>{

        const amount =
        Number(btn.dataset.amount);

        totalWater += amount;

        history.unshift({

            amount:amount,

            time:new Date().toLocaleTimeString(
                "en-IN",
                {
                    hour:"2-digit",
                    minute:"2-digit"
                }
            )

        });

        updateDashboard();

        renderHistory();

    };

});

updateDashboard();

console.log("OneDesk V3 Water Loaded");

