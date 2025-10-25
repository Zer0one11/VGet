document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeButtons = document.querySelectorAll('.theme-switcher button');
    const urlInput = document.getElementById('url-input');
    const downloadVideoBtn = document.getElementById('download-video');
    const downloadAudioBtn = document.getElementById('download-audio');
    const messageArea = document.getElementById('message-area');
    const resultsArea = document.getElementById('results-area'); // Новый элемент

    // =========================================================
    // 🎨 Логика Смены Темы
    // =========================================================
    
    // Функция для применения темы
    const applyTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('selectedTheme', theme);
        // Убираем класс 'active' со всех кнопок и добавляем к текущей
        themeButtons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(`theme-${theme}`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        } else if (theme === 'green') { // Отдельно для зеленой, так как id изменен
            document.getElementById('theme-green-btn').classList.add('active');
        }
    };

    // Загрузка темы из localStorage при загрузке страницы
    const savedTheme = localStorage.getItem('selectedTheme') || 'purple'; // 'purple' как дефолт
    applyTheme(savedTheme);

    // Добавление обработчиков событий на кнопки тем
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Имя темы берется из id кнопки, но учитываем 'theme-green-btn'
            let themeName = button.id.replace('theme-', '');
            if (themeName === 'green-btn') {
                themeName = 'green'; // Используем 'green' как имя темы
            }
            applyTheme(themeName);
            showMessage(`Тема изменена на: ${button.textContent}!`, 'info'); // Используем текст кнопки
        });
    });

    // =========================================================
    // ⬇️ Логика Скачивания (Заглушка с имитацией вывода)
    // =========================================================

    // Функция для отображения сообщений
    const showMessage = (message, type = 'info') => {
        messageArea.textContent = message;
        messageArea.className = `message message-${type}`;
        messageArea.style.display = 'block'; // Показываем сообщение
        setTimeout(() => {
            messageArea.style.display = 'none'; // Скрываем через 5 секунд
        }, 5000);
    };

    // Функция для отображения "результатов" (имитация)
    const displayDownloadResult = (data) => {
        const downloadItem = document.createElement('div');
        downloadItem.classList.add('download-item');
        downloadItem.innerHTML = `
            <h3><span>${resultsArea.children.length + 1}.</span> ${data.title} by ${data.author}</h3>
            <p><strong>FPS:</strong> ${data.fps}</p>
            <p><strong>ID:</strong> ${data.id};</p>
            <p><strong>FV:</strong> ${data.fv};</p>
            <a href="${data.showcaseLink}" target="_blank" class="showcase-link">Showcase</a>
        `;
        resultsArea.prepend(downloadItem); // Добавляем новый результат в начало
    };


    // Общий обработчик для кнопок скачивания
    const handleDownload = async (eventType) => {
        const url = urlInput.value.trim();
        if (!url) {
            showMessage('⚠️ Пожалуйста, вставьте ссылку для скачивания.', 'error');
            return;
        }

        showMessage(`✅ Запрос на скачивание ${eventType === 'video' ? 'ВИДЕО' : 'МУЗЫКИ'} с ${url} принят. Ожидание ответа от сервера...`, 'info');

        // *** ЭТО ПО-ПРЕЖНЕМУ ЗАГЛУШКА ДЛЯ ФРОНТЕНДА ***
        // Здесь должен быть реальный запрос к вашему БЭКЕНДУ.
        // Пример запроса (раскомментировать, когда будет бэкенд):
        /*
        try {
            const response = await fetch('https://YOUR_BACKEND_API_URL/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url, type: eventType })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка на сервере.');
            }

            const data = await response.json();
            
            // Предполагаем, что бэкенд возвращает данные в формате:
            // { title: "Название видео", author: "Автор", fps: "30", id: "...", fv: "...", downloadLink: "...", showcaseLink: "..." }
            displayDownloadResult({
                title: data.title,
                author: data.author,
                fps: data.fps || 'N/A', // Можно сделать FPS более реальным, если бэкенд будет давать
                id: data.id || 'N/A',
                fv: data.fv || 'N/A',
                showcaseLink: data.downloadLink || '#' // В идеале это ссылка на сам файл для скачивания
            });
            showMessage('🚀 Контент успешно обработан и готов к скачиванию!', 'success');
        } catch (error) {
            console.error('Download error:', error);
            showMessage(`❌ Ошибка: ${error.message || 'Не удалось обработать ссылку.'}`, 'error');
        }
        */

        // Имитация ответа от сервера для демонстрации дизайна
        setTimeout(() => {
            const dummyData = {
                title: 'Новое Видео от DemoCreator',
                author: 'DemoCreator',
                fps: '60fps (Full HD)',
                id: Math.floor(Math.random() * 100000000),
                fv: 'DemoCreator',
                showcaseLink: '#' // Замените на реальную ссылку для скачивания
            };
            displayDownloadResult(dummyData);
            showMessage('🚀 Контент успешно обработан и готов к скачиванию!', 'success');
        }, 2000); // Имитируем задержку сервера

        urlInput.value = ''; // Очистка поля ввода
    };

    downloadVideoBtn.addEventListener('click', () => handleDownload('video'));
    downloadAudioBtn.addEventListener('click', () => handleDownload('audio'));
});
