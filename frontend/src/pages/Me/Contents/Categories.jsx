import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPreferencesAction } from '../../../store/actions/Preference/PreferencesActions';
import { createDataAction } from '../../../store/actions/DataCreateAction'
import FormPreferences from '../../../components/Form/Preferences';

const Categories = () => {
    const dispatch = useDispatch();
    const [preferences, setPreferences] = useState([]);
    const [loading, setLoading] = useState(true)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const id = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).id

    const data = useSelector((state) => state.preferences.preferences);

    useEffect(() => {
            dispatch(loadPreferencesAction('categories', { user_id : id}));
    }, [dispatch]);

    useEffect(() => {
        if (data && data.result && data.result.data) {
            setLoading(false)
            setPreferences(data.result.data);
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonDisabled(true)
        const preferenceFields = preferences.map((data) => (data.id));
        const categories = { category_ids: preferenceFields };
        try {
            dispatch(createDataAction(`users/${id}/preferences/categories`, categories));
            setTimeout(() => {
                setButtonDisabled(false)
            }, 1500);
        } catch (error) {
            console.log(error)
        }
    };

    const handleChange = (e) => {
        const {id, checked } = e.target;
        const updatePreferences = preferences.map((preference) => {
            if (preference.id.toString() === id) {
                return { ...preference, value: checked };
            }
            return preference;
        });
        setPreferences(updatePreferences);
    };

    return (
        <>
        <div>
            <FormPreferences data={preferences} 
                            loading={loading}
                            buttonDisabled={buttonDisabled}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit} />
        </div></>
    );
};

export default Categories;
