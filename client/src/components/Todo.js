import '../static/css/Todo.css'

import {useEffect, useState} from "react"

import {useHttp} from "../hook/http.hook"
import {UserControllers} from "./UserControllers"
import {TodoList} from "./TodoList"

export const Todo = () => {
    const BACKEND_URL = 'http://localhost:5000'

    const [todo, setTodo] = useState([])
    const [todoAddInput, setTodoAddInput] = useState('')
    const [todoAddDate, setTodoAddDate] = useState('')

    const [search, setSearch] = useState('')

    // useHttp
    const {loading, error, request, clearError} = useHttp()

    // Functions
    const getTodos = async () => {
        const url = `${BACKEND_URL}/todo`
        return await request(url)
    }

    const handleInputChange = e => {
        setTodoAddInput(e.target.value)
    }

    const handleDateInputChange = e => {
        setTodoAddDate(e.target.value)
    }

    const handleItemSubmit = async e => {
        e.preventDefault()

        const url = `${BACKEND_URL}/todo`
        const res = await request(url, 'POST', {title: todoAddInput, deadline: todoAddDate})
        setTodo([...todo, res])
        setTodoAddInput('')
    }

    const handleTodoItemClick = async ({e, el: btn, inputRef, setIsReadonly, setDataChanging}) => {
        const btnAction = e.target.dataset.btn

        if (btnAction === 'delete') {
            const url = `${BACKEND_URL}/todo?id=${btn._id}`
            const res = await request(url, 'DELETE')
            setTodo(todo.filter(el => el._id !== btn._id))
        } else if (btnAction === 'change') {
            const isChanging = e.target.dataset.changing
            if (isChanging === 'true'){
                setDataChanging(false)
                const url = `${BACKEND_URL}/todo`
                const res = await request(url, 'PUT', {id: btn._id, title: btn.title})
                setIsReadonly(true)
            } else {
                setDataChanging(true)
                setIsReadonly(false)
                inputRef.current.focus()
            }
        }
    }

    const handleTitleChange = async (e, input) => {
        setTodo(todo.map(el => el._id === input._id ? {...el, title: e.target.value} : el))
    }

    const handleSearchChange = e => {
        setSearch(e.target.value)
    }

    const handleSearchSubmit = e => {
        e.preventDefault()

        getTodos().then(todos => todos.filter(el => el.title.includes(search))).then(todos => setTodo(todos))
    }

    // useEffect
    useEffect(() => {
        if (search === '') {
            getTodos().then(todo => {
                setTodo(todo)
            })
        }
    }, [search])

    const handleResetSearch = () => {
        setSearch('')
    }

    return (
        <main id={'todo'} className={'main'}>
            <div className={'container'}>
                <h1>Todo list</h1>
                <UserControllers
                    todoAddInput={todoAddInput}
                    todoAddDate={todoAddDate}
                    handleItemSubmit={handleItemSubmit}
                    handleInputChange={handleInputChange}
                    handleDateInputChange={handleDateInputChange}
                    search={search}
                    handleResetSearch={handleResetSearch}
                    handleSearchSubmit={handleSearchSubmit}
                    handleSearchChange={handleSearchChange}
                />
                <TodoList
                    loading={loading}
                    todo={todo}
                    handleTodoItemClick={handleTodoItemClick}
                    handleTitleChange={handleTitleChange}
                />
            </div>
        </main>
    )
}