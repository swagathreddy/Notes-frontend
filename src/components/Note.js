import React from "react";
import "../styles/Note.css"

function Note({ note, onDelete, onToggleComplete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className={`note-container ${note.completed ? 'completed' : ''}`}>
            <div className="note-content-wrapper">
                <p className={`note-title ${note.completed ? 'line-through' : ''}`}>{note.title}</p>
                <p className={`note-content ${note.completed ? 'line-through' : ''}`}>{note.content}</p>
                <p className="note-date">{formattedDate}</p>
            </div>
            <div className="note-actions">
                <button 
                    className={`complete-button ${note.completed ? 'bg-green-500' : 'bg-gray-500'} text-white py-1 px-3 rounded mr-2`}
                    onClick={() => onToggleComplete(note.id, !note.completed)}
                >
                    {note.completed ? 'Completed' : 'Mark Complete'}
                </button>
                <button 
                    className="delete-button bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => onDelete(note.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Note