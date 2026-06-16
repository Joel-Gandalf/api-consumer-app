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

const renderCards1 = (users) => {
    const containerResults = document.getElementById('insert-results');
    // containerResults.innerHTML = '';
    // Método moderno que reemplaza a innerHTML.
    containerResults.replaceChildren();

    users.forEach(user => {
        const card = createCard(user);
        containerResults.appendChild(card);
    });
}

const renderCards2 = (users) => {
    const containerResults = document.getElementById('insert-results');
    const fragment = document.createDocumentFragment();

    users.forEach(user => {
        const card = createCard(user);
        fragment.appendChild(card);
    });

    containerResults.replaceChildren(fragment);

// DocumentFragment sería más correcto por rendimiento.
// El motivo de usarlo es evitar reflows innecesarios. Cada appendChild directo al DOM provoca que el navegador recalcule el layout. Con DocumentFragment Todas las tarjetas se construyen en el fragmento (que vive fuera del DOM real), y solo hay un único reflow cuando haces replaceChildren(fragment) al final.
}



