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

export const renderCards = (items) => {
    const fragment = document.createDocumentFragment();

    items.forEach(item => {
        const card = createCard(item);
        fragment.appendChild(card);
    });
    return fragment;
}

export const show = (id, toshow) => {
    document.getElementById(id).appendChild(toshow);
}

export const refresh = (id) => {
    const container = document.getElementById(id);
    container.replaceChildren();
}

export const showLoading = () => {
    loadingElement.classList.remove('hidden');
}

export const hideLoading = () => {
    loadingElement.classList.add('hidden');
}

export const showError = (messageError) => {
    const error = document.createElement('p');
    error.classList.add('error-element');
    error.textContent = messageError;

    errorElement.classList.remove('hidden');

    refresh('insert-error-element');

    show('insert-error-element', error);
}

export const hideError = () => {
    errorElement.classList.add('hidden');
}