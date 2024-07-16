import React from 'react';

import ItemsList from './ItemsList';
//we can't use the hooks in class components or legacy 
/*if(true){
  useState();
}
  useState()
  useState()
  useState() //Don't use hooks while using conditional statements of *same order ()gottcha//
  const [name, setName] = useState({count:99, text:"like"}) 
  //Don't use obj like this in useState hook
*/

//Begineer lvl 1 react
/*
const Content = () => {

  const [name, setName] = useState("Earn")
    function handleNameChange() {
        const names = ["Earn", "Grow", "Give"];
        const int = Math.floor(Math.random()*3);
        setName(names[int])
      }

      const handleClick = (e) =>{
        console.log(e.target.innerText)
      }
      const handleClick2 = (name) =>{
        console.log(`Thanks for the support ${name}`)
      }
      

      function name1(){
        return console.log("visit GGM.in")
      }

      const [count, setCount] = useState(99);
      //const [name, setName] = useState(() => name1());

      function incrementFunction () {
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1) //Don't use like this
        
        //use like this
        setCount((prevcount) => {return prevcount +1})
      }
      function decrementFunction (){
        setCount((prevcount) => {return prevcount -1})
      }

  return (
    <main>
        <p > Lets {name} Money </p>
        <button onClick={handleNameChange}> Subscribe </button>
        <button onClick={decrementFunction}>-</button>
        <span>{count}</span>
        <button onClick={incrementFunction}>+</button>
    </main>
  )
}
*/

//list and key 
// <> fragments

const Content = ( {items, handleCheck, handleDelete,focusInput,inputRef}) => {

  return (
    <> 
      {(items.length)? (
        <ItemsList
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        focusInput= {focusInput}
          inputRef = {inputRef}
        />
  
      ): (
        <p style={{
          marginRight:'100px',
          marginTop: '70px',
          margin: '2rem',
          color: 'red'
        }}> Your List is Empty</p>
      )}
    </>
  )
}
export default Content;