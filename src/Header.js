import React from 'react'

/*js destructuring obj
const Header = ({title}) => {
 
  return (
    <header>
        <h1> {title} </h1> 
    </header>
  )
}
*/

//jsx
/*const Header = (props) => {
 
  return (
    <header>
        <h1> {props.title} </h1> 
    </header>
  )
}

Header.defaultProps = {
  title: "To do List"
}
export default Header
*/

const Header = ({ title = "To do List" }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
