import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      // add logic to fetch items from database
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  return (
    <div className="todo-list-container">
      <h2>To-do List</h2>

      <ul className="todo-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div className="add-item">
        <input
          type="text"
          value={newItem}
          onChange={handleInputChange}
          placeholder="Enter a new item"
        />
        <button onClick={handleAddItem}>+</button>
      </div>
    </div>
  );
};

export default TodoList;
