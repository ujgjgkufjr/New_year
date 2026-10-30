//В массиве "keywords" пишем корни слов.
const wishesDictionary = [
    {
        keywords: ['груст', 'не очень', 'плох', 'устал', 'тяжел', 'боле', 'печаль'],
        wishes: [
            "Не грусти! ✨ Новый год — это время чудес. Пусть все печали останутся в старом году, а новый принесет только радость!",
            "Слышу, что вам немного тяжело... Обязательно отдохните в праздники. Пусть близкие окружат вас заботой и теплом! 💖"
        ]
    },
    {
        keywords: ['люб', 'парн', 'девушк', 'сердц', 'возлюблен', 'чувств'],
        wishes: [
            "Любовь — это волшебство! 💘 Пусть в новом году ваше сердце будет согрето взаимными чувствами, а рядом будет самый родной человек.",
            "Желаю вам океан любви и романтики в новом году! Пусть каждый день будет как в сказке. 💕"
        ]
    },
    {
        keywords: ['деньг', 'работ', 'карьер', 'стратегия', 'успех', 'бизнес', 'богат'],
        wishes: [
            "Отличные планы! 💼 Пусть в новом году карьера идет в гору, проекты приносят удовольствие, а доход только растет!",
            "Желаю вам финансового благополучия и карьерных высот! Пусть любое дело спорится в руках. 💰"
        ]
    },
    {
        keywords: ['здоров', 'спорт', 'сил', 'энерг'],
        wishes: [
            "Здоровье — это главное! 🍏 Желаю вам крепкого иммунитета, бодрости духа и отличного самочувствия в новом году!",
            "Пусть новый год принесет вам много энергии, сил и отличное настроение! Занимайтесь любимым спортом и будьте счастливы. 🏃‍♀️"
        ]
    },
    {
        keywords: ['мир', 'спокойств', 'дом', 'уют', 'семь'],
        wishes: [
            "Семья и уют — это самое ценное. 🏡 Пусть ваш дом всегда будет полной чашей, а за столом собираются самые близкие люди!",
            "Желаю вам гармонии, мира и спокойствия. Пусть в вашем доме всегда будет тепло и уютно! 🕯️"
        ]
    }
];
//Общие пожелания (если ни одно ключевое слово не совпало)
const generalWishes = [
    "Пусть Новый год принесет вам столько счастья, сколько снежинок в эту ночь! ❄️",
    "Желаю, чтобы все ваши заветные мечты обязательно сбылись в новом году! 🌟",
    "Пусть каждый день будет наполнен теплом, уютом и радостью! 🥂",
    "Пусть удача сопутствует вам во всех начинаниях, а близкие всегда будут рядом! 💖"
];
//Диалог
const dialogData = [
    {
        botText: "Добро пожаловать! ✨ Как ваше настроение в преддверии Нового года?",
        placeholder: "Например: отличное, немного устал..."
    },
    {
        botText: "Таакс, уже звучит интересно! 🎄 А как вы провели этот год?",
        placeholder: "Можете кратко, можете расширенно, я всему рада!"
    },
    {
        botText: "Чудесно, я записываю дальше! И еще скромный вопрос: о чем вы сейчас мечтаете больше всего?",
        placeholder: "Поделитесь сокровенным..."
    }
];

let currentStep = 0;
let userAnswers = []; // Сюда будем собирать все ответы пользователя
//Находим элементы
const botTextElement = document.getElementById('botText');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const restartArea = document.getElementById('restartArea');
const restartBtn = document.getElementById('restartBtn');
const inputArea = document.getElementById('inputArea');

//Анализ ответов и выдача пожеланий
function generateSmartWish(answers) {
    const fullText = answers.join(' ').toLowerCase(); //Склеиваем все ответы и делаем их строчными буквами

    let matchedWishes = [];
    //Ищем ключевые слова в ответах пользователя
    wishesDictionary.forEach(category => {
        //Проверяем, есть ли в тексте хотя бы одно слово из категории
        const hasKeyword = category.keywords.some(keyword => fullText.includes(keyword));
        
        if (hasKeyword) {
            //Если совпало, добавляем все пожелания из этой категории в общий котел
            matchedWishes.push(...category.wishes);
        }
    });
    //Если мы нашли совпадения — выбираем случайное из найденных
    if (matchedWishes.length > 0) {
        return matchedWishes[Math.floor(Math.random() * matchedWishes.length)];
    } 
    //Если ничего не нашли — выдаем общее пожелание
    return generalWishes[Math.floor(Math.random() * generalWishes.length)];
}
//Еще работа диалога
function handleSend() {
    const userText = userInput.value.trim();
    if (userText === "") return; //Если пусто — игнорируем

    //Сохраняем ответ пользователя в память
    userAnswers.push(userText);
    userInput.value = ""; //Очищаем поле
    currentStep++;

    //Если ответили на все вопросы
    if (currentStep >= dialogData.length) {
        //Генерируем умное пожелание
        const smartWish = generateSmartWish(userAnswers);
        //Показываем результат
        botTextElement.innerHTML = `Спасибо за ваши ответы! 🎉<br><br><strong>${smartWish}</strong>`;
        //Прячем ввод, показываем кнопку "Заново"
        inputArea.style.display = 'none';
        restartArea.style.display = 'block';
    } else {
        //Задаем следующий вопрос
        botTextElement.innerText = dialogData[currentStep].botText;
        userInput.placeholder = dialogData[currentStep].placeholder;
    }
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

//Сброс (Заново)
restartBtn.addEventListener('click', () => {
    currentStep = 0;
    userAnswers = []; // Очищаем память
    botTextElement.innerText = dialogData[0].botText;
    userInput.placeholder = dialogData[0].placeholder;
    inputArea.style.display = 'flex';
    restartArea.style.display = 'none';
});

//Секундомер
const timerBlock = document.getElementById('newyear');
const startTimerBtn = document.getElementById('startTimerBtn');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

let timerInterval;
let isTimerStarted = false;

function startCountdown() {
    if (isTimerStarted) return;
    isTimerStarted = true;

    // Берем текущий год
    let currentYear = new Date().getFullYear();
    let targetDate = new Date(`2026-01-01T00:00:00`).getTime();
// Если Новый год уже прошел, ставим следующий
    if (targetDate - new Date().getTime() < 0) {
        targetDate = new Date(`${currentYear + 1}-01-01T00:00:00`).getTime();
    }

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            timerBlock.innerHTML = "С Новым годом! 🎉";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        minutesEl.innerText = String(minutes).padStart(2, '0');
        secondsEl.innerText = String(seconds).padStart(2, '0');
    }

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

// Запуск при клике на кнопку "Second" в шапке
startTimerBtn.addEventListener('click', (event) => {
    event.preventDefault(); // ← ЭТА СТРОКА ОСТАНАВЛИВАЕТ ПЕРЕЗАГРУЗКУ СТРАНИЦЫ!
    startCountdown();
});
//Запуск при НАВЕДЕНИИ МЫШКИ на таймер
timerBlock.addEventListener('mouseenter', startCountdown);
//Запуск при КЛИКЕ на сам таймер (полезно для телефонов)
timerBlock.addEventListener('click', startCountdown);