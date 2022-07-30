const todos = [];
const placeholder = [
    {"id":newId(),"title": "Nom de la variable ?", "completed": false},
    {"id":newId(),"title": "Bonne variable ?", "completed": false},
    {"id":newId(),"title": "Bon fichier ?", "completed": false},
    {"id":newId(),"title": "Tout sur git ?", "completed": false},
    {"id":newId(),"title": "Git commit/push fait ?", "completed": false},
]


function setup() {
    if (localStorage.getItem("todo")) load(JSON.parse(localStorage.getItem("todo")));
    else load(placeholder);
    $("#addForm").on("submit", (e)=>{
        e.preventDefault();
        addTodo($("#newTodoInput").val());
        $("#newTodoInput").val("");
    });
}

function load(data) {
    let container = $("ul#list");
    data.forEach((todo)=>{ container.append(createTodo(todo));});
}

function createTodo(todo) {
    let todoElement = $("<li>");
    todoElement.on("click", ()=>{ checkTodo(todo.id, todoElement); });
    if (todo.completed) todoElement.addClass("checked");
    todoElement.text(todo.title);
    let deleteBtn = $(`<span class="close">X</span>`);
    deleteBtn.on("click", ()=>{ deleteTodo(todo.id, todoElement); });
    deleteBtn.appendTo(todoElement);
    todos.push(todo);
    return todoElement;
}

function addTodo(title) {
    let todo = { id: newId(), title: title, completed: false };
    $("ul#list").append(createTodo(todo));
    save();
}

function deleteTodo(id, element) {
    todos.splice(getTodoById(id),1);
    element.remove();
    save();
}

function checkTodo(id ,element) {
    $(element).toggleClass("checked");
    todos[getTodoById(id)].completed = !todos[getTodoById(id)].completed;
    save();
}

function newId() { return Math.floor(Math.random() * 999); }
function getTodoById(id) { return todos.findIndex(function(todo) { return todo.id == id;}); }
function save() { localStorage.setItem("todo", JSON.stringify(todos)); }