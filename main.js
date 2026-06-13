// 1. 공통 초기화 로직
//    - 페이지 로드 시 한 번 실행되어 전체 UI 상태를 복원합니다.
//    - 다크모드, 네비게이션, 로그인 처리, 기록실 탭 전환 등 공통 기능을 초기화합니다.
document.addEventListener("DOMContentLoaded", function() {
    // 다크모드 설정을 로컬스토리지에서 불러옵니다.
    if (localStorage.getItem('mode') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // 네비게이션 로드 및 상태 업데이트
    const nav = document.getElementById('global-navbar');
    if (nav) {
        fetch('nav.html')
            .then(r => r.text())
            .then(data => {
                nav.innerHTML = data;
                initDarkMode(); // 네비 로드 후 버튼 이벤트 설정
                updateNavStatus(); // 로드 후 로그인 상태 반영
            });
    }

    // 로그인 엔터키 초기화
    initEnterKey();

    // 기록실 탭 처리 (URL 파라미터 확인)
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (document.getElementById('batter-table')) {
        showTable(tab === 'pitcher' ? 'pitcher' : 'batter');
    }
});

// 2. 기능별 함수들
// 로그인 상태에 따라 네비게이션 링크를 로그인/로그아웃으로 업데이트합니다.
function updateNavStatus() {
    const loginLink = document.getElementById('login-link');
    if (!loginLink) return;

    if (localStorage.getItem("isLoggedIn") === "true") {
        loginLink.innerText = "로그아웃";
        loginLink.onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
        };
    } else {
        loginLink.innerText = "로그인";
        loginLink.href = "login.html";
    }
}

// 다크모드 토글 버튼을 초기화하고 현재 모드에 맞춰 아이콘을 표시합니다.
function initDarkMode() {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const updateToggle = () => {
        const isDark = document.body.classList.contains('dark-mode');
        if (!toggleButton) return;
        toggleButton.innerText = isDark ? '☀️' : '🌙';
    };

    updateToggle();
    toggleButton?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('mode', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        updateToggle();
    });
}

// 로그인 입력창에 Enter 키 이벤트를 등록하여 사용자가 빠르게 로그인할 수 있도록 합니다.
function initEnterKey() {
    const idInput = document.getElementById('userid');
    const pwInput = document.getElementById('userpw');
    const handleEnter = (e) => { if (e.key === "Enter") checkLogin(); };
    idInput?.addEventListener("keydown", handleEnter);
    pwInput?.addEventListener("keydown", handleEnter);
}

// 로그인 폼 검증 함수
// - id/pw가 맞으면 로그인 상태를 저장하고 index.html로 이동합니다.
// - 틀리면 오류 메시지를 보여줍니다.
function checkLogin() {
    const id = document.getElementById('userid')?.value;
    const pw = document.getElementById('userpw')?.value;
    const msg = document.getElementById('message');

    if (id === "admin" && pw === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
    } else if (msg) {
        msg.style.display = "block";
        msg.style.color = "red";
        msg.innerText = "아이디 또는 비밀번호를 확인해주세요.";
    }
}

// 로그인 페이지에서 추가 정보 버튼을 처리하는 함수
// - 회원가입, 아이디 찾기, 비밀번호 찾기 버튼을 누를 때 안내 메시지를 표시합니다.
function showInfo(type) {
    const messages = {
        '회원가입': '회원가입 기능은 현재 준비 중입니다. 잠시 후 다시 시도해주세요.',
        '아이디 찾기': '아이디 찾기 기능은 현재 준비 중입니다. 관리자에게 문의하세요.',
        '비밀번호 찾기': '비밀번호 찾기 기능은 현재 준비 중입니다. 관리자에게 문의하세요.'
    };
    alert(messages[type] || '요청하신 기능은 현재 준비 중입니다.');
}

function showScheduleAlert(message) {
    alert(message);

    const yearSelect = document.querySelector('.calendar-controls select:nth-of-type(1)');
    const monthSelect = document.querySelector('.calendar-controls select:nth-of-type(2)');

    if (yearSelect) {
        yearSelect.value = '2026';
    }
    if (monthSelect) {
        monthSelect.value = '06';
    }
}

// 기록실 탭 전환 함수
// - type에 따라 타자/투수 테이블을 표시하고 버튼 상태를 강조합니다.
function showTable(type) {
    const batterTable = document.getElementById('batter-table');
    const pitcherTable = document.getElementById('pitcher-table');
    const buttons = document.querySelectorAll('.record-tabs button');

    if (type === 'batter') {
        batterTable.style.display = 'block';
        pitcherTable.style.display = 'none';
        
        // 타자 버튼 강조
        buttons[0].style.fontWeight = 'bold';
        buttons[0].style.color = '#000';
        buttons[0].style.borderBottom = '2px solid #000'; // 밑줄 추가
        
        // 투수 버튼 기본
        buttons[1].style.fontWeight = 'normal';
        buttons[1].style.color = '#666';
        buttons[1].style.borderBottom = '2px solid transparent';
    } else {
        batterTable.style.display = 'none';
        pitcherTable.style.display = 'block';
        
        // 타자 버튼 기본
        buttons[0].style.fontWeight = 'normal';
        buttons[0].style.color = '#666';
        buttons[0].style.borderBottom = '2px solid transparent';
        
        // 투수 버튼 강조
        buttons[1].style.fontWeight = 'bold';
        buttons[1].style.color = '#000';
        buttons[1].style.borderBottom = '2px solid #000'; // 밑줄 추가
    }

    updateRecordSidebarActive(type);
}

function updateRecordSidebarActive(type) {
    const sidebarItems = document.querySelectorAll('.sidebar-menu li');
    sidebarItems.forEach(item => item.classList.remove('active'));

    const activeLink = document.querySelector(`.sidebar-menu a[href*="tab=${type}"]`);
    if (activeLink && activeLink.parentElement) {
        activeLink.parentElement.classList.add('active');
    }
}
