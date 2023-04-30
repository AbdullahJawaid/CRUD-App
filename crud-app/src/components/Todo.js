import React, { useState } from 'react'


//image import
import todo from "../assets/images/todo.svg"


//style
import "./Todo.css"


function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);

  const handleAddItems = () => {
    if (!inputData) {
      alert("please enter a data")
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

  const handleDeleteItem= (index) => {
    const updatedItems=items.filter((currEleme) =>{
      return currEleme.id !== index;
    });
    setItems(updatedItems)

  }

  const handleRemoveAll=()=>{
    setItems([ ]);
  }


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
            <i className="fa fa-plus add-btn" onClick={handleAddItems}></i>
          </div>

          {/* {show our items} */}


          <div className="showItems">
            {items.map((currElem) => {

              return (
                <div className="eachItem" key={currElem.id}>
                  <h3>{currElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn"></i>
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
