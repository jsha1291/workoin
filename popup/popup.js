let tasks = [];

function isNum(val) {
  return !isNaN(val);
}

$("#time").keypress(function (e) {
  if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
});

const startTimerBtn = document.getElementById("work-btn");
startTimerBtn.addEventListener("click", () => {
  let num = 0;
  let time_string = document.getElementById("time").textContent;
  let message_win = document.getElementById("message");
  if (time_string.trim === "") {
    time_string = "10";
  }
  if (isNum(time_string)) {
    message_win.textContent = "";
    let countdown = parseInt(time_string);
    //let coundown = 20
    chrome.storage.local.set({ countdown, isRunning: true, started: true });

    window.location.href = "../popup-progress/popup-progress.html";
    //window.close();
  } else {
    message_win.textContent = "Please Enter a Number!";
  }
});

const todolistbtn = document.getElementById("todo-btn");
todolistbtn.addEventListener("click", () => {
  console.log("pressing todo");
  window.location.href = "../todo/todo.html";
});

const rewardslistbtn = document.getElementById("rewards-btn");
rewardslistbtn.addEventListener("click", () => {
  console.log("pressing rewards");
  window.location.href = "../rewards/rew.html";
});
