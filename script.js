// URL вашего Gist файла
const GIST_RAW_URL = 'https://gist.githubusercontent.com/HeDmitry/ca8f5050d0717efa3e07f747831ed1f9/raw/mc_status.json';

// Сколько секунд ждать перед тем, как считать сервер оффлайн.
const TIMEOUT_SECONDS = 45;

const statusBox = document.getElementById('status-box');
const statusText = document.getElementById('status-text');
const lastUpdateText = document.getElementById('last-update');

async function checkStatus() {
    try {
        // Добавляем случайный параметр, чтобы избежать кэширования файла браузером
        const response = await fetch(GIST_RAW_URL + '?cachebust=' + new Date().getTime());
        const data = await response.json();

        const lastUpdateDate = new Date(data.last_update);
        const secondsElapsed = (new Date() - lastUpdateDate) / 1000;

        // --- ИСПРАВЛЕНИЕ: Используем правильное имя переменной TIMEOUT_SECONDS ---
        if (secondsElapsed < TIMEOUT_SECONDS) {
            statusText.textContent = 'СЕРВЕР ОНЛАЙН';
            statusBox.className = 'status-box online';
        } else {
            statusText.textContent = 'СЕРВЕР ОФФЛАЙН';
            statusBox.className = 'status-box offline';
        }
        lastUpdateText.textContent = lastUpdateDate.toLocaleString('ru-RU');

    } catch (error) {
        statusText.textContent = 'ОШИБКА';
        statusBox.className = 'status-box offline';
        console.error('Ошибка при получении статуса:', error);
    }
}

// Проверяем статус при загрузке страницы и затем каждые 15 секунд
checkStatus();
setInterval(checkStatus, 15000);
