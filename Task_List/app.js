// define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const filterTask = document.querySelector("#filter");
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');

// load the event listeners
loadEventListener();

function loadEventListener(){

    // get the previously saved tasks
    document.addEventListener('DOMContentLoaded', getTasks);

    // add task event
    form.addEventListener('submit', addTask);

    // remove task event
    taskList.addEventListener('click', removeTask);

    // clear tasks event
    clearBtn.addEventListener('click', clearTasks);

    //filter tasks event
    filterTask.addEventListener('keyup', filterTasks);
}

function getTasks(){

    let tasks;

    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){

        // create a new 'li' element
        const li = document.createElement('li');

        // add new class to the 'li'
        li.className = 'collection-item';

        // add the text to the 'li'
        li.appendChild(document.createTextNode(task));

        // create a link elemnt
        const link = document.createElement('a');

        // add classes
        link.className = 'delete-item secondary-content';

        // add the icon the link
        link.innerHTML = '<i class="fa fa-times"></i>';

        // add the link to the 'li'
        li.appendChild(link);

        // append 'li' to the taskList
        taskList.appendChild(li);

    });
}

// Add task
function addTask(e){

    // check if the input is empty
    if(taskInput.value === ''){
        alert('Task Field Empty!');
    }

    // create a new 'li' element
    const li = document.createElement('li');

    // add new class to the 'li'
    li.className = 'collection-item';

    // add the text to the 'li'
    li.appendChild(document.createTextNode(taskInput.value));

    // create a link elemnt
    const link = document.createElement('a');

    // add classes
    link.className = 'delete-item secondary-content';

    // add the icon the link
    link.innerHTML = '<i class="fa fa-times"></i>';

    // add the link to the 'li'
    li.appendChild(link);

    // append 'li' to the taskList
    taskList.appendChild(li);

    // add the task to local storage
    saveTaskToStorage(taskInput.value);

    //clear the input
    taskInput.value = '';

    e.preventDefault();

}

function saveTaskToStorage(task){

    let tasks;

    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){

    console.log(e.target);

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure You Want To Remove this Item?')){
            e.target.parentElement.parentElement.remove();
            removeTaskfromStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskfromStorage(taskItem){

    let tasks;

    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){

        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e){

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearFromStorage();
}

function clearFromStorage(){
    localStorage.clear();
}

function filterTasks(e){

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){

        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
}
