//#region #6.0
/*
#6.0 Quotes
Math.round(1.5); //반올림
Math.ceil(1.4); //올림
Math.floor(1.9); //내림
*/
const quotes = [
    {
      quote: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
    },
    {
      quote: "Life is what happens when you're busy making other plans.",
      author: "John Lennon",
    },
    {
      quote:
        "The world is a book and those who do not travel read only one page.",
      author: "Saint Augustine",
    },
    {
      quote: "Life is either a daring adventure or nothing at all.",
      author: "Helen Keller",
    },
    {
      quote: "To Travel is to Live",
      author: "Hans Christian Andersen",
    },
    {
      quote: "Only a life lived for others is a life worthwhile.",
      author: "Albert Einstein",
    },
    {
      quote: "You only live once, but if you do it right, once is enough.",
      author: "Mae West",
    },
    {
      quote: "Never go on trips with anyone you do not love.",
      author: "Hemmingway",
    },
    {
      quote: "We wander for distraction, but we travel for fulfilment.",
      author: "Hilaire Belloc",
    },
    {
      quote: "Travel expands the mind and fills the gap.",
      author: "Sheda Savage",
    },
  ];
  
  const quote = document.querySelector("#quote span:first-child");
  const author = document.querySelector("#quote span:last-child");
  const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  quote.innerText = todaysQuote.quote;
  author.innerText = todaysQuote.author;
//#endregion
/*
//추가 질문 확인
< Math.random Math.floor >
Math.random은 0 "이상" 1 "미만"의 값을 가지기 때문에, Math.floor를 사용해서 0~n개의 확률을 균등하게 배분하는 것이네요.
만약 Math.random이 1 "이하"였다면 복잡해 질 뻔했네요.

< parseInt(Math.random() * 10);와 같이 하면 안되는건가요? >
parseInt()는 문자를 숫자로 변경해주는 것이어서 불필요한 연산이 발생할 거 같아요.
즉, 숫자 > (자동으로) 문자 > 다시 숫자가 다시 되는 것이죠. 여기서는 큰 지장은 없겠지만,
 기본적으로는 Math.floor()를 쓰는 게 더 좋아보입니다.
*/