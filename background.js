chrome.alarms.create("workcoinTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "workcoinTimer") {
    chrome.storage.local.get(
      ["timer", "isRunning", "countdown", "points"],
      (res) => {
        if (res.isRunning) {
          let started = res.started;
          let finished = false;
          let points = res.points;
          let timer = res.timer + 1;
          let isRunning = true;
          if (timer == 60 * res.countdown) {
            this.registration.showNotification("Workoin Timer", {
              body: `${res.countdown} minutes has passed! Workoin awarded!`,
              icon: "goldcoin.png",
            });
            timer = 0;
            isRunning = false;
            finished = true;
            points += res.countdown;
          }
          chrome.storage.local.set({
            timer,
            isRunning,
            finished,
            points,
          });
        }
      }
    );
  }
});

chrome.storage.local.get(
  ["timer", "isRunning", "countdown", "started", "finished", "points"],
  (res) => {
    chrome.storage.local.set({
      timer: "timer" in res ? res.timer : 0,
      countdown: "countdown" in res ? res.countdown : 25,
      isRunning: "isRunning" in res ? res.isRunning : false,
      started: "started" in res ? res.started : false,
      finished: "finished" in res ? res.finished : false,
      points: "points" in res ? res.points : 0,
    });
  }
);

chrome.storage.local.get("started", function (data) {
  console.log(data.started);
  if (data.started) {
    chrome.action.setPopup({
      popup: "./popup-progress/popup-progress.html",
    });
  } else {
    chrome.action.setPopup({ popup: "./popup/popup.html" });
  }
});
