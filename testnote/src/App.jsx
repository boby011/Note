import React, { useState } from 'react';
import './App.css';
import View from './View';
import axios from 'axios';

function App() {
  const [data, setData] = useState({
    title: '',
    content: ''
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted'); 

    try {
      const response = await axios.post(
        'http://localhost:3000/addNote',data,
      );

      console.log('Response:', response.data); 

      if (response.data) {
        console.log('Note Added Successfully');
        setData({
          title: '',
          content: ''
        });
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="App">
      <h1>Note App</h1>
      <h2>Add Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="cinput-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Enter the Note Title"
            value={data.title}
            onChange={handleChange}
          />
        </div>
        <div className="cinput-group">
          <label>Content:</label>
          <textarea
            id="textarea"
            name="content"
            placeholder="Enter the Note"
            rows="4"
            cols="50"
            value={data.content}
            onChange={handleChange}
          />
        </div>
        <div>
          <button id='btn' type="submit">Add Note</button>
        </div>
      </form>
      <View/>
    </div>
  );
}


export default App;
