import React, { useState } from 'react'
import { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { createDataAction } from '../../../store/actions/DataCreateAction';
import { useDispatch } from 'react-redux';

const SettingModal = (props) => {
    const [ formDatas, setFormDatas ] = useState([])
    const [ updatedFields, setUpdatedFields ] = useState([])
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [ formButtonDisabled, setFormButtonDisabled ] = useState(true)

    useEffect(() => {
        setFormDatas(props.data)
    }, [props.data])

    const handleChange = (e) => {
        const { id, value } = e.target;
        const filteredFormDatas = formDatas.filter((item) => item.id === parseInt(id));
        const updatedFormDatas = filteredFormDatas.map((item) => {
            return {
                ...item,
                value: value
            };
        });
        const newFormDatas = [...formDatas];
        updatedFormDatas.forEach((updatedItem) => {
            const index = newFormDatas.findIndex((item) => item.id === updatedItem.id);
            if (index !== -1) {
                newFormDatas[index] = updatedItem;
            }
        });
      
        setFormDatas(newFormDatas);
        setUpdatedFields(newFormDatas);
        setFormButtonDisabled(false)
    };

    const handleFormSubmit = async () => {
        setFormButtonDisabled(true)
        let userSettingFields = updatedFields.map(obj => ({ id: parseInt(obj.id), value: parseInt(obj.value) }))
        let user = localStorage.getItem('user')
        if(userSettingFields && user)
        {
            let datas = {
                user_id : JSON.parse(user).id,
                user_skill_fields : userSettingFields
            }
            setLoading(true)
            dispatch(createDataAction('user-skills', datas, props.navigate()))
        }
        setTimeout(() => {
            props.setDatas(formDatas)
            setLoading(false)
            props.setShowModal(false)
        }, 2000);
       
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-light'>Skills Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
                loading && props.datas ? (
                    <div style={{ margin: "auto", justifyContent: "center"}}>
                        <h6 className='mr-3'>Please wait for a moment ...</h6>
                    </div>
                ) : (
                    <div className="info">
                        <div className="row">
                            {formDatas ? (
                                formDatas.map((item, index) => {
                                return (
                                    <div key={index} className="col-6 mt-2">
                                        <label htmlFor={item.input_id} className="text-light">
                                            {item.title_tr}
                                        </label>
                                        <input type='number'
                                            className='form-control text-center text-light input'
                                            style={{fontSize: '20px'}}
                                            min='1'
                                            max='10'
                                            data-value={JSON.stringify(item)}
                                            id={item.id}
                                            value={item.value}
                                            onChange={handleChange} />
                                    </div>
                                );
                                })
                            ) : (
                                <>
                                {props.skills.map((item, index) => {
                                    return (
                                    <div key={index} className="mt-2">
                                        <label htmlFor="fullName" className="text-light">
                                        {item.title_tr}
                                        </label>
                                        <input type='number'
                                            className='form-control'
                                            min='1'
                                            max='10'
                                            data-value={JSON.stringify(item)}
                                            id={item.id}
                                            value={item.value}
                                            onChange={handleChange} />
                                    </div>
                                    );
                                })}
                                </>
                            )}
                        </div>
                    </div>
            )
            }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" 
                        onClick={handleFormSubmit}
                        disabled={loading || formButtonDisabled}>
                        {
                                loading ? (
                                   
                                     <div className="spinner-border" role="status">
                                     <span className="sr-only"></span>
                                 </div>
                                ) : (
                                    <>
                                        Save Changes
                                    </>
                                )
                        }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SettingModal