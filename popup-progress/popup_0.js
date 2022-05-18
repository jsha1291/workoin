function updateTime() {
  chrome.storage.local.get(
    ["timer", "countdown", "isRunning", "finished"],
    (res) => {
      const time = document.getElementById("time");
      const minutes = `${res.countdown - Math.ceil(res.timer / 60)}`.padStart(
        2,
        "0"
      );
      let seconds = "00";
      if (res.timer % 60 != 0) {
        seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
      }
      if (!res.finished) {
        time.textContent = `${minutes}:${seconds}`;
      } else {
        time.textContent = "00:00";
      }
      console.log(time.textContent);
      console.log(res.countdown);
      console.log(res.timer);
      stopTimerBtn.textContent = res.isRunning ? "Pause" : "Resume";
    }
  );
}

updateTime();
setInterval(updateTime, 1000);

const stopTimerBtn = document.getElementById("stop-timer-btn");
stopTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        stopTimerBtn.textContent = !res.isRunning ? "Pause" : "Resume";
      }
    );
  });
});

const resetTimerBtn = document.getElementById("reset-timer-btn");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
      started: false,
      finished: false,
      countdown: 30,
    },
    () => {
      stopTimerBtn.textContent = "Resume";
    }
  );
  window.location.href = "../popup/popup.html";
  //window.open("../popup/popup.html");
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
