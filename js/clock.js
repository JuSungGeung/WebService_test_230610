//#region #5.0
/*
#region #5.0 Intervals
interval = 매번 일어나야 하는 무언가!
setInterval(실행할 함수, 실행할 함수의 주기)!
*/
/*
#5.1 Timeouts and Dates
setTimeout(sayHello, 1000);
1초 기다렸다가 한번만 실행.
*/
/*
#5.2 PadStart
//padStart(2, "0") => 최소 글자수 *문자여야 함. (2)를 만족시키지 못하면 앞에 모자란 만큼 "0"을 채워넣음
//padStart는 문자만 인식하기 때문에 숫자로 넘어오는 것을 문자로 바꿔줘야 함.String()은 그 역활을 하고 있음.
*/
const clock = document.querySelector("h2#clock");
/*
function sayHello() {
    console.log("hello");
}

setInterval(sayHello,5000);
*/
//setTimeout(sayHello,5000);

function getClock() {
    const date = new Date();
    //clock.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
    //#region 번외작업
    //"00"으로 표시하게 하는 방법
    //const hours = ("00"+ (date.getHours()).toString()).slice(-2);
    //const Minutes = ("00"+ (date.getMinutes()).toString()).slice(-2);
    //const seconds = ("00"+ (date.getSeconds()).toString()).slice(-2);    
    //clock.innerText = hours+":"+Minutes+":"+seconds;    
    //"00"으로 표시하게 하는 방법2
    //const hours = date.getHours();
    //const minutes = date.getMinutes();
    //const seconds = date.getSeconds();
    //clock.innerText =`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    //오전 오후 표시
    //clock.innerText = new Date().toLocaleTimeString();
    //#endregion
}

getClock();
setInterval(getClock, 1000);

//const Seconds = ("00"+ (date.getSeconds()).toString()).slice(-2);
//#endregion

/*
//추가 질문 확인
console에

typeof Date;

를 입력해보시면 function 이라고 알려줍니다.
JavaScript에는 생성자 함수라는 것이 있는데요.
new 를 선두에 쓰고 생성자 함수를 호출하면 instance object를 반환합니다.
이는 생성자 함수로 객체를 생성할 때 하기로 한 약속(문법)입니다.
생성자 함수는 arguments를 받을 수 있습니다.
console 에

const date = new Date();

를 입력하여 date 변수를 선언하시고,

typeof date;

를 입력해보시면 object를 반환하는 것을 볼 수 있습니다.
이렇게 생성한 date 객체를 우리는 이전시간에 배웠던대로
object.property 와 같은 형식으로 사용할 수 있습니다.
(강의 내용 중 #2.6 참고)

이는 Python의 Class와 유사하며,
더 궁금한 것이 있으시다면 구글에
생성자 함수 (with JavaScript)에 대해 검색해보시기 바랍니다.
*/