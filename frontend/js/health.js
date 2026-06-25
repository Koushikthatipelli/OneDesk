
let waterChart;
let calorieChart;


const token =
    localStorage.getItem("token");

if (!token) {

    window.location.href =
        "login.html";

}

const waterLogs =
    document.getElementById(
        "waterLogs"
    );


const foodName =
    document.getElementById("foodName");

const quantity =
    document.getElementById("quantity");

const mealType =
    document.getElementById("mealType");

const addFoodBtn =
    document.getElementById("addFoodBtn");

const foodLogs =
    document.getElementById("foodLogs");

const caloriesTotal =
    document.getElementById("caloriesTotal");

const proteinTotal =
    document.getElementById("proteinTotal");

const carbsTotal =
    document.getElementById("carbsTotal");

const fatsTotal =
    document.getElementById("fatsTotal");

const waterTotal =
    document.getElementById("waterTotal");
    const foodSuggestions =
    document.getElementById(
        "foodSuggestions"
    );

const availableFoods = [

    // Eggs & Dairy

    "Egg",
    "Boiled Egg",
    "Omelette",
    "Egg White",
    "Milk",
    "Curd",
    "Paneer",
    "Butter",
    "Cheese",
    "Greek Yogurt",

    // Fruits

    "Banana",
    "Apple",
    "Orange",
    "Mango",
    "Papaya",
    "Watermelon",
    "Pineapple",
    "Guava",
    "Grapes",
    "Pomegranate",
    "Kiwi",
    "Muskmelon",
    "Strawberry",
    "Pear",
    "Dates",

    // Rice

    "White Rice",
    "Brown Rice",
    "Curd Rice",
    "Lemon Rice",
    "Tomato Rice",
    "Fried Rice",
    "Jeera Rice",
    "Veg Biryani",
    "Chicken Biryani",
    "Mutton Biryani",

    // Roti & Bread

    "Chapati",
    "Roti",
    "Paratha",
    "Aloo Paratha",
    "Naan",
    "Kulcha",
    "Bread",
    "Brown Bread",

    // South Indian

    "Idli",
    "Dosa",
    "Masala Dosa",
    "Rava Dosa",
    "Onion Dosa",
    "Uttapam",
    "Pongal",
    "Upma",
    "Poha",
    "Vada",
    "Medu Vada",
    "Sambar",
    "Rasam",

    // Chicken

    "Chicken Breast",
    "Chicken Curry",
    "Chicken Fry",
    "Chicken Biryani",
    "Chicken Tikka",
    "Grilled Chicken",
    "Chicken Wings",

    // Fish & Seafood

    "Fish Curry",
    "Fish Fry",
    "Prawns",
    "Shrimp Curry",
    "Tuna",

    // Mutton

    "Mutton Curry",
    "Mutton Fry",

    // Vegetarian Protein

    "Dal",
    "Rajma",
    "Chole",
    "Green Gram",
    "Black Gram",
    "Soy Chunks",
    "Tofu",

    // Breakfast

    "Oats",
    "Corn Flakes",
    "Muesli",
    "Peanut Butter",

    // Drinks

    "Tea",
    "Coffee",
    "Green Tea",
    "Black Coffee",
    "Lassi",
    "Buttermilk",
    "Coconut Water",

    // Nuts

    "Almonds",
    "Cashews",
    "Walnuts",
    "Peanuts",
    "Pistachios",

    // Fitness

    "Protein Shake",
    "Whey Protein",
    "Mass Gainer"

];



// Load Dashboard

async function loadHealth() {

    try {

       const foodResponse =
await fetch(
    `${API_URL}/health/water`,
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

        const foods =
            await foodResponse.json();

        let calories = 0;
        let protein = 0;
        let carbs = 0;
        let fats = 0;

        foodLogs.innerHTML = "";

        foods.forEach(food => {

            calories += food.calories;
            protein += food.protein;
            carbs += food.carbs;
            fats += food.fats;

            const card =
                document.createElement("div");

            card.classList.add(
                "food-log-card"
            );

            card.innerHTML = `
                <h3>
                    ${food.foodName}
                </h3>

                <p>
                    Meal:
                    ${food.mealType}
                </p>

                <p>
                    Quantity:
                    ${food.quantity}
                </p>

                <p>
                    Calories:
                    ${food.calories}
                </p>

                <button
                    class="delete-food-btn"
                    onclick="deleteFood('${food._id}')"
                >
                    🗑 Delete
                </button>
            `;

            foodLogs.appendChild(card);

        });

        caloriesTotal.textContent =
            calories;

        proteinTotal.textContent =
            protein.toFixed(1) + "g";

        carbsTotal.textContent =
            carbs.toFixed(1) + "g";

        fatsTotal.textContent =
            fats.toFixed(1) + "g";

        const waterResponse =
          await fetch(
    `${API_URL}/health/water`,
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

        const water =
            await waterResponse.json();

        waterTotal.textContent =
            water.totalWater + "ml";
            
const goal = 4000;

const percentage =
    Math.min(
        (water.totalWater / goal) * 100,
        100
    );

document.getElementById(
    "waterFill"
).style.height =
    percentage + "%";

document.getElementById(
    "waterPercent"
).textContent =
    Math.round(percentage) + "%";

document.getElementById(
    "waterGoalText"
).textContent =
    `${water.totalWater} / ${goal} ml`;
 
waterLogs.innerHTML = "";

water.logs.forEach(log => {

    const card =
        document.createElement("div");

    card.classList.add(
        "water-log-card"
    );

    card.innerHTML = `

        <span>
            💧 ${log.amount}ml
        </span>

        <button
            class="delete-water-btn"
            onclick="deleteWater('${log._id}')"
        >
            🗑 Delete
        </button>

    `;

    waterLogs.appendChild(card);

});




    }

    catch(error){

        console.error(error);

    }

}

// Add Food

addFoodBtn.addEventListener(
    "click",
    async () => {

        try {

            if(
                !foodName.value ||
                !quantity.value
            ){
                return;
            }

            await fetch(
         `${API_URL}/health/food`,
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json",

                        Authorization:
                        `Bearer ${token}`
                    },

                    body:JSON.stringify({

                        foodName:
                            foodName.value,

                        quantity:
                            Number(
                                quantity.value
                            ),

                        mealType:
                            mealType.value

                    })
                }
            );

            foodName.value = "";
            quantity.value = "";

            loadHealth();

        }

        catch(error){

            console.error(error);

        }

    }
);

// Delete Food

async function deleteFood(id) {

    try {

        await fetch(
            `${API_URL}/health/food/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );
        loadAnalytics();

        loadHealth();

    }

    catch (error) {

        console.error(error);

    }

}

// Water Buttons

document
.querySelectorAll(".water-btn")
.forEach(button => {

    button.addEventListener(
        "click",
        async () => {

            const amount =
                Number(
                    button.dataset.water
                );

            await fetch(
    `${API_URL}/health/water`,
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json",

                        Authorization:
                        `Bearer ${token}`
                    },

                    body:JSON.stringify({
                        amount
                    })
                }
            );
            loadAnalytics();

            loadHealth();

        }
    );

});

foodName.addEventListener(
    "input",
    () => {

        const search =
            foodName.value
            .toLowerCase();

        foodSuggestions.innerHTML = "";

        if(search.length === 0){

            return;

        }

        const filteredFoods =
            availableFoods.filter(
                food =>
                    food
                    .toLowerCase()
                    .includes(search)
            );

        filteredFoods.forEach(food => {

            const item =
                document.createElement("div");

            item.classList.add(
                "suggestion-item"
            );

            item.textContent =
                food;

            item.addEventListener(
                "click",
                () => {

                    foodName.value =
                        food;

                    foodSuggestions
                        .innerHTML = "";

                }
            );

            foodSuggestions
                .appendChild(item);

        });

    }
);



async function deleteWater(id) {

    try {

        await fetch(

           `${API_URL}/health/water/${id}`,

            {

                method: "DELETE",

                headers: {

                    Authorization:
                    `Bearer ${token}`

                }

            }

        );

        loadHealth();

    }

    catch (error) {

        console.error(error);

    }

}

async function loadAnalytics() {

    try {
const response =
await fetch(
    `${API_URL}/health/analytics`,
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        const labels =
            data.map(
                item => item.day
            );

        const waterData =
            data.map(
                item => item.water
            );

        const calorieData =
            data.map(
                item => item.calories
            );

        if(waterChart){

            waterChart.destroy();

        }

        if(calorieChart){

            calorieChart.destroy();

        }
waterChart = new Chart(

    document.getElementById(
        "waterChart"
    ),

    {

        type: "line",

        data: {

            labels,

            datasets: [{

                label:
                    "💧 Water Intake",

                data:
                    waterData,

                borderColor:
                    "#3b82f6",

                backgroundColor:
                    "rgba(59,130,246,0.2)",

                fill: true,

                tension: 0.4,

                borderWidth: 4,

                pointRadius: 6,

                pointHoverRadius: 8

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    labels: {

                        font: {
                            size: 14,
                            weight: "bold"
                        }

                    }

                }

            }

        }

    }

);
        calorieChart =
            new Chart(

                document.getElementById(
                    "calorieChart"
                ),

                {

                    type:"bar",

                    data:{

                        labels,

                        datasets:[{

                            label:
                                "Calories",

                            data:
                                calorieData

                        }]

                    }

                }

            );

    }

    catch(error){

        console.error(error);

    }

}


loadAnalytics();
loadHealth();

