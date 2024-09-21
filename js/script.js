// MEMBUAT EVENT CUSTOM UNTUK MENAMPILKAN TODO
const RENDER_EVENT = "render-todo";
const todos = [];

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addTodo();
    countTask();
  });
});

// FUNCTION MENAMBAH TODO
function addTodo() {
  const teks = document.getElementById("teks").value;
  const date = document.getElementById("date").value;

  const id = generatedID();
  let todoObject = generateTodoObject(id, teks, date, false);

  //   Masukkan object todo ke array todo
  todos.push(todoObject);

  //   PANCING AKSI EVENT CUSTOM
  document.dispatchEvent(new Event(RENDER_EVENT));
}
function generatedID() {
  return new Date().getTime();
}
function generateTodoObject(id, teks, date, isCompleted) {
  return {
    id,
    teks,
    date,
    isCompleted,
  };
}

document.addEventListener(RENDER_EVENT, function () {
  console.log(todos);

  const todoProses = document.querySelector(".proses");
  todoProses.innerHTML = "";

  const todoCompleted = document.querySelector(".completed");
  todoCompleted.innerHTML = "";

  for (const todoItem of todos) {
    const containerTodoItems = makeTodo(todoItem);
    if (!todoItem.isCompleted) {
      todoProses.append(containerTodoItems);
    } else {
      todoCompleted.append(containerTodoItems);
    }
  }
});

// FUNCTION MEMBUAT TODO
function makeTodo(todoObject) {
  const teks = document.createElement("h4");
  teks.innerText = todoObject.teks;

  const date = document.createElement("p");
  date.innerText = todoObject.date;

  const containerTodo = document.createElement("div");
  containerTodo.classList.add("inner");
  containerTodo.append(teks, date);

  const container = document.createElement("div");
  container.classList.add("item");
  container.append(containerTodo);
  container.setAttribute("id", `todo-${todoObject.id}`);

  if (todoObject.isCompleted) {
    const undoTodo = document.createElement("img");
    undoTodo.setAttribute("src", "assets/undo.png");

    const deleteTodo = document.createElement("img");
    deleteTodo.setAttribute("src", "assets/delete.png");

    undoTodo.addEventListener("click", function () {
      undoTodoAction(todoObject.id);
    });

    deleteTodo.addEventListener("click", function () {
      deleteTodoAction(todoObject.id);
      countTask();
    });

    const icon = document.createElement("div");
    icon.classList.add("icon");

    icon.append(undoTodo, deleteTodo);
    container.append(icon);
  } else {
    const checkedTodo = document.createElement("img");
    checkedTodo.setAttribute("src", "assets/checked.png");

    checkedTodo.addEventListener("click", function () {
      checkedTodoAction(todoObject.id);
    });
    const icon = document.createElement("div");
    icon.classList.add("icon");

    icon.append(checkedTodo);
    container.append(icon);
  }

  return container;
}

function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id == todoId) {
      return todoItem;
    }
  }
  return null;
}

// FUNCTION UNDO TODO
function undoTodoAction(todoId) {
  const todoTarget = findTodo(todoId);

  if (todoTarget == null) return;
  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

// FUNCTION TAMBAHKAN SELESAI
function checkedTodoAction(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;
  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

// FUNCTION MENGHAPUS TODO
function deleteTodoAction(todoId) {
  const todoTarget = findTodoIndex(todoId);

  if (todoTarget == -1) return;
  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findTodoIndex(todoId) {
  for (const index in todos) {
    if (todos[index].id == todoId) {
      return index;
    }
  }
  return -1;
}

// MEMBUAT WAKTU

const setTime = setInterval(function () {
  let time = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  const day = time.getDay();

  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;

  const dayName = days[day];

  const stringTime = document.querySelector(".time");
  stringTime.innerText = `${dayName} ${h} : ${m} : ${s}`;
}, 1000);

function countTask() {
  const countAdd = document.querySelector(".count-add");
  let count = 0;

  for (const todoItem of todos) {
    if (!todoItem.isCompleted) {
      count += 1; // Tambahkan jika tugas belum selesai
    }
  }

  countAdd.innerText = count; // Tampilkan jumlah tugas yang belum selesai
}
