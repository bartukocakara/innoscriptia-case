import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDataAction } from '../store/actions/DataCreateAction'
import { loadPreferencesAction } from '../store/actions/Preference/PreferencesActions';

const usePreferences = (preferenceType, preferenceKey) => {
    const [userPreferences, setUserPreferences] = useState(localStorage.getItem('preferences') ? JSON.parse(localStorage.getItem('preferences')) : {})

    const data = useSelector((state) => state.preferences.preferences);
    const id = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).id
    const dispatch = useDispatch();
    const [preferences, setPreferences] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data?.result?.data) {
            setPreferences(data.result.data.map((item) => ({
                ...item,
                checked: userPreferences[preferenceType]?.some((userItem) => userItem.id === item.id) || false,
            })));
        }
    }, [data, userPreferences]);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            dispatch(loadPreferencesAction(preferenceType, {}));
        }, 250);
    }, [dispatch]);

    useEffect(() => {   
        let updatedPreferences = preferences?.map((prefItem) => {
            const userPrefItem = userPreferences[preferenceType].find((userItem) => userItem.id === prefItem.id);
            return {
                ...prefItem,
                checked: userPrefItem ? true : false,
            };
        }) || [];
        console.log(updatedPreferences);
        setPreferences(updatedPreferences);
        setLoading(false);
    }, [userPreferences]);
    
    const handleChange = (e) => {
        const {id, checked } = e.target;
        const updatePreferences = preferences.map((preference) => {
            if (preference.id.toString() === id) {
                return { ...preference, checked };
            }
            return preference;
        });
        setPreferences(updatePreferences);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonDisabled(true)
        const preferenceFields = preferences.filter((data) => data.checked);
        const datas = { [preferenceKey]: preferenceFields.map((data) => (data.id)) };
        const updatedPreferences = {
            ...userPreferences,
            [preferenceType]: preferenceFields.map((data) => ({
                id : data.id,
                name : data.name
            }))
        };
        try {
            dispatch(createDataAction(`users/${id}/preferences/${preferenceType}`, datas));
            setTimeout(() => {
                setButtonDisabled(false)
                localStorage.setItem('preferences', JSON.stringify(updatedPreferences))
            }, 1500);
        } catch (error) {
            console.log(error)
        }
    };

    return {
        loading,
        preferences,
        handleChange,
        handleSubmit,
        buttonDisabled
    };
};

export default usePreferences;
