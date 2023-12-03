import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateDataAction } from '../../../../store/actions/DataUpdateAction';

const ProfileModal = (props) => {
    const [ formDatas, setFormDatas ] = useState({})
    const [ formErrors, setFormErrors ] = useState({})
    const [ formButtonDisabled, setFormButtonDisabled ] = useState(true)
    const [updatedFields, setUpdatedFields] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        setFormDatas({ ...props.datas })
    }, [props.datas])      

    const handleChange = (e) => {
        const { id, value } = e.target;
        
        if (id === 'title') {
            if (value.length < 3 || value.length > 50) {
                setFormErrors({
                    ...formErrors,
                    [id]: "Field must be between 3 and 50 characters"
                });
            } else {
                setFormErrors({
                    ...formErrors,
                    [id]: null
                });
            }
        }
        setFormDatas({
            ...formDatas,
            [id]:  value
        });
        setUpdatedFields({ ...updatedFields, [id]: value });
        setFormButtonDisabled(false)
        setTimeout(() => {
            setFormErrors({})
        }, 7500);
    };

    const handleFormSubmit = async () => {
        setFormButtonDisabled(true)
        setLoading(true)
        dispatch(updateDataAction('me/profile', null, updatedFields))
        if(updatedFields.gender) {
            let user = JSON.parse(localStorage.getItem('user'))
            user['gender'] = updatedFields.gender
            localStorage.setItem('user', JSON.stringify(user))
        }
        props.setDatas({
            ...formDatas,
            full_name : `${formDatas.first_name} ${formDatas.last_name}`,
        })
        setTimeout(() => {
            setLoading(false)
            props.setShowModal(false)
        }, 2000);
    }

    return (
        <Modal show={props.show} 
               onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.t('profile_edit')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
                loading ? props.spinnerText: 
            <div className="info">
            <div className="row">
                <div className="col-lg-11 mx-auto">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 d-flex">
                            {formErrors.image && <p className="text-danger">{formErrors.image}</p>}
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 mt-4">
                            <div className="form">
                                <div className="row mt-2">
                                    <div className="col-lg-12 col-sm-6">
                                        <div className="form-group">
                                            <h6>{props.t('title')}</h6>
                                            <input
                                                type="text"
                                                className="form-control text-light mb-4"
                                                id="first_name"
                                                minLength="3"
                                                maxLength="50"
                                                value={formDatas.first_name || ""}
                                                placeholder="First Name"
                                                onChange={handleChange}
                                                />
                                            {formErrors.first_name && (
                                                <p className="text-danger">{formErrors.first_name}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-sm-6">
                                        <div className="form-group">
                                            <h6>Last Name</h6>
                                            <input
                                                type="text"
                                                className="form-control text-light mb-4"
                                                id="last_name"
                                                minLength="3"
                                                maxLength="50"
                                                value={formDatas.last_name || ""}
                                                placeholder="Last Name"
                                                onChange={handleChange}
                                                />
                                            {formErrors.last_name && (
                                                <p className="text-danger">{formErrors.last_name}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-sm-12">
                                        <div className="form-group">
                                            <h6>
                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                    width="24" height="24" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" className="feather feather-mail mr-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                Email
                                            </h6>
                                            <input
                                                type="email"
                                                className="form-control text-light mb-4"
                                                id="email"
                                                minLength="3"
                                                maxLength="50"
                                                value={formDatas.email || ""}
                                                placeholder="Email"
                                                onChange={handleChange}
                                                />
                                            {formErrors.email && (
                                                <p className="text-danger">{formErrors.email}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-sm-12">
                                        <div className="form-group">
                                            <h6>
                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                     width="24" height="24" 
                                                     viewBox="0 0 24 24" 
                                                     fill="none" 
                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                                     className="feather feather-phone mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                Phone Number
                                            </h6>
                                            <input
                                                type="text"
                                                className="form-control text-light mb-4"
                                                id="phone_number"
                                                minLength="3"
                                                maxLength="50"
                                                value={formDatas.phone_number || ""}
                                                placeholder="05309101193"
                                                onChange={handleChange}
                                                />
                                            {formErrors.phone_number && (
                                                <p className="text-danger">{formErrors.phone_number}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <h6>
                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                 width="24" height="24" 
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                                 className="feather feather-calendar mr-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                            Birth Date
                                        </h6>
                                        <input 
                                            type="date"
                                            id='birth_date'
                                            className="form-control text-light" 
                                            value={formDatas.birth_date ? new Date(props.datas.birth_date).toISOString().substr(0, 10) : ''} 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                    <div className="col-sm-12 mt-2">
                                        <h6>Gender</h6>
                                        <select className='form-control text-light' 
                                                defaultValue={formDatas.gender} 
                                                id="gender" 
                                                onChange={handleChange}>
                                            <option value='' disabled>Select Gender</option>
                                            <option value="MAN">Man</option>
                                            <option value="WOMAN">Woman</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            }
            
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" 
                        onClick={props.handleClose}>
                    {props.t('close')}
                </Button>
                <Button variant="primary" 
                        onClick={handleFormSubmit}
                        disabled={loading || formButtonDisabled}>
                        {
                                loading ? ( props.spinner ) : (
                                    <>
                                        {props.t('save')}
                                    </>
                                )
                        }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProfileModal