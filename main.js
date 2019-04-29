window.onload = init;

function init() {
  getTodos();

  document.querySelector("#post").addEventListener("click", postTodo);
}

function getTodos(event) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/todos");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = handleData;
  xhr.send();
}

function postTodo(event) {
  event.preventDefault();
  clearUl();
  const inputBox = document.querySelector("#text").value;
  document.getElementById("pauls-form").reset();
  const newTodo = {
    text: inputBox,
    completed: false
  };

  const jsonnedTodo = JSON.stringify(newTodo);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/todos");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = getTodos;
  xhr.send(jsonnedTodo);
}

function updateTodo(event) {
  const linethrough = this;
  linethrough.style.textDecoration = "line-through";
  let parent = document.querySelector("#list");
  console.log(parent);
  console.log(this.index);

  const updatedTodo = {
    text: this.innerText,
    completed: true
  };
  const jsonnedTodo = JSON.stringify(updatedTodo);

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `http://localhost:3000/todos/${this}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = handleData;
  xhr.send(jsonnedTodo);
}

// xhr.open("PUT", "http://localhost:3000/todos/");

function handleData(event) {
  event.preventDefault();
  const data = JSON.parse(event.target.responseText);

  for (let i = 0; i < data.length; i++) {
    const list = document.querySelector("#list");
    const newLi = document.createElement("li");
    newLi.innerText = data[i].text;
    newLi.addEventListener("click", updateTodo);
    list.appendChild(newLi);
  }
}
function clearUl() {
  const list = document.querySelector("#list");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}

// function handleData(event) {
//     event.preventDefault();
//     const data = JSON.parse(event.target.responseText);

//     for (i = 0; i < data.length; i++) {
//         const list = document.querySelector("#list");
//         const secNewList = document.createElement("#li");
//         secNewList.innerText = data[i].text;
//         list.appendChild(secNewList);
//     }
// }

// function postTodo() {
//     const list = document.getElementById("post");
//     const newNavList = document.createElment ("li");
//     newNavList.innerText = data[i].text;
//     list.appendChild(newNavList);
//     const data = displayData ()
//     }

// // function
