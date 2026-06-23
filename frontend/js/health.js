
const token =
    localStorage.getItem("token");

if (!token) {

    window.location.href =
        "login.html";

}

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

// Load Dashboard

async function loadHealth() {

    try {

        const foodResponse =
            await fetch(
                "http://localhost:5000/api/health/food",
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
                "http://localhost:5000/api/health/water",
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
                "http://localhost:5000/api/health/food",
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
                            mealType.value,

                        calories:0,
                        protein:0,
                        carbs:0,
                        fats:0

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
                "http://localhost:5000/api/health/water",
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

            loadHealth();

        }
    );

});

loadHealth();

