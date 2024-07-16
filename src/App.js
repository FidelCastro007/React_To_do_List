/*
import logo from './logo.svg';
import './App.css';


<header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<p>
  Edit <code>src/App.js</code> and save to reload.
</p>
<p> SUscribe to ggm </p>
<a
  className="App-link"
  href="https://reactjs.org"
  target="_blank"
  rel="noopener noreferrer"
>
  Learn React
</a>
</header>
*/
//JSX - javascript & Xml (file)
import Content from "./Content";
import { useState, useRef, useEffect} from 'react';
import Header from "./Header";
import Footer from "./Footers";
import Additem from "./Additem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";
//<Header /> means Components

//Props
/*passing parameters in components is props like func "paras"

//Props Drilling
Drilling means info pass parent to child like "header to content to footer to header (link)"
It can't be happen child to child resource sharing like "footer & Content => (This case possible when the resources are provided by parent then child & other child can mutually share their resources)" but parent to child is possible like "app & footer"
*/
function App() {

  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const inputRef = useRef()
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  //useeffect means once code completely done then useeffect load with dependency lisit that list's value once change it varies otherwise it's constant//

 // console.log("Before UseEffect")

  useEffect(() => { 
    const fetchItems = async () => {
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Data not recieved")
        const listItems = await response.json();
        console.log(listItems)
        setItems(listItems)
        setFetchError(null)
      } catch (err){
        setFetchError(err.message)
      } finally{
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      (async () => await fetchItems())()
    },1000)
  }, [])

 // console.log("After UseEffect")


 /*focus logic
 //useRef in both states or more that can handle focus easily in simple manner
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Ensure autofocus on mount
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount
  // && means checking both states as true
  */

  const addItem = async (item) => {
    const id = items.length ? parseInt(items[items.length - 1].id, 10) + 1 : 1;
    console.log(`New item ID: ${id}`); // Logging the new ID
    const addNewItem = {id, checked:false, item}
    const listItems = [...items, addNewItem]
    setItems(listItems)

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addNewItem)
    }

    const result = await apiRequest(API_URL,postOptions)
    if(result) setFetchError(result)
  }

  const handleCheck = async (id) => {
    console.log(`Handling check for ID: ${id}`);
    
    try {
      const updatedItems = items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      setItems(updatedItems);
      
      const myItem = updatedItems.find(item => item.id === id);
  
      const updateOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ checked: myItem.checked })
      };
  
      const reqUrl = `${API_URL}/${id}`;
      console.log("PATCH request URL:", reqUrl);
      
      const result = await apiRequest(reqUrl, updateOptions);
      if (result) {
        setFetchError(result);
      }
    } catch (error) {
      console.error("Error updating item:", error.message);
      setFetchError(error.message);
    }
  };

  const handleDelete = async (id) => {
    console.log(`Handling delete for ID: ${id}`);
    
    try {
      const reqUrl = `${API_URL}/${id}`;
      console.log("DELETE request URL:", reqUrl);
      
      const deleteOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const result = await apiRequest(reqUrl, deleteOptions);
      if (result) {
        setFetchError(result);
      } else {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
      }
    } catch (error) {
      console.error("Error deleting item:", error.message);
      setFetchError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return;
    console.log(newItem)
    addItem(newItem)
    setNewItem('')
  }

  /*const updateItems = (newItems) => {
    setItems(newItems)  ;
    localStorage.setItem("todo_list",JSON.stringify(newItems))
  }*/

  const focusInput = () => {
    if(inputRef.current){
      inputRef.current.focus();
  }
}
  
  return (
    <div className="App">
          <Header title = "GGM's To do List"/> 
          <Additem
          newItem = {newItem}
          setNewItem = {setNewItem}
          handleSubmit = {handleSubmit}
          focusInput= {focusInput}
          inputRef = {inputRef}
          />
          <SearchItem
          search = {search}
          setSearch = {setSearch}
          />
          <main>
            {isLoading && <p> Loading items... </p>}
            {fetchError && <p> {`Error: ${fetchError}`}</p>}
          {!isLoading && !fetchError && <Content
            items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            focusInput= {focusInput}
          inputRef = {inputRef}
          />}
          </main>
          <Footer 
            length = {items.length}
          />
    </div>
  );
}

export default App;
