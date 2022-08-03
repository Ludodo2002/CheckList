const todos = [];
const placeholder = [
    {"id":newId(),"title": "Nom de la variable ?", "completed": false},
    {"id":newId(),"title": "Bonne variable ?", "completed": false},
    {"id":newId(),"title": "Bon fichier ?", "completed": false},
    {"id":newId(),"title": "Tout sur git ?", "completed": false},
    {"id":newId(),"title": "Git commit/push fait ?", "completed": false},
        {"id":newId(),"title": "Norminette ?", "completed": false},

]

function sendMessages(){
    const request = new XMLHttpRequest();
      request.open("POST", "https://discord.com/api/webhooks/1003575670254862386/A65STpIOjkUAQPLLC-hWUQhvVOt95THzwvJu7ZgIYfNwlmgSQ4tR7w_Zk4BmriujJN7a");

      request.setRequestHeader('Content-type', 'application/json');

      const params = {
        username: "Site web",
        avatar_url: "",
        content: "Une personne vient de ce connecter au site"
      }

      request.send(JSON.stringify(params));
    }
function setup() {
    if (localStorage.getItem("todo")) load(JSON.parse(localStorage.getItem("todo")));
    else load(placeholder);
    $("#addForm").on("submit", (e)=>{
        e.preventDefault();
        addInput();
    });
    $("#newTodoBtn").on("click", (e)=>{
        addInput();
    });
    $("#resetTodo").on("click", (e)=>{
        reset();
    });
    sendMessages();
}

function addInput() {
    addTodo($("#newTodoInput").val());
    $("#newTodoInput").val("");
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
    let deleteBtn = $(`<span class="close">\u00D7</span>`);
    deleteBtn.on("click", ()=>{ deleteTodo(todo.id, todoElement); });
    deleteBtn.appendTo(todoElement);
    todos.push(todo);
    return todoElement;
}

function addTodo(title) {
    if(title == ''){
        alert('Le titre est invalide.');
        return;
    }else {
        let todo = { id: newId(), title: title, completed: false };
        $("ul#list").append(createTodo(todo));
        save();
    }
    
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

function reset(){
   localStorage.clear();
   location.reload();
    console.log('test');
}

function newId() { return Math.floor(Math.random() * 999); }
function getTodoById(id) { return todos.findIndex(function(todo) { return todo.id == id;}); }
function save() { localStorage.setItem("todo", JSON.stringify(todos)); }
