//BACKGROUND
var images = [
  "images/1.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/2.jpg",
];
var currentIndex = 0;
var bgImage = document.getElementById("bg-image");

function changeBackground() {
  bgImage.style.backgroundImage = "url('" + images[currentIndex] + "')";
  currentIndex++;
  if (currentIndex == images.length) {
    currentIndex = 0;
  }
}

changeBackground();
setInterval(changeBackground, 60000); // Change image every 1 minute

//DASHBOARD
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus"),
  content = document.getElementById("content"),
  author = document.getElementById("author");

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  hour = addZero(hour);

  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

function setBg() {
  let hour = new Date().getHours();

  if (hour < 12) {
    greeting.textContent = "Good Morning, ";
  } else if (hour < 18) {
    greeting.textContent = "Good Afternoon, ";
  } else {
    greeting.textContent = "Good Evening, ";
  }
}

function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

if (
  localStorage.getItem("name") === null &&
  localStorage.getItem("focus") === null
) {
  Swal.mixin({
    input: "text",
    confirmButtonText: "Next &rarr;",
    progressSteps: ["1", "2"],
  })
    .queue([
      {
        title: "Your Name",
      },
      {
        focus: "Your Focus",
      },
    ])
    .then((result) => {
      if (result.value) {
        Swal.fire({
          title: "All done!",
          html: `
              <p>Your Name: ${result.value[0]}</p>
              <p>Your Focus: ${result.value[1]}</p>
            `,
          confirmButtonText: "Lovely!",
        });

        localStorage.setItem("name", result.value[0]);
        localStorage.setItem("focus", result.value[1]);
      }
    });
}

axios.get("https://api.quotable.io/random").then((res) => {
  content.textContent = res.data.content;
  author.textContent = res.data.author;
});
function updateQuote() {
  axios.get("https://api.quotable.io/random").then((res) => {
    content.textContent = res.data.content;
    author.textContent = res.data.author;
  });
}
updateQuote();
setInterval(updateQuote, 60000);

showTime();
setBg();
getName();
getFocus();

//TODO LIST
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("Write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

const divContainer = document.querySelector("#elementToWorkOn");

let isCLicked = true;

let showOrHide = function () {
  if (isCLicked) {
    divContainer.style.display = "block";
    isCLicked = false;
  } else {
    divContainer.style.display = "none";
    isCLicked = true;
  }
};
