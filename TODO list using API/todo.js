let tasks = [];
const taskslist = document.getElementById('list');
const addtaskinput = document.getElementById('add');
const taskscounter = document.getElementById('tasks-counter');

function fetchtodos() {
  //GET request
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      tasks = data.slice(0, 10);
      renderlist();
    })
    .catch(function (error) {
      console.log('error', error);
    })

}

function addtasktodom(task) {
  const li = document.createElement('li');
  li.innerHTML = `

            <input type="checkbox" id="${task.id}"  ${task.completed ? 'checked' : ' '}  class="custom-checkbox">
            <label for="${task.id}">${task.title}</label>
            <img src="bin.png" class="delete" data-id="${task.id}" />
          
`;
  taskslist.append(li);

}

function renderlist() {
  taskslist.innerHTML = ' ';
  for (let i = 0; i < tasks.length; i++) {
    addtasktodom(tasks[i]);
  }
  taskscounter.innerHTML = tasks.length;
}

function toggletask(taskid) {
  const task = tasks.filter(function (task) { //fiterfunction always returns an array
    return task.id === Number(taskid);
  });
  if (task.length > 0) {
    const currenttask = task[0];
    currenttask.completed = !currenttask.completed; //revertback what the task was if true then false and if false then true;
    renderlist();
    shownotification('Task toggled successfully');
    return;
  }
  shownotification('Could not toggle the task');

}

function deletetask(taskid) {
  const newtasks = tasks.filter(function (task) {
    return task.id !== taskid;
  });
  tasks = newtasks;
  renderlist();
  shownotification('Task deleted Successfully');

}

function addtask(task) {
  if (task) {
    tasks.push(task);
    renderlist();
    shownotification('Task Added Successfully');
    return;
  }
  shownotification('Task Cannot be added');
}

function shownotification(text) {
  alert(text);
}

function handleinputkeypress(e) {
  if (e.key === 'Enter') {
    const text = e.target.value;

    if (!text) {
      shownotification('Task Text can not be empty');
      return;
    }
    const task = {
      title: text,
      id: Date.now(),
      completed: false
    }
    e.target.value = '';
    addtask(task);
  }

}


function handleclicklistener(e) {
  const target = e.target;
  if (target.className == 'delete') {
    const taskid = target.dataset.id;
    deletetask(taskid);
    return;
  }
  else if (target.className == 'custom-checkbox') {
    const taskid = target.id;
    console.log(taskid);
    toggletask(taskid);
    return;
  }
}

function initializeapp() {
  fetchtodos();
  addtaskinput.addEventListener('keyup', handleinputkeypress);

  document.addEventListener('click', handleclicklistener);

}

initializeapp();