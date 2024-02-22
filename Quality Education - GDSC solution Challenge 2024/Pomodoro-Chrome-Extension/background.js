chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        if (timer === 60 * res.timeOption) {
          this.registration.showNotification("Pomodoro Timer", {
            body: `${res.timeOption} has completed, lets take a break`,
            icon: "icon.png",
          });
          chrome.alarms.create("breakTimer", {
            periodInMinutes: 5,
          });
          chrome.storage.local.set({
            timer: 0,
            isRunning: false,
          });
        } else {
          chrome.storage.local.set({
            timer,
          });
        }
      }
    });
  } else if (alarm.name === "breakTimer") {
    chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
      if (!res.isRunning) {
        this.registration.showNotification("Break Timer", {
          body: "Break time has completed, lets go back into work",
          icon: "icon.png",
        });
        chrome.alarms.clear("breakTimer");
        chrome.alarms.create("pomodoroTimer", {
          periodInMinutes: 1 / 60,
        });
        chrome.storage.local.set({
          timer: 0,
          isRunning: true,
        });
      }
    });
  }
});

chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    timeOption: "timeOption" in res ? res.timeOption : 25,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});
