const holes = document.querySelectorAll(".col-md-4");
const moles = document.querySelector(".hamilton");
const timeLeft = document.querySelector("#time-left span");
const score = document.querySelector("#score span");
const strbtn = document.querySelector("#start");
const stpbtn = document.querySelector("#stop");
const cursor = document.querySelector(".cursor");

let result = 0;
let currentTime = 15;
let timerId = null;
var soundOuch = new Howl({
  src: ["Assets/ouch.mp3"],
});

///---------------- Cursor Hammer Effects---------------\\\
window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});
window.addEventListener("mousedown", (e) => {
  cursor.classList.add("active");
});
window.addEventListener("mouseup", (e) => {
  cursor.classList.remove("active");
});


///----------------Start Game Function---------------\\\

function randomHole() {
  holes.forEach((holes) => {
    holes.classList.remove("hamilton");
  });
  let randomHole = holes[Math.floor(Math.random() * holes.length)];
  randomHole.classList.add("hamilton");
  hitPosition = randomHole.id;
}

strbtn.addEventListener("mousedown", () => {
  holes.forEach((holes) => {
    holes.addEventListener("mousedown", () => {
      if (holes.id == hitPosition) {
        soundOuch.play();
        result += 10;
        score.textContent = result;
        hitPosition = null;
      }
    });
  });

  function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if (currentTime == 0) {
      clearInterval(countDownTimerId);
      clearInterval(timerId);
      alert("Congratulations! Your final score is " + result);
    }
  }
  let countDownTimerId = setInterval(countDown, 1000);

  function moveHamilton() {
    timerId = setInterval(randomHole, 700);
  }
  moveHamilton();

  stpbtn.addEventListener("mousedown", () => {
    alert("Game over!");
    location.reload(true);
  });
});
