const recipes = [
    {
        title: "Spaghetti Carbonara",
        image: "images/spaghetti.jpg",
        description: "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
        rating: 4,
        tags: ["Pasta", "Italian", "Dinner"]
    },
    {
        title: "Chicken Curry",
        image: "images/chicken-curry.jpg",
        description: "A flavorful and spicy chicken curry dish.",
        rating: 5,
        tags: ["Spicy", "Dinner", "Chicken"]
    },
    {
        title: "Avocado Toast",
        image: "images/avocado-toast.jpg",
        description: "A delicious and healthy avocado toast with a sprinkle of chili flakes.",
        rating: 4,
        tags: ["Breakfast", "Healthy", "Vegetarian"]
    }
];

// Function to display a recipe
function displayRecipe(recipe) {
    document.getElementById("recipe-title").textContent = recipe.title;
    document.getElementById("recipe-image").src = recipe.image;
    document.getElementById("recipe-description").textContent = recipe.description;
    document.getElementById("recipe-rating").innerHTML = generateStars(recipe.rating);
    document.getElementById("recipe-tags").textContent = "Tags: " + recipe.tags.join(", ");
}

// Function to generate star ratings
function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? "⭐" : "☆";
    }
    return `<div class="rating">${stars}</div>`;
}

// Function to search recipes
function searchRecipes() {
    const searchInput = document.getElementById("search-bar").value.toLowerCase().trim();

    // Find a matching recipe
    const foundRecipe = recipes.find(recipe =>
        recipe.title.toLowerCase().includes(searchInput) ||
        recipe.description.toLowerCase().includes(searchInput) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchInput))
    );

    if (foundRecipe) {
        displayRecipe(foundRecipe);
    } else {
        alert("No recipes found. Try a different keyword.");
    }
}

// Load a random recipe when the page loads
document.addEventListener("DOMContentLoaded", () => {
    displayRecipe(recipes[Math.floor(Math.random() * recipes.length)]);
});
