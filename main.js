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

    const name = document.createElement('h2');
    name.textContent = user.name;

    const email = document.createElement('p');
    email.textContent = user.email;

    // card.appendChild(name);
    // card.appendChild(email);

    // La linea inferior equivale a las dos superiores
    card.append(name, email);

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

const users = [];
const fetchButton = document.getElementById('fetch-button');

fetchButton.addEventListener('click', () => {
    const cards = renderCards(users);
    refresh('insert-results');
    show('insert-results', cards);
});


