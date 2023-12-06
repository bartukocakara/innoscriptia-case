import { useState } from 'react';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useFormValidation = (initialState) => {
    const [formDatas, setFormDatas] = useState(initialState);
    const [validationErrors, setValidationErrors] = useState({});
    
    const handleChange = (event) => {
        const { id, value } = event.target
        setFormDatas({
            ...formDatas,
            [id]: value,
        });
        let newErrors = { ...validationErrors };

        if (value.trim() === "") {
            newErrors[id] = "This field is required";
        } else {
            delete newErrors[id];
        }
        if (id === "email") {
            if (emailRegex.test(value)) {
                setValidationErrors(prevState => ({ ...prevState, email: [] }));
            } else {
                setValidationErrors(prevState => ({
                ...prevState,
                email: ["Please provide well formatted email"]
                }));
            }
        }
        setTimeout(() => {
            setValidationErrors({});
        }, 3000);
    };
    
    const validateEmail = (email) => {
      return emailRegex.test(String(email).toLowerCase());
    };
  
    const validateFormData = (data, fields) => {
        let errors = {};
        for (const field of fields) {
            if (!data[field]) {
            errors[0] = [`${field} is required`];
            } else if (field === 'email' && !validateEmail(data[field])) {
            errors[0] = ['Invalid email format'];
            }
        }
      return errors;
    };
  
    return { formDatas, 
             validationErrors, 
             setValidationErrors, 
             handleChange, 
             validateFormData };
  };

export default useFormValidation;
