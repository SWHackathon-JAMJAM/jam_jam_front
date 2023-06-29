let recognition;
let recordButton;
let recordingStartTime;

// 음성인식 API 지원 여부 확인
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {   
    // 음성인식 객체 생성
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'ko-KR'; // 음성인식 언어 설정

    // 음성 인식 결과 이벤트 처리
    recognition.onresult = function(event) {
    const result = event.results[0][0].transcript;
    processVoiceCommand(result);
    };
} else {
    // 음성인식 API를 지원하지 않는 경우 처리
    console.log('음성인식을 지원하지 않는 브라우저입니다.');
}

function startRecognition() {
    recognition.start();
    recordingStartTime = Date.now(); // 기록 시작 시간 저장
}

// 페에지 렌더링 시 음성인식 바로 시작
startRecognition();

function processVoiceCommand(command) {
    console.log('Recognized command:', command);

    // 서버에 아이디(이름) 또는 비밀번호 보내기
    const nextToPw = document.querySelector('#next');
    const nextToPlay = document.querySelector('#next-done');

    if (nextToPlay === null) {
        nextToPw.addEventListener('click', (event) => {
            sessionStorage.setItem("name", command);
            window.location = 'signIn.html';
        });
    } else {
        nextToPlay.addEventListener('click', (event) => {
            sessionStorage.setItem("password", command);
            window.location = 'gameStart.html';
        });
    }

    const inputForm = document.querySelector('input');
    inputForm.value = command;
}

function updateRecordingTime() {
    const currentTime = Date.now();
    const elapsedSeconds = Math.floor((currentTime - recordingStartTime) / 1000);
    console.log(`Recording time: ${elapsedSeconds} seconds`);
}

setInterval(updateRecordingTime, 1000);