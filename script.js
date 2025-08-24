const GIST_RAW_URL = 'https://gist.githubusercontent.com/HeDmitry/ca8f5050d0717efa3e07f747831ed1f9/raw/mc_status.json';

// Сколько минут ждать перед тем, как считать сервер оффлайн.
// Должно быть больше, чем интервал в reporter.py (который 1 минута)
const TIMEOUT_SECONDS = 45;

const statusBox = document.getElementById('status-box');
const statusText = document.getElementById('status-text');
const lastUpdateText = document.getElementById('last-update');

async function checkStatus() {
    try {
        const response = await fetch(GIST_RAW_URL + '?cachebust=' + new Date().getTime());
        const data = await response.json();

        const lastUpdateDate = new Date(data.last_update);
        const secondsElapsed = (new Date() - lastUpdateDate) / 1000;

        // Если с последнего обновления прошло меньше времени, чем наш таймаут
        if (secondsElapsed < TIMEOUT_MINUTES * 60) {
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

// Проверяем статус при загрузке страницы и затем каждые 30 секунд
checkStatus();
setInterval(checkStatus, 30000);
