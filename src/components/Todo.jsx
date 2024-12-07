
function Todo({ id, name, completed, toggleTaskCompleted, deleteTask, editTask }) {
  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input id={id} type="checkbox" defaultChecked={completed} onChange={() => toggleTaskCompleted(id)} />
        <label className="todo-label" htmlFor={id}>{name}</label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => editTask(id, name)}>Edit</button>
        <button type="button" className="btn btn__danger" onClick={() => deleteTask(id)}>Delete</button>
      </div>
    </li>
  )
}

export default Todo
