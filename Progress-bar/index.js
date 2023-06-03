const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
let requestFrameId;

const startProgressing = () => {
  const prevWidth = +progress.style.width.split("%")[0];
  const updatedWidth = prevWidth + 0.1;

  if (updatedWidth <= 100) {
    progress.style.width = `${updatedWidth}%`;
    requestFrameId = requestAnimationFrame(startProgressing);
  }
};

const stopProgressing = () => {
  cancelAnimationFrame(requestFrameId);
};

startBtn.addEventListener("click", startProgressing);
stopBtn.addEventListener("click", stopProgressing);
