// import axios from "axios";
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let currentPage = 1;
const itemsPerPage = 10;

fetchDataWithAxios();
const apiSelector = document.getElementById('api-selector');
const searchInput = document.getElementById('search-input');
const loadingElement = document.getElementById('loading-element');
const errorElement = document.getElementById('insert-error-element');
const resultsContainer = document.getElementById('insert-results');
const paginationContainer = document.getElementById('pagination-container');

const createCard = (user) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const userId = document.createElement('h2');
    userId.textContent = user.userId;

    const id = document.createElement('p');
    id.textContent = user.id;

    const title = document.createElement('p');
    title.textContent = user.title;

    const body = document.createElement('p');
    body.textContent = user.body;

    // card.appendChild(name);
    // card.appendChild(email);

    // La linea inferior equivale a las dos superiores
    card.append(userId, id, title, body);

    return card;
}

const renderCards = (users) => {
    const fragment = document.createDocumentFragment();

    users.forEach(user => {
        const card = createCard(user);
        fragment.appendChild(card);
    });
    return fragment;
}

const show = (id, toshow) => {
    // así perdería los nodos creados en createCard:
    // document.getElementById(id).textContent = toshow;
    document.getElementById(id).appendChild(toshow);
}

const refresh = (id) => {
    const container = document.getElementById(id);
    container.replaceChildren();
}





const showLoading = () => {
    loadingElement.classList.remove('hidden');
}

const hideLoading = () => {
    loadingElement.classList.add('hidden');
}

const showError = () => {
    // ACTUALIZAR TEXTO DE ERROR
    errorElement.classList.remove('hidden');
}

const hideError = () => {
    errorElement.classList.add('hidden');
}

const fetchData = async (params) => {
    const searchTherm = searchInput.value;
    const useAxios = apiSelector.value;

    showLoading();
    hideError();

        // ... (Neteja resultats anteriors i paginació anterior)

    try {
        if (useAxios) {
            // ... (Crida la funció per obtenir dades amb Axios)
        } else {
            // ... (Crida la funció per obtenir dades amb Fetch)
        }
    } catch (error) {
        // ... (Gestiona errors inesperats si s'escapen de les funcions específiques de Fetch/Axios)
    } finally {
        hideLoading();
    }

}

// Funció per a la visualització dels resultats i la paginació (a implementar)
function displayResults(items, totalItems) {
    // ... (Implementa la lògica per mostrar cada "ítem" com una targeta i per cridar setupPagination)
}

function setupPagination(totalItems) {
    // ... (Implementa la lògica per crear els botons de paginació)
}

// Funció per obtenir dades amb Fetch (a implementar)
async function fetchDataWithFetch(searchTerm) {
    // ... (Implementa la petició amb Fetch API)
}

async function fetchDataWithAxios(searchTerm) {
    // ... (Implementa la petició amb Fetch API)
    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log(response.data);
}

const executeFetchData = async () => {
    const resultsFetchData = await fetchData();
    return resultsFetchData;
}

const users = [];
const fetchButton = document.getElementById('fetch-button');

fetchButton.addEventListener('click', () => {
    // const cards = renderCards(users);
    const results = executeFetchData();


    refresh('insert-results');
    show('insert-results', results);
});



