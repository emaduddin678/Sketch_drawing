const canvas = document.getElementById("canvas");
const body = document.querySelector("body");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var theColor = "";
var lineW = 5;
let prevX = null;
let prevY = null;
let draw = false;

// my code emad
window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  console.log(window.innerHeight, window.innerWidth);
  if (window.innerWidth < 480) {
    console.log("Hello");
  }
});
// my code emad
const ctx = canvas.getContext("2d");


body.style.backgroundColor = "#FFFFFF";
var theInput = document.getElementById("favcolor");

theInput.addEventListener(
  "input",
  function () {
    theColor = theInput.value;
    console.log(theColor)
    if(!!theColor){
      ctx.strokeStyle = theColor;
    }
  },
  false
);

const img = document.getElementById("canvasImage");
ctx.drawImage(img, 350, 100, 668, 459);

if (window.innerWidth < 480) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const img = document.getElementById("canvasImage");
  const xdis = window.innerWidth - 400;
  const ydis = window.innerHeight - 274;
  ctx.drawImage(img, xdis/2, ydis/2, 400, 274);
  console.log("Hello");
}

ctx.lineWidth = lineW;

document.getElementById("ageInputId").oninput = function () {
  draw = null;
  lineW = document.getElementById("ageInputId").value;
  document.getElementById("ageOutputId").innerHTML = lineW;
  ctx.lineWidth = lineW;
};

let clrs = document.querySelectorAll(".clr");
// console.log(clrs)
clrs = Array.from(clrs);
// console.log(clrs)
clrs.forEach((clr) => {
  clr.addEventListener("click", () => {
    console.log(theColor)
    theColor = clr.dataset.clr;
    ctx.strokeStyle = theColor;
    console.log(theColor)
  });
});

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
   const img = document.getElementById("canvasImage");
   const xdis = window.innerWidth - 400;
   const ydis = window.innerHeight - 274;
   ctx.drawImage(img, xdis / 2, ydis / 2, 400, 274);
   console.log("Hello");
});

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
  let data = canvas.toDataURL("imag/png");
  let a = document.createElement("a");
  a.href = data;
  a.download = "sketch.png";
  a.click();
});

window.addEventListener("mousedown", (e) => (draw = true));
window.addEventListener("mouseup", (e) => (draw = false));

window.addEventListener("mousemove", (e) => {
  if (prevX == null || prevY == null || !draw) {
    prevX = e.clientX;
    prevY = e.clientY;
    return;
  }

  let currentX = e.clientX;
  let currentY = e.clientY;

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  prevX = currentX;
  prevY = currentY;
});

window.addEventListener("touchstart", handleStart, { passive: false });
window.addEventListener("touchmove", handleMove, { passive: false });
window.addEventListener("touchend", handleEnd, { passive: false });

function handleStart(event) {
  draw = true;
  let touches = event.touches[0];
  prevX = touches.clientX;
  prevY = touches.clientY;
}

function handleMove(event) {
  event.preventDefault(); // Prevent scrolling
  if (!draw) return;
  let touches = event.touches[0];
  let currentX = touches.clientX;
  let currentY = touches.clientY;

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  prevX = currentX;
  prevY = currentY;
}

function handleEnd() {
  draw = false;
}

