const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const resetBtn = document.querySelector(".reset-btn");
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

const startClickHandler = (e) => {
  e.target.disabled = true;
  stopBtn.disabled = false;
  startProgressing();
};

const stopClickHandler = (e) => {
  e.target.disabled = true;
  startBtn.disabled = false;
  stopProgressing();
};

const resetClickHandler = () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  progress.style.width = "0%";
  stopProgressing();
};

startBtn.addEventListener("click", startClickHandler);
stopBtn.addEventListener("click", stopClickHandler);
resetBtn.addEventListener("click", resetClickHandler);
