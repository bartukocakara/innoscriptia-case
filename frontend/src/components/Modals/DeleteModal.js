import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteDataAction } from '../../store/actions/DataDeleteAction';

const DeleteModal = (props) => {
    const dispatch = useDispatch();
    const id = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).id
    const [loading, setLoading] = useState(false)

    
    const handleSubmit = () => {
        setLoading(true)
        let preferences = localStorage.getItem('preferences') && JSON.parse(localStorage.getItem('preferences'))
        let deleteReferences = {
            category_ids : preferences?.categories?.map((item) => item.id),
            author_ids : preferences?.authors?.map((item) => item.id),
            source_ids : preferences?.sources?.map((item) => item.id),
        }
        try {
            dispatch(deleteDataAction(`users/${id}/preferences`, 
                                       null, 
                                       deleteReferences, 
                                       'Preferences cleared'));
            setTimeout(() => {
                setLoading(false)
                localStorage.setItem('preferences', JSON.stringify({}))
            }, 1500);
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <Modal show={props.show} 
               onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Preferences
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="info">
                <div className="row">
                    Are you sure you want to clear preferences ? 
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" 
                        onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="info" 
                        onClick={() => handleSubmit()}>
                    {
                        loading ? <Spinner /> : 'Yes'
                    }
                    
                </Button>
               
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal