import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createDataAction } from '../../store/actions/DataCreateAction';
import FormPreferences from '../Form/Preferences'
import { loadPreferencesAction } from '../../store/actions/Preference/PreferencesActions';

const PreferencesModal = (props) => {
    const [userPreferences, setUserPreferences] = useState(localStorage.getItem('preferences') ? JSON.parse(localStorage.getItem('preferences')) : {})
    const [preferenceType, setPreferenceType] = useState('categories')
    const [preferenceKey, setPreferenceKey] = useState('category_ids')
    const [ preferences, setPreferences ] = useState({})
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const dispatch = useDispatch();
    const id = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).id
    const [loading, setLoading] = useState(true)
    const data = useSelector((state) => state.preferences.preferences);

    useEffect(() => {
        let uPreferences = localStorage.getItem('preferences')
        if(uPreferences) {
            setUserPreferences(JSON.parse(uPreferences))
        }
    }, [])
    
    useEffect(() => {
        setPreferences((prevState) => ({
            ...prevState,
            [preferenceType]: data.result?.data.map((item) => ({
                ...item,
                checked: userPreferences[preferenceType]?.some((userItem) => userItem.id === item.id) || false,
            })),
        }));
    }, [data, userPreferences, preferenceType]);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            dispatch(loadPreferencesAction(preferenceType, {}));
            setLoading(false)
        }, 250);
    }, [])
    
    
    const handleSubmit = () => {
        setLoading(true)
        setButtonDisabled(true)
        const preferenceFields = preferences[preferenceType]
                                .filter((data) => data.checked)
        const preferenceFieldsMap = preferenceFields.map((data) => data.id);
        const preferencesData = { [preferenceKey]: preferenceFieldsMap };
        const updatedPreferences = {
            ...userPreferences,
            [preferenceType]: preferenceFields.map((data) => ({
                id : data.id,
                name : data.name
            }))
        };
        try {
            dispatch(createDataAction(`users/${id}/preferences/${preferenceType}`, 
                                        preferencesData,
                                        null, 
                                        `${preferenceType} preferences updated successfuly`));
            setTimeout(() => {
                setButtonDisabled(false)
                setLoading(false)
                localStorage.setItem('preferences', JSON.stringify(updatedPreferences))
                setUserPreferences(updatedPreferences)
            }, 1500);
        } catch (error) {
            console.log(error)
        }
    };

    const handleNavbar = (preferenceType, preferenceKey) => {
        setPreferenceKey(preferenceKey)
        setPreferenceType(preferenceType)
        setLoading(true)
        setTimeout(() => {
            dispatch(loadPreferencesAction(preferenceType, {}));
            setLoading(false)
        }, 250);
    }

    const handleChange = (e) => {
        const { id, checked } = e.target;
        setPreferences((prevPreferences) => {
            return {
                ...prevPreferences,
                [preferenceType]: prevPreferences[preferenceType].map((preference) =>
                    preference.id.toString() === id ? { ...preference, checked } : preference
                ),
            };
        });
    };

    console.log(preferences);

    return (
        <Modal show={props.show} 
               onHide={props.onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    Preferences
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div >
                <div className="row m-auto">
                    <div className='simple-tab w-100'>
                        <ul className="nav nav-tabs mb-3 mt-3" id="simpletab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" 
                                    onClick={() => {handleNavbar('categories', 'category_ids')}} href={`#${preferenceType}`} data-toggle="tab" role="tab" aria-controls="categories" aria-selected="true">
                                    Categories
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" 
                                    onClick={() => {handleNavbar('sources', 'source_ids')}} href={`#${preferenceType}`} id="sources-tab" data-toggle="tab"  role="tab" aria-controls="sources" aria-selected="false">
                                    Sources
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" 
                                    onClick={() => {handleNavbar('authors', 'author_ids')}} href={`#${preferenceType}`} id="authors-tab" data-toggle="tab"  role="tab" aria-controls="authors" aria-selected="false">
                                    Authors
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" id="simpletabContent">
                            <div className="tab-pane fade show active" id="categories" role="tabpanel" aria-labelledby="categories-tab">
                                    <FormPreferences data={preferences[preferenceType]} 
                                                    loading={loading}
                                                    buttonDisabled={buttonDisabled}
                                                    handleChange={handleChange}
                                                    handleSubmit={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" 
                        onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PreferencesModal