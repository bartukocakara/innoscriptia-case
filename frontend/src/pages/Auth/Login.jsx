import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../services/User/AuthService'
import useFormValidation from '../../hooks/useFormValidation'
import { Spinner } from 'react-bootstrap'

const Login = () => {

    const { formDatas, 
            validationErrors, 
            setValidationErrors, 
            handleChange, 
            validateFormData } = useFormValidation(
                                                    { 
                                                        email: '', 
                                                        password: '' 
                                                    },
                                                );
    const navigate = useNavigate()
    const [ passwordVisible, setPasswordVisible ] = useState(false);
    const [ loading, setLoading ] = useState(false)
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const errors = validateFormData(formDatas, ['email', 'password']);
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }
    
        const credentials = { 
                email: formDatas.email, 
                password: formDatas.password,
        };
        const data = await LoginUser(credentials, navigate);
        setTimeout(() => {
            setLoading(false)
        }, 1500);
        if(data) {
            if (!data?.hasOwnProperty('statusCode')) {
                  setValidationErrors(data);
            } else if (data?.statusCode === 401) {
                  setValidationErrors({
                      password : ['Invalid password']
                  });
            } else if (data?.statusCode === 422) {
                setValidationErrors(data.result);
          }
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className='sign-box row'>
            <div className='mx-5'>
                    <h1 className='mb-4'>
                        Login 
                        <Link to='/login'>
                            <span className='brand-name ml-2'>
                                Innoscripta
                            </span>
                        </Link>
                    </h1>
                    <form className='text-left' 
                          onSubmit={handleSubmit} 
                          autoComplete='off'>
                        <div className='form'>
                            <div className='form-group'>
                                <h6>Email :</h6>
                                <input
                                    className='form-control'
                                    placeholder='john@example.com'
                                    type='email'
                                    id='email'
                                    value={formDatas.email}
                                    onChange={handleChange}
                                    style={{ backgroundColor: '#fff', color: '#1b2e4b'}}
                                />
                            </div>
                            {
                                validationErrors?.email && 
                                validationErrors.email.map((item, index) => (
                                    <span key={index} className='text-danger'>{item}</span>
                                ))
                            }
                            <div className='form-group'>
                                <h6>Password :</h6>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    className='form-control form-control-merge'
                                    placeholder='············'
                                    id='password'
                                    value={formDatas.password}
                                    onChange={handleChange}
                                    style={{ backgroundColor: '#fff', color: '#1b2e4b'}}
                                    />
                            </div>
                            {
                                validationErrors?.password && 
                                validationErrors.password.map((item, index) => (
                                    <span key={index} className='text-danger'>{item}</span>
                                ))
                            }
                            <div className='d-flex justify-content-between'>
                                <div className='field-wrapper d-flex'>
                                    <p className='d-flex'>
                                        Show password
                                        <input type='checkbox'
                                               className='new-control new-checkbox'
                                               id='toggle-password'
                                               style={{ scale: '35%'  }}
                                               onClick={togglePasswordVisibility}
                                        />
                                    </p>
                                </div>
                                <button type='submit' 
                                        className='btn btn-primary' 
                                        disabled={!Object.values(formDatas).every(value => Boolean(value))}
                                        >
                                        {
                                          loading ?  <Spinner /> : "Login"
                                        }
                                </button>
                            </div>
                            <div className='field-wrapper'>
                                <Link to='/forgot-password' 
                                      className='forgot-pass-link'
                                      >
                                    Forgot password
                                </Link>
                            </div>
                            <div className='mt-4'>
                                <span className='mt-4 text-light'>
                                    You don't have membership ?
                                </span>
                                <Link to='/register' 
                                      className='btn btn-primary ml-2'
                                      >
                                        Register
                                </Link>
                            </div> 
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default Login