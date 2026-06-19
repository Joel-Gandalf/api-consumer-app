// import axios from "axios";
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let currentPage = 1;
const itemsPerPage = 10;

const apiSelector = document.getElementById('api-selector');
const searchInput = document.getElementById('search-input');
const loadingElement = document.getElementById('loading-element');
const errorElement = document.getElementById('insert-error-element');
const resultsContainer = document.getElementById('insert-results');
const paginationContainer = document.getElementById('pagination-container');

const createCard = (user) => {
    const card = document.createElement('div');
    card.classList.add('card');

    // const userId = document.createElement('h2');
    // userId.textContent = user.userId;

    const title = document.createElement('h2');
    title.textContent = user.title;

    const body = document.createElement('p');
    body.textContent = user.body;

    const id = document.createElement('p');
    id.textContent = user.id;

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

const showError = (messageError) => {
    const error = document.createElement('p');
    error.classList.add('error-element');
    error.textContent = messageError;

    errorElement.classList.remove('hidden');

    refresh('insert-error-element');

    show('insert-error-element', error);
}

const hideError = () => {
    errorElement.classList.add('hidden');
}

const fetchData = async () => {
    const searchTerm = searchInput.value;
    const apiSelectorValue = apiSelector.value;
    const useAxios = apiSelectorValue === 'axios';
    showLoading();
    hideError();
    refresh('insert-results');
    refresh('pagination-container');
    // ... (Neteja resultats anteriors i paginació anterior)

    try {
        if (useAxios) {
            // ... (Crida la funció per obtenir dades amb Axios)
            await fetchDataWithAxios(searchTerm);
        } else {
            // ... (Crida la funció per obtenir dades amb Fetch)
            await fetchDataWithFetch(searchTerm);
        }
    } catch (error) {
        // ... (Gestiona errors inesperats si s'escapen de les funcions específiques de Fetch/Axios)
        showError(error.message);
    } finally {
        hideLoading();
    }

}

// Funció per a la visualització dels resultats i la paginació (a implementar)
function displayResults(items, totalItems) {
    // ... (Implementa la lògica per mostrar cada "ítem" com una targeta i per cridar setupPagination)
    refresh('insert-results');
    if (items.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.classList.add('no-results-message');
        noResultsMessage.textContent = `No s'han trobat resultats`;
        show('insert-results', noResultsMessage);
        return;
    }

    const cards = renderCards(items);
    show('insert-results', cards);
    setupPagination(totalItems);
}

function setupPagination(totalItems) {
    // ... (Implementa la lògica per crear els botons de paginació)
    refresh('pagination-container');

    const buttons = document.createDocumentFragment()
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = i;
        // const buttonLeft = document.createElement('button');
        // const buttonRigth = document.createElement('button');
        // buttonLeft.classList.add('button');
        // buttonRigth.classList.add('button');
        button.addEventListener('click', () => {
            currentPage = i;
            fetchData();
            // button.disabled = true;
        });
        if (i === currentPage) {
            button.disabled = true;
            button.classList.add('active');
        }

        buttons.appendChild(button);
    }
    show('pagination-container', buttons);
}

// Funció per obtenir dades amb Fetch (a implementar)
async function fetchDataWithFetch(searchTerm) {
    // ... (Implementa la petició amb Fetch API)
    try {
        // request
        const response = await fetch(`${API_URL}?_page=${currentPage}&_limit=${itemsPerPage}&q=${searchTerm}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        // json()es asíncrono, como todos los demás métodos para acceder al contenido del cuerpo de la respuesta. POR ESO NECESITAMOS await OTRA VEZ.
        const result = await response.json();
        // cabezera de http que devuelve el total de items en servidor.
        const totalItems = response.headers.get('X-Total-Count');

        displayResults(result, totalItems);
    } catch (error) {
        showError(error.message);
    }
}

async function fetchDataWithAxios(searchTerm) {
    // ... (Implementa la petició amb Fetch API)
    try {
        const response = await axios.get(API_URL, {
            params: {
                _page: currentPage,
                _limit: itemsPerPage,
                q: searchTerm
            }
        });
        const result = response.data;
        const totalItems = response.headers['x-total-count'];

        displayResults(result, totalItems);
    } catch (error) {
        if (error.response) {
            showError(error.response.statusText);
            return;
        }
        showError(error.message);
    }
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


