import React from 'react'
import { FaTrashAlt } from "react-icons/fa";


const LineItem = ({item, handleCheck,handleDelete,focusInput}) => {


  return (
    <li  className="item">
    <input 
        type ="checkbox"
        onChange={() => handleCheck(item.id)}
        checked = {item.checked}
     />
     <label
          style = {(item.checked)?{textDecoration: 'line-through'}: null}
          onDoubleClick={() => handleCheck
          (item.id)}>{item.item}</label>
          <FaTrashAlt  //React-Icon
            role = "button"
            onClick={ () =>{ handleDelete(item.id);
                focusInput();
               }}
                tabIndex="0"
                 aria-label={`Delete ${item.item}`} //useful for screen readers//
     />
  
  </li>
  )
}

export default LineItem