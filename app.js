//BACKGROUND
var images = ["img/1.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/2.jpg"]; // Put your image names in this array
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

showTime();
setBg();
getName();
getFocus();

//TODO LIST
