function displayRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));
  
    if (savedRecipes === null) {
      return;
    }
  
    const savedRecipesContainer = document.querySelector('#savedRecipes');
  
    savedRecipes.forEach((recipe) => {
      const recipeHTML = `
        <div class="recipe">
          <h3>${recipe.title}</h3>
          <img src="${recipe.image}" alt="${recipe.title}">
        </div>
      `;
  
      savedRecipesContainer.insertAdjacentHTML('beforeend', recipeHTML);
    });
  }
  