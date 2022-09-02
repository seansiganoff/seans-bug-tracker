import React, {useState, useEffect} from 'react';
import './updateBug.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { onAddBugComment, onDeleteComment, onRemoveBug} from '../../api/auth';
import Modal from '../../modal/modal';


const UpdateBug = ({userInfo}) => {
    //Grabs the bug info from the last page
    const location = useLocation();
    const {getBug} = location.state;
    let bug = getBug;
    // sets the string for the success and error message
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    //the fetch request for the comments are put in the bugComments 
    const [bugComments, setBugComments] = useState([{}])
    //this is what the user types in
    const [input, setInput] = useState({bug_id: bug.bug_id, user_name: userInfo[0].first_name + ' ' + userInfo[0].last_name, comment: ''});
    const navigate = useNavigate();
    //modal for deleting comments and bugs
    const [openModal, setOpenModal] = useState(false);
    const [idOfItemToDelete, setIdOfItemToDelete] = useState('')
    const [item, setItem] = useState('');



    /////////////////////////////////////////////////////////// fetch request for comments ///////////////////////////////////////
    const getBugComments = async () => {
        try {
            fetch('https://seans-bug-tracker.herokuapp.com/api/dashboard/get-bug-comments')
          .then(res => res.json())
          .then(data => {
            setBugComments(data.filter(comments => comments.bug_id === bug.bug_id))
          }) 
            
        } catch (error) {
            console.error(error.message)
        }
    }

    
    //////////////////////////////////////////////////// changes user input /////////////////////////////////////
    const onChangeInput = (e) => {
        e.preventDefault();
        setInput({...input, [e.target.name]: e.target.value })
    }


    /////////////////////////////////////////////// submits the comment //////////////////////////////////////////
    const onSubmitComment = async (e) => {
        e.preventDefault();
        try {
            const {data} = await onAddBugComment(input);
            setInput({bug_id: bug.bug_id, user_name: bug.assigned_to, comment: ''})
            setErrorMessage('')
            setSuccessMessage(data.message)
        } catch (error) {
            console.log(error.message)
        }
        setTimeout(() => {
           setSuccessMessage('')
           setErrorMessage('') 
        }, 3000);
    }


    ////////////////////////////////////// invokes the modal to confirm deletion of bug or comment ////////////////////////////////////
    const confirmDeleteComment = (id) => {
        setItem('comment')
        setIdOfItemToDelete(id)
        setOpenModal(true);
    }

    const confirmDeleteBug = (id) => {
        setItem('bug')
        setIdOfItemToDelete(id);
        setOpenModal(true);
    }

    ////////////////////////////////////////////////// deletes the comment /////////////////////////////////////////
    const deleteComment = async (id) => {
        try {
            const {data} = await onDeleteComment(id)
            setErrorMessage('');
            setSuccessMessage(data.message);
            setTimeout(() => {
                setErrorMessage('')
                setSuccessMessage('')
            }, 3000);
        } catch (error) {
            console.error(error.message)
        }
    }


    //////////////////////////////////////////////// deletes the bug /////////////////////////////////////
    const removeBug = async (bugId) => {
        if(bugComments.length > 0) {
            setErrorMessage('All comments must be deleted before you can delete a bug!')
            setTimeout(() => {
                setErrorMessage('')
                setSuccessMessage('')
            }, 3000);
            return 
        }
        try {
            const {data} = await onRemoveBug(bugId);
            if(data) {
                setErrorMessage('')
                setSuccessMessage('This bug has been deleted!');
                navigate('/dashboard')
            }
        } catch (error) {
            console.error(error.message)
        }
        setTimeout(() => {
            setErrorMessage('')
            setSuccessMessage('')
        }, 3000)
        
    }
    
    useEffect(() => {
        getBugComments()
    }, [successMessage])


  return (
    <div className='update-bug-container'>
        <div className='update-bug-overlay'>

        {/* //////////////////////////////////////////// Modal for delete button ////////////////////////////////////////////////////// */}
        {openModal && <Modal setOpenModal={setOpenModal} idOfItemToDelete={idOfItemToDelete} setIdOfItemToDelete={setIdOfItemToDelete} deleteComment={deleteComment} removeBug={removeBug} item={item}/>}
            
                <div className='update-bug-div' >
                    <div className='update-bug-div-banner'>
                        <div>
                            <span style={{color: 'black'}}>PROJECT NAME:</span> {bug.project_name}
                        </div>
                        <div>
                            <span style={{color: 'black'}}>BUG ID:</span> {bug.bug_id}
                        </div>
                        <div>
                            <button className='update-bug-delete-btn' onClick={() => confirmDeleteBug(bug.bug_id)}>Delete</button>
                        </div>
                    </div>
                    <div className='update-bug-list'><span>Created By:</span> {bug.assigned_to}</div>
                    <div className='update-bug-list'><span>Location:</span> {bug.location}</div>
                    <div className='update-bug-list'><span>Description:</span> {bug.description}</div>
                    <div className='update-bug-list'>
                        <div><span>Add Comment:</span> {bug.comment}</div>
                            <form onSubmit={onSubmitComment}>
                                <input 
                                    type="text"
                                    name='comment'
                                    onChange={(e) => onChangeInput(e)}
                                    value={input.comment}
                                    required
                                    style={{width: '100%', height: '4vh', textAlign: 'left'}}
                                /> 
                                <div><button type="submit">Add Comment</button></div>
                            </form>
                            <div style={{color: '#00CC00', padding: '10px 0px'}}><h3>{successMessage}</h3></div>
                            <div style={{color: '#b30000', padding: '10px 0px'}}><h3>{errorMessage}</h3></div>
                    </div>
                    <h4>{bugComments.length} Comments</h4>
                    {bugComments.map((comment, i) => (
                    <div className='update-bug-comments-container' key={i}>
                        <div className='update-bug-comments-banner'>
                            <div>
                                <span style={{color: 'lightgray'}}>USER</span>: {comment.user_name}
                            </div>
                            <div>
                                <span style={{color: 'lightgray'}}>COMMENT ID</span>: {comment.comment_id}
                            </div>
                        </div>
                        <br />
                        <div>
                            <span style={{color: 'lightgray'}}>Comment</span>: {comment.comment}
                        </div>
                        <div>
                            <button className='update-bug-delete-btn' onClick={() => confirmDeleteComment(comment.comment_id)}>Delete</button>
                        </div>
                    </div>
                    ))}
                </div>
            
        </div>
        
    </div>
    
  )
}

export default UpdateBug