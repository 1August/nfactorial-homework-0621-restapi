import '../static/css/TodoItem.css'

import changeIcon from '../static/img/write.png'
import deleteIcon from '../static/img/delete.png'
import {useEffect, useRef, useState} from "react";

export const TodoItem = ({el, handleTodoItemClick, handleTitleChange, changeDataChanging, ...props}) => {
    const {_id, title, deadline} = el

    const [normalDate, setNormalDate] = useState('No deadline')

    const inputRef = useRef(null)

    const [isReadonly, setIsReadonly] = useState(true)
    const [dataChanging, setDataChanging] = useState(false)

    useEffect(() => {
        if (!deadline) return

        let date = new Date(deadline)
        let dd = date.getDate()
        let mm = date.getMonth() + 1
        let yyyy = date.getFullYear()

        if (dd < 10) dd = `0${dd}`
        if (mm < 10) mm = `0${mm}`

        setNormalDate(`${dd}-${mm}-${yyyy}`)
    }, [])

    return (
        <div className={'todoItem'}>
            <input value={title || 'List item'} ref={inputRef} readOnly={isReadonly}
                   onChange={e => handleTitleChange(e, el)}/>
            <p>{normalDate}</p>
            <div className="todoItemBtns">
                <img className="changeBtn" src={changeIcon}
                     onClick={e => handleTodoItemClick({e, el, inputRef, setIsReadonly, setDataChanging})}
                     data-btn={'change'} data-changing={dataChanging}/>
                <img className="changeBtn" src={deleteIcon} onClick={e => handleTodoItemClick({e, el})}
                     data-btn={'delete'}/>
            </div>
        </div>
    )
}