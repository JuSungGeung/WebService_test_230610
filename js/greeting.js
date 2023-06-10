//#region #4.0 Input Values ~ 4.2 Events, 4.4 Getting Username ~ #4.7 Super Recap
/*
#4.2 Events
preventDefault 함수는 EventListener 함수의 '첫 번째 argument' 안에 있는 함수이다.
첫 arument는 지금 막 벌어진 event들에 대한 정보를 갖고 있다.
JS는(기본적으로)argument를 담아서 함수를 호출하는데, 이 argument가 기본 정보들을 제공하고 있다.
ex) 누가 submit주체인지, 몇 시에 submit을 했는지 등등 콘솔에 출력해보면 알 수 있음
*/
/*
#4.4 Getting Username
greeting.innerHTML = "Hello " + username; 와 greeting.innerHTML = `Hello ${username}`;는 동일
*/
/*
#4.5 Saving Username
localStorage.setItem(key, value);
- 로컬 저장소에 해당 키와 값을 저장함.
localStorage.getItem(key);
- 로컬 저장소에 해당 키에 해당되는 값을 불러옴.
localStorage.removeItem(key);
- 로컬 저장소에 해당 키에 해당되는 키, 값을 삭제함.
*/
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
    event.preventDefault();// 브라우저가 기본 동작을 실행하지 못하게 막기    
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}

function paintGreetings(username) {
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
  }

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUsername);
}
//#endregion

//#region 4.3 Events part Two
/*
엣지 : PointerEvent 
크롬 : MouseEvent

크롬인데 pointerEvent라고 나옴.

아마 HTML 코딩할때 Edge를 세팅했는데 윈도우에서 기본 브라우져를 크롬으로 해 놔서 그런것 같아요.
meta http-equiv="X-UA-Compatible" content="IE=edge"
*/
const link = document.querySelector("a");

function handleLinkClick(event) {
    //console.log(event);
    //PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
    event.preventDefault();
    console.dir(event);
}

link.addEventListener("click",handleLinkClick);
//#endregion

//#region 4.4 Getting Username
//visibility:hidden은 공간은 그대로 두고 보이지만 않는건데 display:none은 잡아둔 공간도 사라진다
//#endregion