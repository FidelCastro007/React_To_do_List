import React from 'react'
import LineItem from './LineItem'


const ItemsList = ({items, handleCheck, handleDelete,focusInput,inputRef}) => {
  return (
    <ul>
    {items.map((item) => (
    <LineItem 
    key={item.id}
    item={item}
    handleCheck={handleCheck}
    handleDelete={handleDelete}
    focusInput= {focusInput}
          inputRef = {inputRef}
    />
    ))}
  </ul>
  )
}

export default ItemsList