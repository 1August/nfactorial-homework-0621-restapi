import {TodoItem} from "./TodoItem";

export const TodoList = ({...props}) => {
    const {
        loading,
        todo,
        handleTodoItemClick,
        handleTitleChange
    } = props

    return(
        <section id={'todoList'}>
            {
                loading ?
                    <h1>Loading...</h1> :
                    (todo.length > 0 && todo.map(el => (
                        <TodoItem
                            key={el._id}
                            el={el}
                            handleTodoItemClick={handleTodoItemClick}
                            handleTitleChange={handleTitleChange}
                        />
                    ))) || (<h1>You have no tasks.</h1>)
            }
        </section>
    )
}