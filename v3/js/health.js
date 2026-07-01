// ==========================================
// OneDesk V3 Health
// Premium Backend Connected
// ==========================================

// ===========================
// API URLs
// ===========================

const BASE_URL = "http://localhost:5000/api/health";

const FOOD_API = `${BASE_URL}/food`;
const WATER_API = `${BASE_URL}/water`;
const ANALYTICS_API = `${BASE_URL}/analytics`;
const SEARCH_API = `${BASE_URL}/search`;

// ===========================
// Authentication
// ===========================

const token = localStorage.getItem("token");

if (!token) {

    alert("Please login first.");

    window.location.href = "../frontend/login.html";

}

// ===========================
// Headers
// ===========================

const headers = {

    "Content-Type": "application/json",

    Authorization: `Bearer ${token}`

};

// ===========================
// Elements
// ===========================

const foodForm =
document.getElementById("foodForm");

const foodContainer =
document.getElementById("foodContainer");

const foodSearch =
document.getElementById("foodSearch");

const foodQty =
document.getElementById("foodQty");

const mealType =
document.getElementById("mealType");

const suggestions =
document.getElementById("foodSuggestions");

const caloriesToday =
document.getElementById("caloriesToday");

const proteinToday =
document.getElementById("proteinToday");

const waterToday =
document.getElementById("waterToday");

const mealCount =
document.getElementById("mealCount");

// ===========================
// Variables
// ===========================

let foods = [];

let selectedFood = null;

let analytics = {};

let totalWater = 0;

// ===========================
// Open Food Form
// ===========================

document
.getElementById("addFoodBtn")
.onclick = () => {

    foodForm.style.display = "grid";

};

// ===========================
// Close Suggestions
// ===========================

document.addEventListener("click", (e) => {

    if (!foodSearch.contains(e.target) &&
        !suggestions.contains(e.target)) {

        suggestions.style.display = "none";

    }

});
// ===========================
// Load Foods
// ===========================

async function loadFoods() {

    try {

        const response = await fetch(

            FOOD_API,

            {

                headers

            }

        );

        const data = await response.json();

        foods = data.foods || data;

        renderFoods();

        loadAnalytics();

    }

    catch (error) {

        console.log(error);

    }

}

// ===========================
// Load Analytics
// ===========================

async function loadAnalytics() {

    try {

        const response = await fetch(

            ANALYTICS_API,

            {

                headers

            }

        );

        const data = await response.json();

        analytics = data;

        if (data.today) {

            caloriesToday.textContent =
                data.today.calories;

            proteinToday.textContent =
                data.today.protein + " g";

            waterToday.textContent =
                (data.today.water / 1000).toFixed(2) + " L";

            mealCount.textContent =
                data.today.meals;

        }

    }

    catch (error) {

        console.log(error);

    }

}
// ===========================
// Food Search Suggestions
// ===========================

foodSearch.addEventListener("input", async () => {

    const query = foodSearch.value.trim();

    if (query.length < 2) {

        suggestions.innerHTML = "";

        suggestions.style.display = "none";

        return;

    }

    try {

        const response = await fetch(

            `${SEARCH_API}?query=${encodeURIComponent(query)}`,

            {

                headers

            }

        );

        const data = await response.json();

        suggestions.innerHTML = "";

        if (data.length === 0) {

            suggestions.style.display = "none";

            return;

        }

        data.forEach(food => {

            const item = document.createElement("div");

            item.className = "food-item";

            item.innerHTML = `

                <strong>${food.name}</strong>

                <br>

                <small>

                    ${food.calories} kcal •
                    ${food.protein} g Protein

                </small>

            `;

            item.onclick = () => {

                selectedFood = food;

                foodSearch.value = food.name;

                suggestions.style.display = "none";

                suggestions.innerHTML = "";

            };

            suggestions.appendChild(item);

        });

        suggestions.style.display = "block";

    }

    catch (error) {

        console.log(error);

    }

});
// ===========================
// Render Foods
// ===========================

function renderFoods() {

    foodContainer.innerHTML = "";

    if (foods.length === 0) {

        foodContainer.innerHTML = `

        <div class="empty-state">

            <h3>No foods added today</h3>

            <p>Click "Add Food" to start tracking.</p>

        </div>

        `;

        return;

    }

    foods.forEach(food => {

        foodContainer.innerHTML += `

        <div class="food-card">

            <div class="food-info">

                <h3>${food.foodName}</h3>

                <p>

                    ${food.quantity} g • ${food.mealType}

                </p>

                <small>

                    🔥 ${food.calories} kcal

                    &nbsp;&nbsp;

                    💪 ${food.protein} g

                    &nbsp;&nbsp;

                    🍚 ${food.carbs} g

                    &nbsp;&nbsp;

                    🥑 ${food.fats} g

                </small>

            </div>

            <div class="food-actions">

                <button

                    class="delete-food-btn"

                    onclick="deleteFood('${food._id}')"

                >

                    <i class="ti ti-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

}

// ===========================
// Save Food
// ===========================

document
.getElementById("saveFood")
.onclick = async () => {

    const foodName =

        foodSearch.value.trim();

    const quantity =

        foodQty.value;

    const meal =

        mealType.value;

    if (!foodName || !quantity) {

        alert("Fill all fields.");

        return;

    }

    try {

        const response = await fetch(

            FOOD_API,

            {

                method: "POST",

                headers,

                body: JSON.stringify({

                    foodName,

                    quantity,

                    mealType: meal

                })

            }

        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        foodSearch.value = "";

        foodQty.value = "";

        selectedFood = null;

        foodForm.style.display = "none";

        await loadFoods();

        await loadAnalytics();

    }

    catch (error) {

        console.log(error);

    }

};

// ===========================
// Delete Food
// ===========================

async function deleteFood(id) {

    if (!confirm("Delete this food?")) {

        return;

    }

    try {

        await fetch(

            FOOD_API + "/" + id,

            {

                method: "DELETE",

                headers

            }

        );

        await loadFoods();

        await loadAnalytics();

    }

    catch (error) {

        console.log(error);

    }

}
// ===========================
// Water Tracker
// ===========================

document.querySelectorAll(".water-btn").forEach(btn => {

    btn.addEventListener("click", async () => {

        try {

            const text = btn.innerText.trim();

            let amount = 0;

            if (text.includes("250")) amount = 250;
            else if (text.includes("500")) amount = 500;
            else if (text.includes("750")) amount = 750;
            else if (text.includes("1")) amount = 1000;

            const response = await fetch(

                WATER_API,

                {

                    method: "POST",

                    headers,

                    body: JSON.stringify({

                        amount

                    })

                }

            );

            if (!response.ok) {

                alert("Unable to add water.");

                return;

            }

            await loadAnalytics();

        }

        catch (error) {

            console.log(error);

        }

    });

});

// ===========================
// Close Food Form
// ===========================

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        foodForm.style.display = "none";

        suggestions.style.display = "none";

    }

});

// ===========================
// Initialize
// ===========================

window.onload = async () => {

    await loadFoods();

    await loadAnalytics();

};

console.log("✅ OneDesk V3 Health Connected");
// ===========================
// Food Selection
// ===========================

function selectFood(food) {

    selectedFood = food;

    foodSearch.value = food.name;

    suggestions.innerHTML = "";

    suggestions.style.display = "none";

    const preview = document.getElementById("nutritionPreview");

    if (!preview) return;

    preview.innerHTML = `

        <div class="nutrition-card">

            <h4>${food.name}</h4>

            <div class="nutrition-grid">

                <div>

                    🔥

                    <strong>${food.calories}</strong>

                    <span>Calories</span>

                </div>

                <div>

                    💪

                    <strong>${food.protein} g</strong>

                    <span>Protein</span>

                </div>

                <div>

                    🍚

                    <strong>${food.carbs} g</strong>

                    <span>Carbs</span>

                </div>

                <div>

                    🥑

                    <strong>${food.fats} g</strong>

                    <span>Fat</span>

                </div>

            </div>

        </div>

    `;

}