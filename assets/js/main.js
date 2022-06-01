const newTask = document.querySelector('.newTask');
const btnNewTask = document.querySelector('.btnNewTask');
const tasks = document.querySelector('.tasks');

function criaLi() {
  const li = document.createElement('li');
  return li;
}

newTask.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!newTask.value) return;
    criaTarefa(newTask.value);
  }
});

function limpaInput() {
  newTask.value = '';
  newTask.focus();
}

function criaBotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  tasks.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

btnNewTask.addEventListener('click', function() {
  if (!newTask.value) return;
  criaTarefa(newTask.value);
});

document.addEventListener('click', function(e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = tasks.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tasksJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tasksJSON);
}

function adicionaTarefasSalvas() {
  const tasks = localStorage.getItem('tasks');
  const listaDeTarefas = JSON.parse(tasks);

  for(let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();
