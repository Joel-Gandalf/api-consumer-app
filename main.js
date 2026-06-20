const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let currentPage = 1;
const itemsPerPage = 10;

const loadingElement = document.getElementById('loading-element');
const errorElement = document.getElementById('insert-error-element');

const createCard = (item) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.textContent = item.title;

    const body = document.createElement('p');
    body.textContent = item.body;

    const id = document.createElement('p');
    id.textContent = item.id;

    card.append(title, body, id);

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
    const apiSelector = document.getElementById('api-selector');
    const apiSelectorValue = apiSelector.value;
    const useAxios = apiSelectorValue === 'axios';

    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim().toLowerCase();
   
    showLoading();
    hideError();
    refresh('insert-results');
    refresh('pagination-container');
    
    try {
        if (useAxios) {
            await fetchDataWithAxios(searchTerm);
        } else {
            await fetchDataWithFetch(searchTerm);
        }
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
     currentPage = 1
}

function displayResults(items, totalItems) {
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
    refresh('pagination-container');

    const buttons = document.createDocumentFragment()
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.classList.add('button-pagination');
        button.textContent = i;

        button.addEventListener('click', () => {
            currentPage = i;
            fetchData();
        });

        if (i === currentPage) {
            button.disabled = true;
            button.classList.add('active');
        }

        buttons.appendChild(button);
    }

    show('pagination-container', buttons);
}

async function fetchDataWithFetch(searchTerm) {
    try {
        const response = await fetch(`${API_URL}?_page=${currentPage}&_limit=${itemsPerPage}&q=${searchTerm}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        const totalItems = response.headers.get('X-Total-Count');

        displayResults(result, totalItems);
    } catch (error) {
        showError(error.message);
    }
}

async function fetchDataWithAxios(searchTerm) {
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

const fetchButton = document.getElementById('fetch-button');

fetchButton.addEventListener('click', () => {
    fetchData();
});
