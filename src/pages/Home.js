import React from 'react';
import { useState, useEffect } from "react";
import core from "../core";
import Note from "../components/Note";
import Header from "../components/Header";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        core
            .get("/core/notes/", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then((res) => res.data)
            .then((data) => {
                // Sort notes by date in descending order (newest first)
                const sortedNotes = data.sort((a, b) => {
                    const dateA = new Date(a.created_at);
                    const dateB = new Date(b.created_at);
                    return dateB - dateA;
                });
                setNotes(sortedNotes);
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    window.location.href = '/login';
                } else {
                    alert('Error fetching notes');
                }
            });
    };

    const [isLoading, setIsLoading] = useState(false);


    const deleteNote = (id) => {
        setIsLoading(true);
        core
            .delete(`/core/notes/delete/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then((res) => {
                if (res.status === 204) {
                    // Update state directly instead of refetching
                    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
                    alert("Note deleted!");
                }
                else alert("Failed to delete note.");
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    window.location.href = '/login';
                } else {
                    alert('Error deleting note');
                }
            })
            .finally(() => setIsLoading(false));
    };

    const toggleNoteComplete = (id, completed) => {
        core
            .patch(`/core/notes/${id}/`, 
                { completed },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    // Update notes while maintaining sort order
                    setNotes(prevNotes => {
                        const updatedNotes = prevNotes.map(note => 
                            note.id === id ? { ...note, completed } : note
                        );
                        return updatedNotes.sort((a, b) => {
                            const dateA = new Date(a.created_at);
                            const dateB = new Date(b.created_at);
                            return dateB - dateA;
                        });
                    });
                } else {
                    alert("Failed to update note status.");
                }
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    window.location.href = '/login';
                } else {
                    alert('Error updating note');
                }
            });
    };

    const createNote = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const newNote = { content, title, completed: false };
        
        core
            .post("/core/notes/", newNote, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then((res) => {
                if (res.status === 201) {
                    // Update state directly instead of refetching
                    setNotes(prevNotes => [res.data, ...prevNotes]);
                    setContent("");
                    setTitle("");
                    alert("Note created!");
                }
                else alert("Failed to make note.");
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    window.location.href = '/login';
                } else {
                    alert('Error creating note');
                }
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <div className="notes-container">
                <div className="notes-list">
                    <h2 className="section-title">Your Notes</h2>
                    <div className="notes-scroll">
                        {notes.map((note) => (
                            <Note 
                                note={note} 
                                onDelete={deleteNote} 
                                onToggleComplete={toggleNoteComplete}
                                key={note.id} 
                            />
                        ))}
                    </div>
                </div>
                
                <div className="create-note">
                    <h2 className="section-title">Create a Note</h2>
                    <form onSubmit={createNote} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                className="w-full p-2 rounded input-field"
                                placeholder="Enter note title..."
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="form-label">Content</label>
                            <textarea
                                id="content"
                                name="content"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full p-2 rounded input-field h-32"
                                placeholder="Enter note content..."
                            ></textarea>
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-2 px-4 rounded submit-button"
                        >
                            Create Note
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;
