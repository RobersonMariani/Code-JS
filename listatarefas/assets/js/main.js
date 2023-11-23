const btnTarefas = document.querySelector('.addTarefa');
const tarefas = document.querySelector('#taskList');
const tarefa = document.querySelector('#tarefa');

document.addEventListener('DOMContentLoaded', function () { //Ao carregar a página chama a função que adiciona as tarefas salva no locaStorage
    addSaveTask();
});

btnTarefas.addEventListener('click', function (e) {// Listener para o botão do form para criar tarefa
    e.preventDefault();
    if (tarefa.value) {
        createTask(tarefa.value, tarefas)
        tarefa.value = '';
        tarefa.focus();
    }
})

document.addEventListener('click', function (e) {// Listener do botão apagar tarefa
    const el = e.target
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        saveTask();
    }
})

function createTask(taskText, ul) {// Cria a tarefa
    const li = document.createElement('li');
    li.innerHTML = taskText;
    createBtn(li);
    ul.appendChild(li);
    saveTask()
}

function createBtn(li) { // Cria o botão de apagar
    const btn = document.createElement('button');
    btn.setAttribute('class', 'apagar');
    btn.setAttribute('title', 'Apagar tarefa');
    btn.innerHTML = 'Apagar';
    li.appendChild(btn);
}

function saveTask() { // Salva a tarefa no localStorage
    const task = document.querySelector('#taskList');
    const taskList = [];
    task.childNodes.forEach(function (item) {
        taskList.push(item.innerText.replace('Apagar', '').trim());
    })
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function addSaveTask() {// Recupera a tarefa do localStorage
    const taskList = JSON.parse(localStorage.getItem('taskList'));
    if (taskList) {
        taskList.forEach(function (item) {
            createTask(item, tarefas)
        })
    }
}
