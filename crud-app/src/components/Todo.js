import React, { useEffect, useState } from 'react'


//image import
import todo from "../assets/images/todo.svg"


//style
import "./Todo.css"
const getLocalData=() =>{
  const list=localStorage.getItem("myTodoList");

  if(list){
    return JSON.parse(list);
  }
  else{
    return [];
  }
}


function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItems,setIsEditItems]=useState(" ");
  const [toogleButton,setToogleButton]=useState(false);

  const handleAddItems = () => {
    if (!inputData) {
      alert("please enter a data")
    }
    else if (inputData && toogleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItems) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItems(null);
      setToogleButton(false);
    }
    else {
      const myNewInputData={
        id: new Date().getTime().toString(),
        name:inputData,
      }
      setItems([...items, myNewInputData]);
      setInputData(" ")
    }
  }

  const handleEditItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItems(index);
    setToogleButton(true);
  };

  const handleDeleteItem= (index) => {
    const updatedItems=items.find((currElem) =>{
      return currElem.id !== index;
    });
    setItems(updatedItems)

  }

  const handleRemoveAll=()=>{
    setItems([ ]);
  }


  useEffect(() =>{
    localStorage.setItem("myTodoList",JSON.stringify(items))
  },[items])


  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="img" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder='Add Items'
              className='form-control'
              onChange={(e) => setInputData(e.target.value)}
              value={inputData}
            />
            {toogleButton ? (
              
              <i className="far fa-edit add-btn"
              onClick={handleAddItems}>
              </i>
            ):
            <i className="fa fa-plus add-btn" 
            onClick={handleAddItems}>
            </i>

            }
            
          </div>

          {/* {show our items} */}


          <div className="showItems">
            {items.map((currElem) => {
              return (
                <div className="eachItem" key={currElem.id}>
                  <h3>{currElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn"
                    onClick={()=> handleEditItem(currElem.id)}
                    ></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => handleDeleteItem(currElem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={handleRemoveAll}>
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo
