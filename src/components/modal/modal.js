import React from 'react';
import './modal.css';


const Modal = ({setOpenModal, idOfItemToDelete, setIdOfItemToDelete, deleteComment, removeBug, deleteProject, item}) => {

    const cancelDeletion = () => {
        setOpenModal(false);
    }


    const deleteItem = () => {
        if(item === 'bug') {
            removeBug(idOfItemToDelete);
        }
        if(item === 'comment') {
            deleteComment(idOfItemToDelete);
        }
        if(item === 'project') {
            deleteProject(idOfItemToDelete)
        }
        setOpenModal(false);
        setIdOfItemToDelete('');
    }

    
  return (
    <div className='modal-outer-container'>
        <div className='modal-inner-container'>
            <div className='modal-exit-btn'><button onClick={() => cancelDeletion()}>x</button></div>
            <div className='modal-text'>Are you sure you want to delete?</div>
            <div className='modal-confirm-btn'><button onClick={() => cancelDeletion()}>Cancel</button> <button style={{background: 'red'}} onClick={() => deleteItem()}>Delete</button></div>
        </div>
    </div>
  )
}

export default Modal