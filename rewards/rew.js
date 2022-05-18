rewards = [];

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

chrome.storage.sync.get(["rewards"], (res) => {
  rewards = res.rewards ? res.rewards : [];
  renderTasks();
});

function saveTasks() {
  chrome.storage.sync.set({
    rewards,
  });
}

function renderTask(taskNum) {
  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a reward...";
  text.value = rewards[taskNum];
  text.className = "task-input";
  text.addEventListener("change", () => {
    rewards[taskNum] = text.value;
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
  const taskNum = rewards.length;
  rewards.push(task_field);
  renderTask(taskNum);
  saveTasks();
}

function deleteTask(taskNum) {
  rewards.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}

function finishTask(taskNum) {
  chrome.storage.local.get(["points"], (res) => {
    let points = res.points;
    if (points >= 100) {
      points -= 100;
      chrome.storage.local.set({ points });
      rewards.splice(taskNum, 1);
      renderTasks();
      saveTasks();
    }
  });
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  rewards.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}

const timerbtn = document.getElementById("timer-btn");
timerbtn.addEventListener("click", () => {
  console.log("pressing todo");
  chrome.storage.sync.get(["started"], (res) => {
    if (res.started) {
      window.location.href = "../popup-progress/popup-progress.html";
    } else {
      window.location.href = "../popup/popup.html";
    }
  });
});

const todolistbtn = document.getElementById("todo-btn");
todolistbtn.addEventListener("click", () => {
  console.log("pressing todo");
  window.location.href = "../todo/todo.html";
});
