// 로그인 관련 JS 코드
// 1. 네비게이션 업데이트 함수
function updateNavStatus() {
    const loginLink = document.getElementById('login-link');
    
    // 네비게이션 바가 아직 안 불러와졌으면 0.1초 뒤에 다시 확인
    if (!loginLink) {
        setTimeout(updateNavStatus, 1); // 1ms는 너무 빠를 수 있어 100ms로 조정했습니다.
        return;
    }

    // 상태에 따라 글자 변경
    if (localStorage.getItem("isLoggedIn") === "true") {
        loginLink.innerText = "로그아웃";
        loginLink.href = "#";
        loginLink.onclick = function(e) {
            e.preventDefault();
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
        };
    } else {
        loginLink.innerText = "로그인";
        loginLink.href = "login.html";
    }
}

// 2. 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function() {
    updateNavStatus();
    initEnterKey(); // 엔터키 이벤트 초기화 호출
});

// 3. 엔터키 감지 함수 (추가됨)
function initEnterKey() {
    const idInput = document.getElementById('userid');
    const pwInput = document.getElementById('userpw');

    if (idInput && pwInput) {
        function handleEnter(event) {
            if (event.key === "Enter") {
                checkLogin();
            }
        }
        idInput.addEventListener("keydown", handleEnter);
        pwInput.addEventListener("keydown", handleEnter);
    }
}

// 4. 로그인 함수
function checkLogin() {
    const id = document.getElementById('userid');
    const pw = document.getElementById('userpw');
    const msg = document.getElementById('message');

    if (id && pw && id.value === "admin" && pw.value === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
    } else if (msg) {
        msg.style.display = "block";
        msg.style.color = "red";
        msg.innerText = "아이디 또는 비밀번호를 확인해주세요.";
    }
}
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