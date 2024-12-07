
import { useState } from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'

function App({ _tasks }) {

  function addTask(name) {
    const id = crypto.randomUUID()
    const newTask = { id, name, completed: false }
    setTasks([...tasks, newTask])
  }

  function toggleTaskCompleted(id) {
    setTasks(tasks.map(task => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task
    }))
  }

  function editTask(id, newName) {
    setTasks(tasks.map(task => {
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task
    }))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const [tasks, setTasks] = useState(_tasks)
  const headingText = `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} remaining`

  const taskList = tasks?.map(task => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed} 
      key={task.id} 
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
      <FilterButton name="all" />
        <FilterButton name="active" />
        <FilterButton name="completed" />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
