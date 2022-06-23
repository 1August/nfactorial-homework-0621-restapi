import '../static/css/TodoSearch.css'

export const TodoSearch = ({...props}) => {
    const {
        search,
        handleSearchChange,
        handleSearchSubmit,
        handleResetSearch
    } = props

    return(
        <form
            id={'searchTodo'}
            onSubmit={handleSearchSubmit}
        >
            <input
                id={'searchTodoInput'}
                value={search}
                onChange={handleSearchChange}
                maxLength={'80'}
                type="text"
                placeholder={'Search...'}
                autoComplete={'off'}
            />
            <div className="formBtns">
                <button type="reset" onClick={handleResetSearch}>Reset</button>
                <button type="submit">Search</button>
            </div>
        </form>
    )
}