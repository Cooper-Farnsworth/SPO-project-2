const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');

chatToggle.addEventListener('click', () => {
	chatWindow.classList.toggle('active');
});

closeChat.addEventListener('click', () => {
	chatWindow.classList.remove('active');
});

// Общение в чате
const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');
const chatBody = document.getElementById('chatBody');

sendMessage.addEventListener('click', sendUserMessage);
messageInput.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		sendUserMessage();
	}
});

function sendUserMessage() {
	const message = messageInput.value.trim();
	if (message === '') return;

	// Добавляем сообщение пользователя
	addMessageToChat(message, 'user');
	messageInput.value = '';

	// Имитируем ответ бота (в реальном ASP.NET приложении здесь будет запрос к серверу)
	setTimeout(() => {
		const botResponse = getBotResponse(message);
		addMessageToChat(botResponse, 'bot');
	}, 1000);
}

function addMessageToChat(message, sender) {
	const now = new Date();
	const timeString = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

	const messageDiv = document.createElement('div');
	messageDiv.className = `message ${sender}`;
	messageDiv.innerHTML = `
		<div class="message-content">${message}</div>
		<div class="message-time">${timeString}</div>
	`;

	chatBody.appendChild(messageDiv);
	chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(userMessage) {
	const lowerMessage = userMessage.toLowerCase();

	if (lowerMessage.includes('привет') || lowerMessage.includes('здравств')) {
		return 'Здравствуйте! Я могу ответить на ваши вопросы о лагере "Солнечный Луч".';
	} else if (lowerMessage.includes('программ') || lowerMessage.includes('смен')) {
		return 'У нас есть три смены: Спортивная (14-27 июня), Творческая (1-14 июля) и Научная (15-28 июля). Подробнее на странице "Программы".';
	} else if (lowerMessage.includes('регистрация') || lowerMessage.includes('запись')) {
		return 'Для регистрации заполните форму на странице "Регистрация". Наш менеджер свяжется с вами для подтверждения.';
	} else if (lowerMessage.includes('стоимость') || lowerMessage.includes('цена') || lowerMessage.includes('сколько стоит')) {
		return 'Стоимость одной смены 35,000 рублей. Есть скидки для братьев/сестер и при ранней регистрации.';
	} else if (lowerMessage.includes('контакт') || lowerMessage.includes('телефон') || lowerMessage.includes('адрес')) {
		return 'Наш телефон: +7 (495) 123-45-67, email: info@sunnylight-camp.ru. Лагерь расположен в Московской области, Пушкинский район.';
	} else if (lowerMessage.includes('питание')) {
		return '5-разовое сбалансированное питание по рекомендациям диетологов. Учитываем индивидуальные особенности (аллергии, диеты).';
	} else if (lowerMessage.includes('вещи') || lowerMessage.includes('брать') || lowerMessage.includes('список')) {
		return 'Рекомендуем взять удобную одежду и обувь, купальные принадлежности, средства гигиены. Полный список вышлем после регистрации.';
	} else if (lowerMessage.includes('безопасность') || lowerMessage.includes('охрана') || lowerMessage.includes('медик')) {
		return 'Территория круглосуточно охраняется, есть медицинский пункт с дежурным врачом. Вожатые проходят специальную подготовку.';
	} else {
		return 'Извините, я не совсем понял ваш вопрос. Вы можете позвонить нам по телефону +7 (495) 123-45-67 для уточнения информации.';
	}
}

// Обработка формы регистрации
const registrationForm = document.getElementById('campRegistrationForm');

registrationForm.addEventListener('submit', function (e) {
	e.preventDefault();

	// Здесь должна быть логика отправки данных на сервер (ASP.NET)
	// Для демонстрации просто покажем сообщение
	alert('Спасибо за заявку! Наш менеджер свяжется с вами в ближайшее время.');

	// Очистка формы
	registrationForm.reset();

	// Отправка сообщения в чат
	const now = new Date();
	const timeString = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

	addMessageToChat('Спасибо за регистрацию в нашем лагере! Скоро мы с вами свяжемся.', 'bot');
	chatWindow.classList.add('active');
});

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
});
