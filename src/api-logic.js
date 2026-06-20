import { showError } from "./api-ui.js";

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function fetchDataWithFetch(searchTerm, currentPage, itemsPerPage, displayResults) {
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

export async function fetchDataWithAxios(searchTerm, currentPage, itemsPerPage, displayResults) {
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