import React, {useEffect, useState} from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { SignUpService } from '../../services/User/AuthService';
import useFormValidation from '../../hooks/useFormValidation'
import { checkPasswordMatch } from '../../utils/passwordMatch';
import { Spinner } from 'react-bootstrap'

export default function Register() {

    const { formDatas, 
            validationErrors, 
            setValidationErrors, 
            handleChange, 
            validateFormData } = useFormValidation(
        { 
            email: '', 
            name: '',
            password: '',
            password_confirmation: '',
        },
    );
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [ loading, setLoading ] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        let isAuth = localStorage.getItem('token')
        if(isAuth && isAuth !== 'undefined') {
           navigate('/articles')
        }
     }, [navigate])

    const ResigterUser = async (event) => {
        event.preventDefault();
        const passwordMatch = checkPasswordMatch(formDatas.password, 
                                                 formDatas.password_confirmation);
        if(passwordMatch === false) {
            setLoading(false)
            setValidationErrors({
                password_confirmation : [
                    "Password doesn't match"
                ]
            });
            return
        }

        const errors = validateFormData(formDatas, ['email', 'password']);
        if (errors.length > 0) {
            setLoading(false)
            setValidationErrors(errors);

            setTimeout(() => {
                setValidationErrors({})
            }, 2000);
            return;
        }

        const data = await SignUpService(formDatas, navigate);
        setLoading(true)

        if(data) {
            if (!data?.hasOwnProperty('statusCode')) {
                  setValidationErrors(data);
            } else if (data?.statusCode === 422) {
                setValidationErrors(data.result);
                setLoading(false)
          }
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="sign-box">
            <form onSubmit={ResigterUser}>
                <h1 className="mb-4">Register 
                    <span className="brand-name">
                        Innoscripta
                    </span>
                </h1>
                <div  className='row'>
                    <div className="form-group col-lg-6 col-sm-12">
                        <h6>Name</h6>
                        <input type="text" 
                                className="form-control"
                                placeholder="name" 
                                id="name"
                                value = {formDatas.name}
                                onChange={handleChange}
                                style={{ backgroundColor: '#fff', color: '#1b2e4b'}}
                        />
                        {
                            validationErrors?.name && 
                            validationErrors.name.map((item, index) => (
                                <span key={index} className="text-danger">{item}</span>
                            ))
                        }
                    </div>
                    <div className="form-group col-lg-12 col-sm-12">
                        <h6>Email</h6>
                        <input type="text" 
                                className="form-control"
                                placeholder="test@gmail.com" 
                                id="email"
                                minLength='6'
                                maxLength='50'
                                value = {formDatas.email}
                                onChange={handleChange}
                                style={{ backgroundColor: '#fff', color: '#1b2e4b'}}
                            />
                            {
                                validationErrors?.email && 
                                validationErrors.email.map((item, index) => (
                                    <span key={index} className="text-danger">{item}</span>
                                ))
                            }
                    </div>
                    <div className="form-group col-lg-6 col-sm-12">
                        <h6>Password : </h6>
                        <input type={passwordVisible ? 'text' : 'password'}
                            className="form-control"
                            id="password"
                            placeholder="············"
                            value = {formDatas.password}
                            onChange={handleChange}
                            minLength='6'
                            maxLength='50'
                            style={{ backgroundColor: '#fff', color: '#1b2e4b'}}
                        />
                        {
                            validationErrors?.password && 
                            validationErrors.password.map((item, index) => (
                                <span key={index} className="text-danger">{item}</span>
                            ))
                        }
                    </div>
                    <div className="form-group">
                        <h6 >Password confirmation : </h6>
                        <input type={passwordVisible ? 'text' : 'password'}
                            className="form-control"
                            id="password_confirmation"
                            placeholder="············"
                            value = {formDatas.password_confirmation}
                            onChange={handleChange}
                            minLength='6'
                            maxLength='50'
                            style={{ backgroundColor: '#fff', color: '#1b2e4b'}}
                        />
                       {
                            validationErrors?.password_confirmation && 
                            validationErrors.password_confirmation.map((item, index) => (
                                <span key={index} className="text-danger">{item}</span>
                            ))
                        }
                    </div>
                    <div className="field-wrapper toggle-pass">
                        <p className="d-inline-block">
                            Show password
                        </p>
                        <input type="checkbox"
                                id="toggle-password"
                                className="form-control w-25"
                                style={{ scale: '50%' }}
                                onClick={togglePasswordVisibility}
                            />
                    </div>
                    <div className="form-group col-lg-6 col-sm-12">
                        <button className="btn btn-lg btn-success"
                                disabled={!Object.values(formDatas).every(value => Boolean(value))}
                                >
                            {
                                loading ?  <Spinner /> : "Register"
                            }
                        </button>
                        <p>Do you have an account ? please <Link to="/login" className="btn btn-primary ml-2" href="">Login</Link></p>
                        
                    </div>
                </div>
            </form>  
        </div>
    )
}