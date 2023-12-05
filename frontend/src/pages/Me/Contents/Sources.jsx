import React from "react";
import FormPreferences from '../../../components/Form/Preferences';
import usePreferences from "../../../hooks/usePreference";

const Sources = () => {
    const {
        loading,
        preferences,
        handleChange,
        handleSubmit,
        buttonDisabled
    } = usePreferences('sources', 'source_ids')


    return (
        <FormPreferences data={preferences} 
                            loading={loading}
                            buttonDisabled={buttonDisabled}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit} />
    );
};

export default Sources;
