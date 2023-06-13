//#region #8
const API_KEY = "b950e7dd53ebe06b16659f9510354d9a";

const WeatherList = document.getElementById("weather-list");

function paintToDo(weather) {
  //console.log("i will paint",weather);
  const li = document.createElement("li");
  const span = document.createElement("span");
  //li.appendChild(span);//li 안제 span 넣기
  //span.innerText = weather;
  //console.log(weather.text);
  span.innerText = weather;
  //console.log(li);
  li.appendChild(span);
  WeatherList.appendChild(li);
}

function onGeoOk(position) {
    //console.log(position);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    //console.log("You live in", lat, lon);
    //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;//units=metric 화씨온도를 섭씨온도로 변경
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;//units=metric 화씨온도를 섭씨온도로 변경
    fetch(url)
        .then((response) => response.json())
        .then((data) => {    
            //console.log(data);
            //const weather = document.querySelector("#weather span:first-child");
            //const city = document.querySelector("#weather span:last-child");
            //weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
            //city.innerText = data.name;
            for (let i = 0; i < data.list.length; i++) {
              //console.log(`${data.list[i].weather[0].main} / ${data.list[i].main.temp} / ${data.list[i].dt_txt}`);
              paintToDo(`${data.list[i].weather[0].main} / ${data.list[i].main.temp} / ${data.list[i].dt_txt}`);
            }
        });
  }
  function onGeoError() {
    alert("Can't find you. No weather for you.");
  }
  
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
//#endregion

//추가 질문 확인
//#region #8.0 Geolocation
/*
< Live Server >
혹시 Live Server를 이용하시면 host설정을 개인ip를 입력하셨을 겁니다.
접속 URL 예 ) 192.168.0.1:5050/index.html
이러면 Geolocation API 개인정보보안떄문에 작동하지 않고 warning이 뜹니다.
Geolocation API는 https (기본), localhost(예외) 에서만 작동합니다.
localhost:port/index.html로 접속하시면 정상 작동합니다.

< 추가 체크 사항 >
1. navigator 함수를 이용해 사용자의 위치를 알아내는 코드 작성.

navigator.geolocation.getCurrentPosition ( ) 라는 코드를 작성해준다.
이때 getCurrentPosition 은 2개의 argument가 필요하다. 앞쪽에는 모든 게 잘 됐을 때 실행될 함수인 onGeoOk 함수를, 뒤에는 실패했을 때 실행될 함수인 onGeoError 함수를 입력한다.

2. onGeoError() 함수가 실행될 때 :
에러가 났다는 것을 사용자에게 알려주기 위해서
alert("Can't find you. No weather for you."); 를 해준다.

3. onGeoOk 함수가 실행될 때:
function onGeoOk(position){
const lat = position.coords.latitude;
const lng = position.coords.longitude;
console.log("You live in", lat, lng);
}
자바스크립트가 position으로 user의 위치를 전달해준다.
position은 object 이고 위도와 경도 값이 들어있다. positon.coords.latitude와
position.coords.longitude 를 변수에 저장하고 console.log를 해서 사용자에게 보여준다.
*/
//#endregion

//#region #8.1 Weather API
/*
< fetch >
우선 fetch는 Request나 Response와 같은 객체를 이용해서 HTTP 파이프라인을 구성하는 요소를 조작하고 원격지에서 정보를 가져오기 위해 사용되는 프로미스타입의 메소드(함수)인데요.
즉 API같은 주소에서 정보를 빼내올때 쓴다는것입니다. fetch는 첫번째 인자로 URL(API 주소), 두번째 인자로 옵션 객체를 받고(필수는 아님), 프로미스 타입의 객체를 반환합니다.
여기서 프로미스를 간략히 설명드리자면 서버에 무언가 요청을 했을때 그 응답이 바로오지않고 어느정도 시간이 지난뒤 응답된다는건 다들 아실겁니다.
이때 이 요청코드때문에 응답이 대기중인 상태에선 다음코드로 못넘어가는 비효율적인 상태가되는데
 이 상태를 모면하기위해 서버에 데이터를 불러오는것을 요청을 해놓고 기다리는것이 아닌다음 코드로 넘어가는 비동기처리를 하게되는데 이 비동기처리에 사용되는 객체를 프로미스라고하는겁니다.
한마디로 서버에 데이터를 불러오려고 요청을했을때 시간많이걸릴때를 대비해 미리 다음코드가 먼저실행되고 응답이 왔을때 응답에 따라 실행되는것을 프로미스객체 라고 하는거죠.
아무튼 프로미스는 이쯤해두고 구동방식을보자면 우선 fetch()에서 ()안에 주소를 인자로 넣으면 서버에 대한 응답 콜백(response객체)이 프로미스 타입으로 오게되면 then(response => response.json())에서
 response 객체를 받아 응답상태를 확인하고 만약 Fulfilled(이행)라면 두번째 .then에서 서버에 요청한 내용을 볼수있는것입니다.
Fulfilled(이행) 상태는 101, 100, 404, 200과 같은 서버가 보내주는 응답콜백인데 이 응답콜백이 200(요청을 허락해줬다는 표시)이라면 Fulfilled(이행) 상태가되는것입니다.
*/
//#endregion
