import React from "react";
import FormPreferences from '../../../components/Form/Preferences';
import usePreferences from "../../../hooks/usePreference";

const Categories = () => {
    const {
        loading,
        preferences,
        handleChange,
        handleSubmit,
        buttonDisabled
    } = usePreferences('categories', 'category_ids')


    return (
        <FormPreferences data={preferences} 
                            loading={loading}
                            buttonDisabled={buttonDisabled}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit} />
    );
};

export default Categories;
