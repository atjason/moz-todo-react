
function Todo({ id, name, completed }) {
  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input id={id} type="checkbox" defaultChecked={completed} />
        <label className="todo-label" htmlFor={id}>{name}</label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn">Edit</button>
        <button type="button" className="btn btn__danger">Delete</button>
      </div>
    </li>
  )
}

export default Todo
