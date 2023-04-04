let recipe;

function saveRecipes() {
    // Retrieve existing recipes from local storage
    const existingRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

    // Add new recipe to array
    existingRecipes.push(JSON.stringify(recipe));

    // Save updated array back to local storage
    localStorage.setItem('savedRecipes', JSON.stringify(existingRecipes));

    // Show success message to the user
    alert(`Recipe "${recipe.title}" saved successfully!`);
}

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

const baseURL = "https://api.spoonacular.com/recipes/";
const key = "9364ffa2e0f84be6902d065f72360c25";
const fullURL = `${baseURL}${recipeId}/information?apiKey=${key}`;
const request = new Request(fullURL);

fetch(request)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        recipe = data;

        let text = `
            <figure>
              <figcaption>${recipe.title}</figcaption>
              <img src="${recipe.image}">
            </figure>
            <p>Serves ${recipe.servings} - Ready in ${recipe.readyInMinutes} mins.</p>
            <ul class="ingredients">
              <h3>Ingredients:</h3>
          `;
        recipe.extendedIngredients.forEach(
            (ingr) => (text += `<li>${ingr.name}</li>`)
        );
        text += `</ul><div class="instructions"><h3>Instructions</h3> <p>${recipe.instructions ? recipe.instructions : recipe.summary}</p></div>`;

        text += `<p>Created by ${recipe.sourceName}. <a href="${recipe.spoonacularSourceUrl}">More info</a>.</p>
            <button class="btnHomePage" id="saveSearch-btn">Save Recipe!</button>
        `;

        const recipes = document.querySelector('#recipes');
        recipes.insertAdjacentHTML("beforeend", text);
    });

document.addEventListener('click', function (event) {
    if (event.target.id === 'saveSearch-btn') {
        saveRecipes();
    }
});
