let recipe;

function saveRecipes() {
    // Retrieve existing recipes from local storage
    const existingRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

    // Add new recipe object to array containing only the required properties
    existingRecipes.push({
        title: recipe.title,
        image: recipe.image,
    });

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
              <img src="${recipe.image}" loading="lazy">
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
            <div class="product-detail__comments">
                <h3 id="h3Comments">Comments</h3>
                <ul class="comment-list"></ul>
                <form class="comment-form">
                <label for="comment">Add a comment:</label>
                <textarea id="comment" name="comment"></textarea>
                <button type="submit">Submit</button>
                </form>
            </div>
        `;

        const recipes = document.querySelector('#recipes');
        recipes.insertAdjacentHTML("beforeend", text);
        const recipeComments = new RecipeComments(recipeId);

        recipeComments.displayComments();

        const commentForm = document.querySelector('.comment-form');
        commentForm.addEventListener('submit', (event) => recipeComments.handleCommentSubmit(event));
    });

document.addEventListener('click', function (event) {
    if (event.target.id === 'saveSearch-btn') {
        saveRecipes();
    }
});

class RecipeComments {
    constructor(recipeId) {
        this.recipeId = recipeId;
        this.comments = JSON.parse(localStorage.getItem(`recipeComments_${recipeId}`)) || [];
    }

    saveComment(comment) {
        this.comments.push(comment);
        localStorage.setItem(`recipeComments_${this.recipeId}`, JSON.stringify(this.comments));
    }

    displayComments() {
        const commentList = document.querySelector('.comment-list');
        commentList.innerHTML = '';
        this.comments.forEach((comment) => {
            const li = document.createElement('li');
            li.textContent = comment;
            commentList.appendChild(li);
        });
    }

    handleCommentSubmit(event) {
        event.preventDefault();
        const commentInput = document.querySelector('#comment');
        const comment = commentInput.value;
        if (comment.trim() !== '') {
            this.saveComment(comment);
            this.displayComments();
            commentInput.value = '';
        }
    }
}