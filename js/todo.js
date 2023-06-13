//#region #7
/*
#7.1 Adding ToDos
append()가 추가할 수 있는 종류가 더 많아요. append()로는 문자열도 추가가 가능한데,
 appendChild()로는 객체만 추가할 수 있어요. :)
li.append("추가해주세요") → (가능)
li.appendChild("추가해주세요") → (불가능 - typeError)

그리고 console.log로 두 개를 찍어보면 append()하고 appendChild()가 다르게 나와요!
*/
/*
#7.2 Deleting To Dos
event 가 클릭된 위치를 알려주고 클릭 target 이 무엇인지 확인한 후 해당 parentElement 로 target의 부모Element를 찾는다
*/
const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");// = const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

//const toDos = [];
let toDos = [];

function saveToDos() {
  //console.log(JSON.stringify(toDos));
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    //console.log(event);
    //console.log(event.target);
    //console.dir(event.target);
    //console.log(event.target.parentElement.innerText);
    //console.dir(event.target.parentElement.innerText);
    const li = event.target.parentElement;
    //console.log(li.id);
    li.remove();
    //toDos = toDos.filter((toDo) => console.log(typeof toDo.id, typeof li.id));
    toDos = toDos.filter((toDo) => toDo.id != parseInt(li.id));//toDo.id 가 number 이므로 형변형을 하여 비교
    saveToDos();
  }

function paintToDo(newTodo) {
    //console.log("i will paint",newTodo);
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    //li.appendChild(span);//li 안에 span 넣기
    //span.innerText = newTodo;
    //console.log(newTodo.text);
    span.innerText = newTodo.text;
    //console.log(li);
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
  }

function handelToDoSubmit(event) {
    event.preventDefault();// 브라우저가 기본 동작을 실행하지 못하게 막기
    const newTodo = toDoInput.value;
    //console.log(toDoInput.value);
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
      toDos.push(newTodoObj);
      paintToDo(newTodoObj);
      saveToDos();
}
toDoForm.addEventListener("submit", handelToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

//function sayHello(item) {
//    console.log("this is the turn of ", item)
//}

//console.log(localStorage.getItem(TODOS_KEY));
//console.log(JSON.parse(savedToDos));
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  //parsedToDos.forEach(sayHello);//function 활용 
  //parsedToDos.forEach((item) => console.log("this is the turn of ", item));// arrow function 위 주석과 결과 동일
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
//#endregion

//추가 질문 확인
//#region #7.0 Setup
/*
1. html
1) Todo-list 를 만들기를 원하니 html 에 form 태그로 구조를 만들어 준다. 나중에 JavaScript에서 만지기 쉽게 id는 todo-form으로 설정
2) form 자체는 submit이라는 기본 기능을 내장하는 하나의 묶음 밖에 되지 않는다. 우리는 이용자가 todo-list 에 무언가 기입하는 것을 원하기 때문에 form 태그 안에 input 태그를 넣어 'text'를 타이핑할 수 있는 기능을 추가한다.
3) 그 밑에 ul 태그를 생성하여 todo-list에 작성 된 text가 저장 및 나열될 수 있게 한다.

2. JavaScript
1) 앞에 html에서 만든 구조 3가지 ('todo-form', 'todo-form 안의 input', 'todo-list') 에 접속하기 위해 항상 길게 타이핑하는 것은 비효율적이므로 단축을 위해 각각 변수로 설정한다.
2) 이전 greeting 강의에서 form 태그에서의 event는 submit를 발생시키고, 브라우저는 기본값으로 설정되어 있는 새로고침을 하게 된다. 우리는 todo-list를 작성한다고 새로고침 되는 것을 원치 않기 때문에(todo-list를 1,000번 작성한다고 가정한다면 불필요한 새로고침이 1,000번 발생하고 1,000번의 랜덤한 이미지가 로드될 것이다. -> 데이터적으로 비효율적, 시각적으로 불편)
event.preventDefault() 로 기본값을 없애준다.
3) text 상자 안에 글을 작성하고 enter를 눌렀을 때 그 글이 초기화 되게 만들기 위해 toDoInput.value = ""; 을 통해 value를 빈 텍스트로 한다.
4) text 상자를 비게 하는 것은 좋은데 그 전에 이용자가 입력한 텍스트를 저장해야 나중에 ul태그 안에 사용할 수 있기 때문에 toDoInput.value = ""; 로 기입한 텍스트가 사라지기 이전에
const newTodo = toDoInput.value; 를 정의하여 기입한 텍스트가 newTodo라는 값에 저장되게 한다.
5) 앞의 세 가지 동작(기본값방지, 텍스트 저장, text상자비우기)는 한번에 이루어지는 세트이기때문에 효율성 및 편의를 위해 함수로 묶어준다.
function handleTodoSubmit() {
event.preventDefault();
const newTodo = toDoInput.value;
toDoInput.value = "";
}
6) todo-form 안에서 submit이 발생하는 특정 상황에서 함수handleTodoSubmmit을 실행 시키기 위해
toDoform.addEventListner("submit", handleTodoSubmit); 을 기입한다.
(함수 handleTodoSubmit이 항상 실행되고 있는 상태라면 text 창은 항상 비어있는 상태 일 것이기 때문에)
*/
//#endregion

//#region #7.1 Adding ToDos 
/*
< JS 입문자의 시점으로 본 # 7.1 >

0. 이전 영상에서 우린 hadle.ToDoSubmit() 함수를 만들어
1) event.preventDefault(); // 새로고침을 막고
2) const newTodo = toDoInput.value; // submit하는 텍스트를 저장하고
3) toDoInput.value = ""; // 텍스트상자 안의 텍스트를 초기화시켰다.

이제 우린 방금 전 입력한 텍스트가 페이지에서 보여지는 것을 원하기 때문에 그에 맞는 코드를 작성할 것이다.

1. html 돌아보기
우린 이미 html에 todo-list라는 id를 가진 ul태그를 작성해 놓았고, 새로운 텍스트가 입력 될 때마다 그 안에 li 태그를 생성하여 나열하고 싶다. 이것을 JS에서 관여할 수 있도록 코드를 짜는 것이 필요하다.

2. JavaScript - todo list를 웹페이지에서 시각화하기
1) const li = document.createElement("li"); // li를 입력했을 때 html에서 li태그를 생성하게 명령한다.
2) const span = document.createElement("span"); // span이 정확히 왜 필요한지는 아직 잘 모르겠지만, 니꼬의 말에서 유추해보면 나중에 리스트 삭제 시 필요한가보다. 아무튼 span이라는 const가 html 내에서 span태그를 만들게끔 한다.
3) li.appendChild(span); // li 태그 안에 자식을 span 태그로 하게끔 한다. 아직 span을 굳이 왜 만드는지는 정확히 이해 x


4) span.innerText = newTodo; // span이라는 태그 안의 텍스트가 앞에서 설정한 new Todo라는 객체가 되도록 한다. newTodo는 텍스트에 입력한 value값
ex) 텍스트 상자 안에 "안녕하세요"라고 입력하면 newTodo는 "안녕하세요"이므로 span안의 텍스트는 "안녕하세요"가 될 것이다.
5) toDoList.appendChild(li); // html의 ul 태그 안에 li 를 속하게 한다. (span을 li에 속하게 한 것과 동일)

3. 함수 piantTodo(newTodo)를 함수 handleTodoSubmit()에 추가
우리가 텍스트를 기입하고 submit 할 때마다 원하던 기능들을 실행시키기 위해 위에서 만든 함수 paintTodo(nweTodo)를 함수 handleTodoSubmit()에 추가한다.
기존 함수 handleToDoSubmit()가 텍스트 상자 안의 텍스트를 초기화하는 기능까지만 했다면, paintToDo(newTodo)추가 후에는 제출한 텍스트를 매번 html의 ul안에서 li태그와 그 안에 속하는 span 태그를 만들고 span에 텍스트로 남겨 웹 화면에서 보일 수 있는 것 까지 되게 한다.

4. 하지만 우리가 만든 todo list 는 아직 삭제를 하지 못하고, 새로고침시 초기화 되어 화면의 todo list가 날라가 버린다. 다음 영상에서는 니꼬가 이 부분에 대해 알려줄 것 같다. 아무래도 이전에 배웠던 조건문 if를 이용한 tag 삭제 or 생성 그리고 생성된 span value를 localStorage에 저장 하는 방식으로 진행하지 않을까 싶다.
*/
//#endregion

//#region #7.2 Deleting To Dos
/*
< JavaScript 입문자가 바라본 #7.2 >

0. #7.1 에서 우리는 기입한 텍스트를 화면에서 보이게 하는 코드까지 작성해보았다! 이제 그 텍스트를 내가 원할 때 지울 수 있게끔 니꼬를 따라가보자

1. JS에서 html 내부에 button 태그 만들기
1) const button = document.createElement("button"); // html에 button 태그를 생성할 수 있도록 button이라는 객체 정의
2) button.innerText = "❌"; // 사용자가 버튼을 누르면 텍스트가 삭제되는 기능이 있다는 것을 인식시키기 위해 버튼 내부 텍스트를 "❌"로 정의 (윈도우 기준: window 키 + . )

3) button.addEventListener("click", deleteToDo); // 버튼에서 이벤트가 발생했을 때 삭제 기능을 담당하는 함수가 실행되도록 한다. 여기에선 "click"이 발생 시, deleteToDo함수가 실생되도록 함

2. 삭제 기능을 담당하는 함수 생성
1) const li = event.target.parentElement; // 이벤트가 발생했들때.해당객체를지정하여.그것의부모태그를지정;
2) li.remove(); // 위에서 지정된 것을 삭제;

3. 정리하면
1) button.addEventListener("click", deleteToDo); 에서 클릭이 발생하면 deleteToDo함수가 실행된다.
2) function deleteToDo(event) { const li = event.target.parentElement; li.remove(); }
*/
//#endregion

//#region #7.3 Saving To Dos
/*
< json.stringify >
왜 json.stringify 함수를 쓰나 했는데 나중에 json.parse 함수를 쓰더라구요
(STRINGIFY = 변수 등을 문자열로 바꿈,PARSE = 문자열을 JSON으로 바꿈)
localstorage 에서는 문자열밖에 저장할 수 있기 때문에
stringify로 Array 자체를 문자열로 만들고 (["뭐시기","저시기"] ==> "["뭐시기","저시기"]")
나중에 localstorage에서 가지고 온 다음 parse로 문자열을 Array 로 만들어서
불러들이는 걸로 하는거 같아요
이상 뒷강의를 보지 않고 추측해본 뇌피셜
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

< JavaScript 입문자가 본 #7.3 >

0. 이전 영상에서 우리는 추가와 삭제가 가능한 멋진 todo-list를 화면에 구현했다..!
하지만 새로고침을 하거나 이용자가 누구인가와 관계없이 똑같은 todo-list가 나온다면 우리는 todo-list를 그 때마다 계속해서 작성해야할 것이다. 만약 todo-list를 1,000개 작성했는데 단숨에 날라간다면...? 그건 어딘가 부족한 todo-list 일 거다. 그래서 우린 todo-list에 나타낸 텍스트를 저장하는 기능이 필요하다.

1. todo - list의 배열 생성
1) const toDos = [ ]; // toDo에 들어오는 텍스트를 배열로 묶어 보관하기 위해 빈 array를 생성해준다.

2. 저장 기능을 함수를 정의한다.
1) 아직 기능을 하진 않지만 우리는 화면에 나타낸 텍스트를 저장할 것이기 때문에 대충 그러한 기능을 하는 함수가 있다고 치고 빈 함수
function saveToDos( ) {
};
를 생성한다.
2) 앞에서 만들었던 함수 handleToDosubmut( ); 의 맨 마지막에 저장 기능을 실행할 saveToDos(); 넣어두고 다음에서 기능을 구현한다.

3. todo - list를 저장하는 기능을 수행하는 함수 설정
1) function saveToDos( ) { localStorage.setItem("todos",toDos); } 에 "todos"라는 이름의 카테고리로 저장한다.
2) 하지만 이렇게 저장하게 되면 직접 localStorage 에서 확인해봤을 때 값들이 array안에서
string의 형태가 아닌 상태로 저장된다.
예) key: todos value: a,b,c
3) 하지만 우리는 값들을 string의 형태로 toDos라는 array에 집어넣고 싶기 때문에 니꼬가 알려준 JSON.stringify() 라는 객체를 사용한다. 이 도구는 우리가 대입한 값을 알아서 string의 형태로 바꿔줄 것이다.
예) key: todos value: ["a", "b", "c"]

< const로 변수를 생성하면 후에 값을 update할 수 없다고 기억하고 있습니다.
   하지만 push()함수로 값을 update하는거 같은데 이유가 무엇인가요? >

어레이나 오브젝트 자료형은 const로 선언해도 내부의 값을 할당하는것은 할 수 있습니다.
Ex) const arr = ["a","b","c"];
arr.push("d"); // arr = ["a","b","c","d"]
그러나 arr = { name : "Kim" } 같이 자료형 자체를 새로 할당하는것은 const 특성상 되지 않습니다..

값을 update 할 수 있는건 오브젝트나 어레이는 Reference data type 이라 가능한건데요.. 쉽게 말하자면
오브젝트나 어레이를 선언하면, 그 오브젝트나 어레이 자체를 저장해주는게 아니라, 이 오브젝트는 ~~~ 에요 라는 화살표를 저장해준다고 생각하면 됩니다.
예를들어,
const arr1 = [1,2,3,4];
const arr2 = arr1;
arr1.push(5);
console.log(arr1 == arr2); // true
arr2 = arr1 라고 선언하고, arr1의 내부값만 바꿨지만,
실제로 arr1과 arr2는 모두 [1,2,3,4,5] 입니다.
Reference data type 의 특징입니다..
number나 string같은 Primitive 자료형으로 위와 같은 테스트를 해보시면, false로 나올겁니다.

정확히 알고 싶으시면 원시 자료형(primitive type)과 참조 자료형(reference data type)에 대해서 알아보시면 좋을 것 같아요.
참조 자료형은 그 자료의 주소를 들고 있는 겁니다.
const a = [1,2,3,4]; 하면 a는 [1,2,3,4]가 들어있는 배열의 시작지점 주소를 들고 있는 거예여.
이 상태에서 배열에 5가 추가 되던 6이 추가되던 a가 시작지점의 주소를 쥐고 있는 건 변하지 않는 상태에서 배열의 내용물만 달라지는 거예여.
다만 이때 a에 들어있는 주소를 바꾸려고 한다? 이것은 오류가 납니다.
말씀하신대로 const로 즉 상수로 선언했기 때문이죠.

< JSON >
JSON은 데이터 교환 목적으로 만들어진 포맷입니다 ! 자바스크립트 이외에도 다른 언어도 같이 쓸 수 있어요.

JSON 메서드는 대표적으로 두가지가 있어요.

1. JSON.stringify – 객체를 JSON으로 바꿔줍니다.
=> 객체를 문자열로 바꿔주어요

2. JSON.parse – JSON을 객체로 바꿔줍니다.
=> JSON으로 인코딩된 객체(문자열로 바뀐 객체)를 다시 객체로 바꾸어줍니다.(디코딩)

이 두가지 메서드에 함수를 인수로 넘겨주면 원하는 값만 읽거나 쓰는게 간편해집니닷
*/
//#endregion

//#region #7.4 Loading To Dos part One
/*
< JSON.parse(),foreach() >
1. To-Do-List 작성시 localStorage 에 저장이 됩니다.
2. 근데 저장이 될때 string data type 으로 저장이 되요. (예: "[a,b,c,d,e]")
3. 그래서 JSON.parse()를 통해 string data type을 object로 바꾼거에요. 근데 이 Object는 Array 같이 바뀌었어요. 즉 index를 통해 value를 access할수 있어요
예: "[a,b,c,d]" (string) => [a, b, c, d] (array);
array[0] = a; array[1] = b; array[2] = c; array[3] = d
5. array 형태가 된 값을 parsedToDos 라는 const variable 에다가 넣어놨어요.
6. 이 상태에서 parsedToDos 는 array 형태라고 가정했을때 .foreach() 라는 function 을 사용할수 있는데 이건 mdn 웹사이트 가면 나오지만 그냥 단순히 array 에 들어있는 모든 값을 iterate (순찰(?)) 할수 있는 function 입니다.
7. 즉 index 0 부터 마지막 index 까지 한바뀌 도는건데 돌면서 그 값들을 item 라는 곳 또는 element에 (이름은 정하기 나름) 저장이 되는거에요.
ex)
Array = [ a, b, c, d]
Array.foreach( (item) => console.log(item))
// output:
a
b
c
d
여기서 부터 설명이 좀 어려운데 밑에 있는 웹사이트 가서 editor로 좀 놀아보시면 .foreach()가 이해 되실거에요. for loop 이나 while loop 으로 할수 있는 기능을 더 짧은 코드로 할수 있게 만든것 같아요 ^^
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

< JSON.parse(),foreach() 두번째>
제대로 이해한게 맞다면 local storage에 array로 저장이 안되기 때문에 JSON.stringify로 array처럼 생긴 string으로 저장한 후 다시 JSON.parse 이용해 array로 꺼내는 방법이네요
array.foreach는 받아온 array를 for 반복문 없이 item 하나씩 function에 넣을 수 있는 신기한 녀석이네요

< localStorage는 string format밖에 지원을 안한답니다. >
localStorage는 string format밖에 지원을 안한답니다. 따라서 뭐든지 간에 다 string으로 변환시켜줘버려요. 근데 JSON.stringify도 string으로 변환시켜주잖아요? 그럼 무슨 차이가 있나 이런 생각에 좀 찾아보았습니다.

const todo = ["hi","hello"]
localStorage.setItem('todo',todo)
localStorage.getItem('todo')
>>> 'hi,hello' ( 기존 리스트 형식 없애고 내용물만 string화 시킴)
localStorage.setItem('todo',JSON.stringify(todo))
localStorage.getItem('todo')
>>> '["hi","hello"]' (리스트 째로 string화 시켜줌)

이런 차이가 있더라구요
JSON.stringify로 넘겨준 자료는 JSON.parse로 받아와서 이전 모습 그대로 소생? 시킬 수 있지만
그냥 넘겨준 자료(localStorage.setItem('todo',todo)는 JSON.parse로 받아오지 못해요 오류가 납니다.
*/
//#endregion

//#region #7.5 Loading To Dos part Two
/*
< 이전에 입력한 toDo와 새롭게 입력한 toDo 모두 유지하고 싶다! >

const toDos = []; => application이 시작될 때마다 toDos array는 항상 비어있기 때문에 새로운 것만 저장되는 거다.
그래서 newToDo를 작성하고 form을 submit 할 때마다 newToDo를 toDos array (빈 array)에 그냥 push 하게 된다.
그리고 그 toDo를 저장할 때 나는 새로운 toDo들만 포함하고 있는 array를 저장하는거다.
이 array는 이전의 toDo들은 가지고 있지 않다. 전에 있던 toDo들은 localStorage에 들어있다. 새로운 toDo들은 사용자가 입력하는 것이다.
우리는 단지 newTodo들만 toDos array에 추가해서 단지 newToDo들만 localStorage에 저장하고 있는거다.
즉, 우리가 갖고 있던 toDos의 이전 복사본을 잊어버리고 있다는 말이다.

======해결 방법=======
application이 시작될 때 toDos array를 빈 값으로 시작하는 대신에, const를 let으로 바꿔서 업데이트가 가능하도록 만들고,
 localStorage에 toDo 들이 있으면 toDos에 parsedToDos를 넣어서 전에 있던 toDo들을 복원하면된다.

< 학습목표 : localstorage.setItem('keyName','keyValue') >
우리는 로컬저장소의 keyValue를 배열로 만드는 방법을 이해하고 이를 활용할 수 있다.

keyName 에는 하나의 keyValue만 저장된다.
하지만 keyValue 를 'toDos'라고 하고, toDos = [] 라고 하여 우리는 그 안에 하나 이상의 정보를 넣을 수 있게 한다.
👉🏻```function saveToDos() {
localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}
=== localstorage.setItem('todos','[]')
```

toDos.push(newTodo)로 이 하나의 keyValue라는 상자 안에 하나 이상의 정보를 담아버리기~~

그리고 다시 저장된 것을 가져올 때에는
```
const savedToDos = localStorage.getItem(TODOS_KEY);
//getItem으로 호출하면 'value' 형태로 호출된다. '' 가 붙은 상태로 호출된다는 말.
if (savedToDos !== null) {
const parseToDos = JSON.parse(savedToDos); //getItem의 '' 를 parse 로 삭제.
toDos = parseToDos; //[] = ['a','b','c']
parseToDos.forEach(paintToDo);
}
*/
//#endregion

//#region #7.6 Deleting To Dos part One
/*
< 기존의 문제점 >
a,b,c,d,a 가 DB에 저장되어있으면
a를 삭제할때 어떤 a가 삭제되는지 모른다 -> 그렇기에 각 array의 item에 id를 부여해서 고유의 정체성? 을 갖게한다!
id값은 우리에게 랜덤한 숫자를 주는 Date.now(); 함수를 이용해서 부여할것
​const newToDoObj = {
​text:newTodo,
​id:Date.now(),
​};
이렇게 설정하고 난 뒤 기존 text만 보내던
toDos.push(newToDo);에서 toDos.push(newToDoObj);로 수정해야한다!
*/
//#endregion

//#region #7.7 Deleting To Dos part Two
/*
< fliter >
fliter 함수를 사용 -> array에서 뭔가를 삭제할 때 실제로 array에서 지우는 게 아닌 지우고 싶은 item을 빼고 새 array를 만듦(item을 지우는 게 아닌 item을 제외하는 것)

function sexyFilter(){return true} -> array의 item을 유지하고 싶으면 true를 return!
[1,2,3,4,5].filter(sexyFilter)
(5) [1, 2, 3, 4, 5]

function sexyFilter(){return false}
[1,2,3,4,5].filter(sexyFilter)
[]

function sexyFilter(item){return item !== 3} -> item이 3이 아니면 true를 return!
[1,2,3,4,5].filter(sexyFilter)
(4) [1, 2, 4, 5]

const arr = ["pizza", "banana", "tomato"] -> arr 배열에서 banana를 지우고 싶음!
function sexyFilter(food){return food !== "banana"}
arr.filter(sexyFilter)
(2) ['pizza', 'tomato']

const arr = [1234, 5656, 454, 343, 12, 4646, 405] -> 1000보다 큰 수를 모두 제외하기!
function sexyFilter(num){return num arr.filter(sexyFilter)
(4) [454, 343, 12, 405]


const todos = [{text:"lalala"}, {text:"lololo"}]
function sexyFilter(todo){return todo.text != "lololo"}
todos.filter(sexyFilter)
[{…}]0: {text: 'lalala'} length: 1 [[Prototype]]: Array(0)

-> 함수(sexyFilter)의 argument는 항상 달라도 상관 xx, filter가 각 todos의 item을 todo의 argument로 넣어 줌
*/
//#endregion

//#region #7.8 Deleting To Dos part Three
/*
< filter function 활용 >
filter를 사용할때, 강사님이 설명해주신 sexyfilter처럼 사용하고 싶으시다면, 아래와 같은 방법으로 하시면 됩니다.
더 좋은 방법이 있다면 공유 부탁드립니다.
이하 코드는 작동 문제 없습니다.
function isNotSameId(toDo,li) {
return toDo.id !== Number(li.id);
}

// To Do button - delete To Do
function deleteToDo(event){
const li = event.target.parentElement;
toDos = toDos.filter(todo => isNotSameId(todo,li));
saveStorageToDos();
li.remove();
}

< 다른 방법 >
function deleteToDo(event) {
const toDoListToArray = Array.from(toDoList.childNodes);
const toDo = event.target.parentElement;
const toDoIndex = toDoListToArray.indexOf(toDo);
toDo.remove();
toDos = toDos.filter((toDo, index) => index !== toDoIndex);
saveToDos();
}
*/
//#endregion

