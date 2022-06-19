// Declaração de variáveis no escopo global da aplicação
const inputElement = document.querySelector('.new-task-input')
const addTaskButton = document.querySelector('.new-task-button')
const tasksContainer = document.querySelector('.tasks-container')
/* ==================================================== */

// Obs.: TODA FUNÇÃO QUE EU CRIAR, OBRIGATORIAMENTE TENHO QUE CHAMÁ-LA PARA SER EXECUTADA, SENÃO NÃO FUNCIONA.

/* ==================================================== */

// Validação do campo de input para quando for adicionar ou não uma tarefa
const validateTaskInput = () => {
  if (inputElement.value.trim().length > 0) {
    return true // tem coisas escritas
  } else {
    return false // não tem nada escrito
  }
}

// const handleInputChange = () => {
//   const inputIsValid = validateTaskInput();

//   if(inputIsValid) {
//     return inputElement.classList.remove("error");
//   }
// }

// inputElement.addEventListener("change", () => handleInputChange());
const addTaskWhenIClickAtButton = () => {
  const inputIsValid = validateTaskInput()

  if (inputIsValid === false) {
    return inputElement.classList.add('error')
  }

  // Adicionando as tarefas via javascript
  // criar os elementos html via javascript
  const taskItemContainer = document.createElement('div')
  taskItemContainer.classList.add('task-item-container')

  const taskContent = document.createElement('p')
  taskContent.innerText = inputElement.value

  const taskIconDelete = document.createElement('i')
  taskIconDelete.classList.add('fa')
  taskIconDelete.classList.add('fa-trash-alt')
  // /criar os elementos html via javascript

  // criar a estrutura html com os elementos
  taskItemContainer.appendChild(taskContent) // p
  taskItemContainer.appendChild(taskIconDelete) // i

  tasksContainer.appendChild(taskItemContainer)
  // /criar a estrutura html com os elementos

  // Riscar e deletar uma tarefa
  // Tarefa concluida
  taskContent.addEventListener('click', () => taskCompleted(taskContent))

  // Tarefa deletada
  taskIconDelete.addEventListener('click', () =>
    taskDeleted(taskItemContainer, taskContent)
  )

  inputElement.value = ''

  updateLocalStorageBrowser()
}

/* ==================================================== */
const handleInputChange = () => {
  const inputIsValid = validateTaskInput()

  if (inputIsValid) {
    return inputElement.classList.remove('error')
  }
}

addTaskButton.addEventListener('click', () => addTaskWhenIClickAtButton())

inputElement.addEventListener('change', () => handleInputChange())

// Nas duas funções abaixo estamos verificando se o item que o usuário está clicando é o mesmo para executar a função de riscar ou deletar a tarefa
const taskCompleted = taskContent => {
  const tasks = tasksContainer.childNodes

  for (const task of tasks) {
    if (task.firstChild.isSameNode(taskContent)) {
      task.firstChild.classList.toggle('completed')
    }
  }
  updateLocalStorageBrowser()
}

const taskDeleted = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes

  for (const task of tasks) {
    if (task.firstChild.isSameNode(taskContent)) {
      taskItemContainer.remove()
    }
  }
  updateLocalStorageBrowser()
}
/* ==================================================== */

// Armazenando as tarefas no Local Storage do nosso navegador
const updateLocalStorageBrowser = () => {
  const tasks = tasksContainer.childNodes

  const localStorageTasks = [...tasks].map(task => {
    const content = task.firstChild
    const isCompleted = content.classList.contains('completed')

    return { description: content.innerText, isCompleted }
  })

  localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}
// /Armazenando as tarefas no Local Storage do nosso navegador

// Trazer as tarefas to LocalStorage do Browser para a minha página do navegador
const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

  if (!tasksFromLocalStorage) return

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item-container')

    const taskContent = document.createElement('p')
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    const taskIconDelete = document.createElement('i')
    taskIconDelete.classList.add('fa')
    taskIconDelete.classList.add('fa-trash-alt')
    // /criar os elementos html via javascript

    // criar a estrutura html com os elementos
    taskItemContainer.appendChild(taskContent) // p
    taskItemContainer.appendChild(taskIconDelete) // i

    tasksContainer.appendChild(taskItemContainer)
    // /criar a estrutura html com os elementos

    // Riscar e deletar uma tarefa
    // Tarefa concluida
    taskContent.addEventListener('click', () => taskCompleted(taskContent))

    // Tarefa deletada
    taskIconDelete.addEventListener('click', () =>
      taskDeleted(taskItemContainer, taskContent)
    )
  }
}

refreshTasksUsingLocalStorage()
