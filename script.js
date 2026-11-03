// MENÚ HAMBURGUESA
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// RESERVAS 
document.addEventListener('DOMContentLoaded', () => {
    const circuitSelect = document.getElementById('circuit-select');
    const circuitInfoBox = document.getElementById('circuit-info-box');
    const shiftSelect = document.getElementById('shift-select');
    const bookingForm = document.getElementById('table-booking-form');
    const bookingConfirmation = document.getElementById('booking-confirmation');

    // direcciones 
    const circuitDetails = {
        fastfood: {
            title: "Recorrido Fast Food & Hamburgueserías de Autor",
            places: [
                "<strong>Kalis Pizza:</strong> Av. Cabildo 3500, Núñez (CABA)",
                "<strong>Big Pons:</strong> Fitz Roy 1731 (Palermo)",
                "<strong>Kiddo:</strong> Honduras 5265, Palermo (CABA)",
                "<strong>Frank's Grill:</strong> Cabello 3401 (Palermo)"
            ]
        },
        meriendas: {
            title: "Recorrido Cafeterías & Meriendas de Especialidad",
            places: [
                "<strong>La Panera Rosa:</strong> Jorge Luis Borges 1689, CABA",
                "<strong>Ayulem & Cafés de Barrio:</strong> Av. Emilio Castro 7478, CABA",
                "<strong>Vedra Café:</strong> Vidal 2360, CABA",
                "<strong>Bambi:</strong> Mercedes 3920, CABA"
            ]
        },
        parrillas: {
            title: "Recorrido Parrillas & Bodegones Tradicionales",
            places: [
                "<strong>Bodegón de All Boys:</strong> Mercedes 1951, Floresta (CABA)",
                "<strong>El Ferroviario:</strong> Reservistas Argentinos 219, Liniers (CABA)",
                "<strong>La Miralla:</strong> Av. Eva Perón 7201 (CABA)"
            ]
        },
        bares: {
            title: "Recorrido Bares, Coctelería & Night",
            places: [
                "<strong>Invernadero Bar:</strong> Agüero 2502, Recoleta (CABA)",
                "<strong>Tradition & Rebellion:</strong> Olga Cossettini 731, Puerto Madero (CABA)",
                "<strong>Intervalo:</strong> Vicente López 2180, Recoleta (CABA)",
                "<strong>Andante Bar:</strong> Arévalo 1677, Palermo (CABA)"
            ]
        },
        internacional: {
            title: "Recorrido Comida Internacional & Sabores del Mundo",
            places: [
                "<strong>Fabric Sushi:</strong> Av. Pedro Goyena 100, Caballito (CABA)",
                "<strong>Kansas Grill:</strong> Av. del Libertador 105, San Isidro (GBA Norte)"
            ]
        }
    };

    function updateCircuitData() {
        if (!circuitSelect) return;

        const selectedKey = circuitSelect.value;
        const details = circuitDetails[selectedKey];

        // 1. Actualiza el cuadro informativo de los locales en la reserva
        if (details && circuitInfoBox) {
            let listHTML = details.places.map(place => `<li>• ${place}</li>`).join('');
            circuitInfoBox.innerHTML = `
                <p class="font-bold text-carbon text-sm">${details.title}</p>
                <p class="text-gray-600 font-medium">Este recorrido incluye la visita guiada y mesa reservada en las siguientes paradas:</p>
                <ul class="space-y-1 text-gray-700 mt-1">${listHTML}</ul>
            `;
        }

        // Actualiza los turnos 
        if (shiftSelect) {
            shiftSelect.innerHTML = ''; 

            if (selectedKey === 'meriendas') {
                // Meriendas (Tardes)
                const option1 = document.createElement('option');
                option1.value = "Tarde (15:30 a 17:00 hs)";
                option1.textContent = "Tarde (15:30 a 17:00 hs)";

                const option2 = document.createElement('option');
                option2.value = "Tarde (17:00 a 19:30 hs)";
                option2.textContent = "Tarde (17:00 a 19:30 hs)";

                shiftSelect.appendChild(option1);
                shiftSelect.appendChild(option2);
            } else {
                // (Mediodía / Noche)
                const option1 = document.createElement('option');
                option1.value = "Mediodía (12:30 a 15:30 hs)";
                option1.textContent = "Mediodía (12:30 a 15:30 hs)";

                const option2 = document.createElement('option');
                option2.value = "Noche (20:00 a 23:30 hs)";
                option2.textContent = "Noche (20:00 a 23:30 hs)";

                shiftSelect.appendChild(option1);
                shiftSelect.appendChild(option2);
            }
        }
    }

    if (circuitSelect) {
        circuitSelect.addEventListener('change', updateCircuitData);
        updateCircuitData(); // Inicializa al cargar la página
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('booking-name').value.trim();
            const email = document.getElementById('booking-email').value.trim();
            const circuitText = circuitSelect.options[circuitSelect.selectedIndex].text;
            const shift = shiftSelect.value;
            const qty = document.getElementById('people-qty').value;

            if (bookingConfirmation) {
                bookingConfirmation.innerHTML = `
                    <strong>¡Recorrido Reservado con Éxito!</strong><br>
                    Gracias <em>${name}</em>. Te enviamos la confirmación a <strong>${email}</strong>.<br>
                    Recorrido: <strong>${circuitText}</strong> | Comensales: <strong>${qty} persona(s)</strong> | Turno: <strong>${shift}</strong>.
                `;
                bookingConfirmation.classList.remove('hidden');
                bookingForm.reset();
                updateCircuitData();
            }
        });
    }
});

// VALIDACIÓN DE FORMULARIO 
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const contactAlert = document.getElementById('contact-alert');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (nameInput && nameInput.value.trim() === '') {
            if (nameError) nameError.classList.remove('hidden');
            isValid = false;
        } else if (nameError) {
            nameError.classList.add('hidden');
        }

        if (emailInput && !validateEmail(emailInput.value.trim())) {
            if (emailError) emailError.classList.remove('hidden');
            isValid = false;
        } else if (emailError) {
            emailError.classList.add('hidden');
        }

        if (messageInput && messageInput.value.trim() === '') {
            if (messageError) messageError.classList.remove('hidden');
            isValid = false;
        } else if (messageError) {
            messageError.classList.add('hidden');
        }

        if (isValid && contactAlert) {
            const nombre = nameInput ? nameInput.value.trim() : 'Usuario';
            contactAlert.innerHTML = `<strong>¡Mensaje enviado con éxito!</strong><br>Gracias <em>${nombre}</em>, nos pondremos en contacto a la brevedad.`;
            contactAlert.classList.remove('hidden');
            contactForm.reset();
        }
    });
});

// CHATBOT
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatWindow = document.getElementById('chat-window');

    if (!chatInput || !chatSend || !chatWindow) return;

    const faqDatabase = [
        { 
            keywords: ['horario', 'hora', 'abren', 'abierto', 'cierran'], 
            response: 'Los horarios varían según la experiencia: las cafeterías abren de 08:30 a 20:00 hs, mientras que hamburgueserías y bares atienden desde el mediodía hasta la madrugada.' 
        },
        { 
            keywords: ['reserva', 'reservar', 'turno', 'lugar', 'costo', 'precio'], 
            response: 'Podés realizar la simulación de reserva desde nuestro menú en la sección "Reservar" seleccionando circuito, turno y cantidad de personas.' 
        },
        { 
            keywords: ['pago', 'tarjeta', 'efectivo', 'mercadopago', 'cuotas'], 
            response: 'La mayoría de los locales adheridos aceptan efectivo, tarjetas de débito/crédito y billeteras digitales (Mercado Pago).' 
        },
        { 
            keywords: ['vegano', 'vegetariano', 'tacc', 'celiaco', 'sin tacc', 'gluten'], 
            response: 'Todos nuestros circuitos cuentan con locales que incluyen opciones vegetarianas y alternativas adaptadas. Te sugerimos consultar la carta específica de cada lugar.' 
        },
        { 
            keywords: ['ubicacion', 'donde', 'dirección', 'mapa', 'llegar'], 
            response: 'En nuestra página principal (Inicio) podés consultar el mapa interactivo general con todos los puntos gastronómicos marcados.' 
        }
    ];

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        if (sender === 'user') {
            msgDiv.className = 'bg-nude text-carbon p-2 rounded max-w-xs ml-auto text-right border border-topo font-medium';
        } else {
            msgDiv.className = 'bg-white text-carbon p-2 rounded max-w-xs border border-topo';
        }
        msgDiv.textContent = text;
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function processQuestion() {
        const query = chatInput.value.trim().toLowerCase();
        if (query === '') return;

        appendMessage('user', chatInput.value);
        chatInput.value = '';

        let foundResponse = 'Lo siento, no entendí tu pregunta. Probá consultando por horarios, reservas, medios de pago, ubicación o menús especiales.';

        for (const item of faqDatabase) {
            if (item.keywords.some(kw => query.includes(kw))) {
                foundResponse = item.response;
                break;
            }
        }

        setTimeout(() => {
            appendMessage('bot', foundResponse);
        }, 400);
    }

    chatSend.addEventListener('click', processQuestion);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processQuestion();
    });
});
