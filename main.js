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
    const containerResults = document.getElementById('insert-results');
    // containerResults.innerHTML = '';
    // Método moderno que reemplaza a innerHTML.
    containerResults.replaceChildren();

    users.forEach(user => {
        const card = createCard(user);
        containerResults.appendChild(card);
    });
}

