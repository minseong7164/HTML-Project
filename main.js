// 기존 showPage 함수...
function showPage(pageId) {
    const pages = document.querySelectorAll('.wiki-page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById('page-' + pageId)?.classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
    // 1. 초기 로드 시 다크 모드 설정 복원
    if (localStorage.getItem('mode') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // 2. 네비게이션 로드
    const nav = document.getElementById('global-navbar');
    if (nav) {
        fetch('nav.html')
            .then(response => response.text())
            .then(data => {
                nav.innerHTML = data;
                initDarkMode(); // 상단바 로드 후 버튼 이벤트 설정
            });
    }
});

// 3. 다크 모드 버튼 설정 함수
function initDarkMode() {
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('mode', isDark ? 'dark' : 'light');
        });
    }
}