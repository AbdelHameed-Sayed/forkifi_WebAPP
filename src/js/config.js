//  into this file, we will basically put all the variables that should be constants and should be reused across the project. And the goal of having this file with all these variables is that it will allow us to easily configure or project by simply changing some of the data that is here in this configuration file. So therefore the name of config. So of course we will not want to put all the variables here in this file. The only variables that we do want here are the ones that are responsible for kind of defining some important data about the application itself.

export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
export const TIMEOUT_SEC = 10;
export const RESULTS_PER_PAGE = 10;
export const KEY = '5d05be0e-71c4-49cf-a258-9a4324afba94';
export const MODAL_CLOSE_SEC = 2.5;
