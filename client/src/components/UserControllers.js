import {TodoAdd} from "./TodoAdd";
import {TodoSearch} from "./TodoSearch";

export const UserControllers = ({...props}) => {
    const {
        todoAddInput,
        todoAddDate,
        handleItemSubmit,
        handleInputChange,
        handleDateInputChange,
        search,
        handleResetSearch,
        handleSearchSubmit,
        handleSearchChange
    } = props

    return(
        <section id={'userControllers'}>
            <div className={'todoBlock forms'}>
                <TodoAdd
                    todoAddInput={todoAddInput}
                    todoAddDate={todoAddDate}
                    handleItemSubmit={handleItemSubmit}
                    handleInputChange={handleInputChange}
                    handleDateInputChange={handleDateInputChange}
                />
                <TodoSearch
                    search={search}
                    handleResetSearch={handleResetSearch}
                    handleSearchSubmit={handleSearchSubmit}
                    handleSearchChange={handleSearchChange}
                />
            </div>
        </section>
    )
}