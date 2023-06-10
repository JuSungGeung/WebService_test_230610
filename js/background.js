//#region #6.1
/*
#region #6.1
createElement
-> <img src="img/0.jpeg"> 해당방식으로 엘리멘탈 생성

appendChild
-> body에 메소드는 한 노드를 특정 부모 노드의 자식 노드 리스트 중 마지막 자식으로 붙입니다.
   만약 주어진 노드가 이미 문서에 존재하는 노드를 참조하고 있다면
    appendChild() 메소드는 노드를 현재 위치에서 새로운 위치로 이동시킵니다.
   (문서에 존재하는 노드를 다른 곳으로 붙이기 전에 부모 노드로 부터 지워버릴 필요는 없습니다.
*/
const images = ["0.jpeg", "1.jpeg", "2.jpeg"];
const chosenImage = images[Math.floor(Math.random() * images.length)];
const bgImage = document.createElement("img");
//console.log(bgImage);
bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);
//#endregion
/*
//추가 질문 확인
--appendChild를 사용할 때 body에 넣고 싶은 위치에 정확히 넣으려면 어떻게 하나요?
--영상에서만 봤을 때는 맨 마지막에 들어가는 것 같은데, 중간에 태그를 넣고싶은 경우는 어떻게 하나요?
insertBefore() 메소드를 사용하시면 됩니다
이 메소드는 참조된 노드 앞에 특정 부모 노드의 자식 노드를 삽입합니다.
const h2 = document.querySelector("#clock")
document.body.insertBefore(bgImage, h2);
두개의 인자중에 앞의 bgImage는 새로운 노드 즉 추가하고 싶은 노드이고 h2는 참조할 노드입니다.
즉 이렇게 코드를 짜시면 h2요소 앞에 bgImage가 추가되게 됩니다.
*/