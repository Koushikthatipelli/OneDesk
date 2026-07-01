const token = localStorage.getItem("token");

if(!token){

    window.location.href="login.html";

}

async function loadDashboardStats(){

    try{

        const headers={

            Authorization:`Bearer ${token}`

        };

        const [

            taskRes,

            noteRes,

            foodRes,

            waterRes

        ]=await Promise.all([

            fetch(`${BASE_URL}/todos`,{headers}),

            fetch(`${BASE_URL}/notes`,{headers}),

            fetch(`${BASE_URL}/health/food`,{headers}),

            fetch(`${BASE_URLL}/health/water`,{headers})

        ]);

        const tasks=await taskRes.json();

        const notes=await noteRes.json();

        const foods=await foodRes.json();

        const water=await waterRes.json();

        document.getElementById("taskCount").textContent=
        tasks.length;

        document.getElementById("notesCount").textContent=
        notes.length;

        const calories=

        foods.reduce(

            (sum,item)=>sum+item.calories,

            0

        );

        document.getElementById("calorieCount").textContent=
        calories;

        document.getElementById("waterCount").textContent=
        `${water.totalWater}ml`;

    }

    catch(error){

        console.error(error);

    }

}

loadDashboardStats();