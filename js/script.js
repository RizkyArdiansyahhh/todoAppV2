// MEMBUAT EVENT CUSTOM UNTUK MENAMPILKAN TODO
const RENDER_EVENT = "render-todo";
const todos = [];

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addTodo();
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
});
