// 1º Vamos pegar os elementos que queremos utilizar e guardar em variáveis
const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');

// 13º criar uma cariável para pegar a div com a classe tasks-container
const tasksContainer = document.querySelector('.tasks-container');

// 2º Vamos fazer a validação do input, onde se estiver vazio (sem valor), vamos adicionar a borda vermelha
const validateInput = () => {  
  return inputElement.value.trim().length > 0;
}

// 3º Vamos add um evento de click no botão para capturar quando o usuário clicar com o mouse para add uma tarefa
addTaskButton.addEventListener('click', () => handleAddTask());

// 4º Vamos criar uma função para adicionar as tarefas e nessa função, vamos validar nosso input
function handleAddTask() {
  const inputIsValid = validateInput();

  if(!inputIsValid) {
    return inputElement.classList.add('error');
  } 

  // 6º Criar o container tasks-item com o javascript que terá todas as tarefas criadas
  const taskItemContainer = document.createElement('div')
  taskItemContainer.classList.add('task-item')

  // 7º Criar o parágrafo que terá a tarefa a ser realizada
  const taskContent = document.createElement('p');
  taskContent.innerText = inputElement.value;

  // 8º Criar um container para adicionar os ícones
  const iconContainer = document.createElement('div');
  iconContainer.classList.add('task-icon-container');

  // 9º Vamos criar o ícone com o botão de checked
  const checkItemDone = document.createElement('i'); // check-box
  checkItemDone.classList.add('fa');
  checkItemDone.classList.add('fa-check-square'); 
  checkItemDone.classList.add('icon');

  // 10º Vamos criar o ícone com a lixeira
  const deleteItem = document.createElement('i'); // lata de lixo
  deleteItem.classList.add('fa');
  deleteItem.classList.add('fa-trash-alt');
  deleteItem.classList.add('icon');

  // 11º Vamos colocar os ícones criados dentro do iconContainer
  iconContainer.appendChild(checkItemDone);
  iconContainer.appendChild(deleteItem);

  // 12º Vamos colocar todos os elementos criados dentro do seu pai, no caso o taskItemContainer
  taskItemContainer.appendChild(taskContent); // p
  taskItemContainer.appendChild(iconContainer); // i

  // 14º Precisamos colocar a tasksItemContainer dentro da div tasks-container no html, mas antes temos que criar uma variável (13º)
  tasksContainer.appendChild(taskItemContainer);
}

// 5º Precisamos tirar a borda vermelha quando começarmos a digitar algo e para isso adicionar um evento de escutar mudanças no input
const handleInputChange = () => {
  const inputIsValid = validateInput();
  
  if(inputIsValid) {
    return inputElement.classList.remove('error');
  }    
}

inputElement.addEventListener('change', () => handleInputChange());