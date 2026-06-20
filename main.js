import { fetchDataWithFetch, fetchDataWithAxios } from "./src/api-logic.js";
import { renderCards, show, refresh, showLoading, hideLoading, showError, hideError } from "./src/api-ui.js";

let currentPage = 1;
const itemsPerPage = 10;

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
            await fetchDataWithAxios(searchTerm, currentPage, itemsPerPage, displayResults);
        } else {
            await fetchDataWithFetch(searchTerm, currentPage, itemsPerPage, displayResults);
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

const fetchButton = document.getElementById('fetch-button');

fetchButton.addEventListener('click', () => {
    fetchData();
});
