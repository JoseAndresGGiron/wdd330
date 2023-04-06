function displayRecipes() {
  const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));

  const savedRecipesContainer = document.querySelector('#savedRecipes');
  savedRecipesContainer.innerHTML = '';

  if (savedRecipes === null || savedRecipes.length === 0) {
    const noRecipesHTML = `
      <h2>No saved recipes yet..</h2>
      <h3>Find the best recipes<a href="/finalProject/wdd330/index.html"> here!</a> </h3>
    `;
    savedRecipesContainer.insertAdjacentHTML('beforeend', noRecipesHTML);
    return;
  }

  savedRecipes.forEach((recipe, index) => {
    if (recipe && recipe.title) {
      const recipeHTML = `
        <div class="recipe">
          <h3>${recipe.title}</h3>
          <img src="${recipe.image}" alt="${recipe.title} loading="lazy">
          <button class="btnHomePage" id="delete-btn-${index}">Delete Recipe</button>
        </div>
      `;

      savedRecipesContainer.insertAdjacentHTML('beforeend', recipeHTML);

      const deleteBtn = document.querySelector(`#delete-btn-${index}`);
      deleteBtn.addEventListener('click', () => {
        savedRecipes.splice(index, 1);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        savedRecipesContainer.innerHTML = '';
        displayRecipes();
      });
    }
  });
}

displayRecipes();