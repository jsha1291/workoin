tasks = [];

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});

function saveTasks() {
  chrome.storage.sync.set({
    tasks,
  });
}

function renderTask(taskNum) {
  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task...";
  text.value = tasks[taskNum];
  text.className = "task-input";
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const finishBtn = document.createElement("input");
  finishBtn.type = "button";
  finishBtn.value = "O";
  finishBtn.className = "task-delete";
  finishBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.className = "task-delete";
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(finishBtn);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const task_field = document.getElementById("add-task-field").textContent;
  const taskNum = tasks.length;
  tasks.push(task_field);
  renderTask(taskNum);
  saveTasks();
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}

function finishTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
  chrome.storage.local.get(["points"], (res) => {
    let points = res.points;
    points += 100;
    chrome.storage.local.set({ points });
  });
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}

const timerbtn = document.getElementById("timer-btn");
timerbtn.addEventListener("click", () => {
  console.log("pressing todo");
  chrome.storage.sync.get(["started"], (res) => {
    if (res.started) {
      console.log("sdfsd");
      window.location.href = "../popup-progress/popup-progress.html";
    } else {
      console.log("1123");
      window.location.href = "../popup/popup.html";
    }
  });
});

const rewardslistbtn = document.getElementById("rewards-btn");
rewardslistbtn.addEventListener("click", () => {
  console.log("pressing rewards");
  window.location.href = "../rewards/rew.html";
});
