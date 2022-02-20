// To import everything use * and to name the imported (model) and the import from thr current folder './model.js':
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';

// install npm i core-js & npm i regenerator-runtime:
import 'regenerator-runtime/runtime'; //it is for polyfilling async/await.
import 'core-js/stable'; // it is for polyfilling everything else.
import { async } from 'regenerator-runtime';
import addRecipeView from './views/addRecipeView.js';

// activate that hot module reloading that I mentioned in the last section. So remember that with parcel, we can do this. So if module.hot, then module.hot.accept. All right? And again, this is not real JavaScript, at least this module.hot. This is simply coming from parcel.
// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Project Overview and Planning (I):
// Theory-lectures-v2:
// ..............................................

// Loading a Recipe from API:

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    // Guard cluse:
    if (!id) return;
    recipeView.renderSpinner();

    // 0- Update results view to mark selected search result:
    resultsView.update(model.getSearchResultsPage());

    // 1- Updating bookmarks view:
    bookmarksView.update(model.state.bookmarks);

    // 2- Loading recipe:
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 3- Rendering recipe:
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err);
    console.log(err);
    recipeView.renderError();
    console.error(err);
  }
};
// controlRecipes();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    console.log(resultsView);

    // 1) Get search query:
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results:
    await model.loadSearchResults(query);

    // 3) Render results:
    console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination button:
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  console.log(goToPage);
  // 1) Render new results:
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render new pagination button:
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state):
  model.updateServings(newServings);

  // Update the recipe view:
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark:
  // console.log(model.state.recipe.bookmarked);
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view:
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks:
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  console.log(newRecipe);

  try {
    // Show loading spinner:
    addRecipeView.renderSpinner();

    // Upload the new recipe data:
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe:
    recipeView.render(model.state.recipe);

    // Success message:
    addRecipeView.renderMessage();

    // Render bookmark view:
    bookmarksView.render(model.state.bookmarks);

    // Change ID inURL:
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window:
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('...', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
