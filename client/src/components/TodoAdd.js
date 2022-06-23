import '../static/css/TodoAdd.css'
import {useEffect, useState} from "react"

export const TodoAdd = (props) => {

    const {
        handleItemSubmit,
        handleInputChange,
        handleDateInputChange,
        todoAddInput,
        todoAddDate
    } = props

    const [today, setToday] = useState('')

    useEffect(() => {
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        let yyyy = today.getFullYear()

        if (dd < 10) dd = `0${dd}`
        if (mm < 10) mm = `0${mm}`

        setToday(`${yyyy}-${mm}-${dd}`)
    }, [])

    return(
        <form
            id={'addTodo'}
            onSubmit={handleItemSubmit}
        >
            <input
                id={'addTodoInput'}
                value={todoAddInput}
                onChange={handleInputChange}
                maxLength={'80'}
                type="text"
                placeholder={'Add Todo'}
                autoComplete={'off'}
                required={true}
            />
            <input
                type="date"
                value={todoAddDate}
                min={today}
                onChange={handleDateInputChange}
            />
            <div className="formBtns">
                <button type="submit">Add</button>
            </div>
        </form>
    )
}