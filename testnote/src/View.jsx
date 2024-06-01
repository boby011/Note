import React, { useEffect, useState } from 'react';
import axios from 'axios';

const View = () => {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [editData, setEditData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = (note) => {
    setEditNote(note._id);
    setEditData({ title: note.title, content: note.content });
  };

  const handleEditChange = (event) => {
    setEditData({ ...editData, [event.target.name]: event.target.value });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/notes/${editNote}`, editData);
      setNotes(notes.map(note => (note._id === editNote ? response.data : note)));
      setEditNote(null);
      setEditData({ title: '', content: '' });
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            {editNote === note._id ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                />
                <textarea
                  name="content"
                  value={editData.content}
                  onChange={handleEditChange}
                />
                <button type="submit">Save</button>
                <button onClick={() => setEditNote(null)}>Cancel</button>
              </form>
            ) : (
              <div>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <button onClick={() => handleEdit(note)}>Edit</button>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default View;
