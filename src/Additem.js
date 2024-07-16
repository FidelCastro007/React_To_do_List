import React from 'react'
import { FaPlus } from 'react-icons/fa'


//useRef means shifting focus on current action

const Additem = ({newItem, setNewItem, handleSubmit,focusInput,inputRef}) => {


  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor="addItem"> Add Item</label>
        <input 
            autoFocus
            ref={inputRef}
            id='addItem'
            type="text"
            placeholder='Add Item'
            required
            value = {newItem}
            onChange={ (e) => setNewItem(e.target.value)}
        />
        <button
            type='submit'
            aria-label='Add Item'
            onClick={() => focusInput()}
        >
            <FaPlus />

        </button>
    </form>
  )
}

export default Additem