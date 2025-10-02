const STORAGE_KEY = "myTasks";
let tasks = loadTasks();

const taskList = document.getElementById("taskList");
const counts = document.getElementById("counts");

function render() {
  taskList.innerHTML = ""; // clear old list

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "item" + (task.done ? " completed" : "");
    li.dataset.id = task.id;

    const chk = document.createElement("button");
    chk.className = "btn complete";
    chk.innerHTML = task.done ? "✓" : "○";
    chk.addEventListener("click", () => toggleDone(task.id));

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const del = document.createElement("button");
    del.className = "btn delete";
    del.innerHTML = "🗑";
    del.addEventListener("click", () => removeTask(task.id));

    actions.appendChild(del);
    li.appendChild(chk);
    li.appendChild(title);
    li.appendChild(actions);
    taskList.appendChild(li);
  });

  updateCounts();
}

function toggleDone(id) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return;
  tasks[idx].done = !tasks[idx].done;
  saveTasks();
  render();
}

function removeTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function updateCounts() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  counts.textContent = `${total} task${total !== 1 ? "s" : ""} • ${done} completed`;
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

// First render
render();
