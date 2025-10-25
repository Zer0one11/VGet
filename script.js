document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeButtons = document.querySelectorAll('.theme-switcher button');
    const urlInput = document.getElementById('url-input');
    const downloadVideoBtn = document.getElementById('download-video');
    const downloadAudioBtn = document.getElementById('download-audio');
    const messageArea = document.getElementById('message-area');

    // =========================================================
    // 🎨 Логика Смены Темы
    // =========================================================
    
    // Функция для применения темы
    const applyTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('selectedTheme', theme);
    };

    // Загрузка темы из localStorage при загрузке страницы
    const savedTheme = localStorage.getItem('selectedTheme') || 'light'; // 'light' как дефолт
    applyTheme(savedTheme);

    // Добавление обработчиков событий на кнопки тем
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Имя темы берется из id кнопки: theme-light -> light
            const themeName = button.id.replace('theme-', '');
            applyTheme(themeName);
            showMessage(`Тема изменена на: ${themeName.charAt(0).toUpperCase() + themeName.slice(1)}!`, 'success');
        });
    });

    // =========================================================
    // ⬇️ Логика Скачивания (Заглушка)
    // =========================================================

    // Функция для отображения сообщений
    const showMessage = (message, type = 'info') => {
        messageArea.textContent = message;
        messageArea.className = `message message-${type}`; // Можно добавить стили для message-success/error
        setTimeout(() => {
            messageArea.textContent = '';
            messageArea.className = 'message';
        }, 5000);
    };

    // Общий обработчик для кнопок скачивания
    const handleDownload = (eventType) => {
        const url = urlInput.value.trim();
        if (!url) {
            showMessage('⚠️ Пожалуйста, вставьте ссылку для скачивания.', 'error');
            return;
        }

        // Логика определения сервиса (Очень упрощенно)
        let service = 'неизвестный сервис';
        if (url.includes('youtube.com') || url.includes('youtu.be')) service = 'YouTube';
        else if (url.includes('tiktok.com')) service = 'TikTok';
        else if (url.includes('vk.com')) service = 'VK';
        else if (url.includes('spotify.com')) service = 'Spotify';
        else if (url.includes('yandex.ru/music')) service = 'Yandex Music';
        else if (url.includes('soundcloud.com')) service = 'SoundCloud';

        // *** ВАЖНО: ЭТО ЗАГЛУШКА! ***
        // На этом этапе вам нужно отправить URL на ВАШ БЭКЕНД-СЕРВЕР.
        
        showMessage(`✅ Запрос на скачивание ${eventType === 'video' ? 'ВИДЕО' : 'МУЗЫКИ'} с ${service} принят! 
        (URL: ${url}). Ожидание ответа от сервера...`, 'success');

        // fetch('https://YOUR_BACKEND_API_URL/download', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ url: url, type: eventType })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     // Обработка ответа
        // })
        // .catch(error => {
        //     showMessage('❌ Ошибка связи с сервером.', 'error');
        // });
        
        urlInput.value = ''; // Очистка поля ввода
    };

    downloadVideoBtn.addEventListener('click', () => handleDownload('video'));
    downloadAudioBtn.addEventListener('click', () => handleDownload('audio'));
});
