import React, {useEffect, useState} from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { SignUpService } from '../../services/User/AuthService';
import useFormValidation from '../../hooks/useFormValidation'
import { checkPasswordMatch } from '../../utils/passwordMatch';

export default function Register() {

    const { formDatas, 
            validationErrors, 
            setValidationErrors, 
            handleChange, 
            validateFormData } = useFormValidation(
        { 
            email: '', 
            first_name: '',
            last_name: '',
            password: '',
            confirm: '',
        },
    );
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        let isAuth = localStorage.getItem('token')
        if(isAuth && isAuth !== 'undefined') {
           navigate('/onboarding')
        }
     }, [navigate])

    const ResigterUser = async (event) => {
        event.preventDefault();
        const passwordMatch = checkPasswordMatch(formDatas.password, formDatas.confirm);
        if(passwordMatch === false) {
            return
        }

        const errors = validateFormData(formDatas, ['email', 'password']);
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        const data = await SignUpService(formDatas, navigate);
        if(data) {
            if (data && !data?.hasOwnProperty('statusCode')) {
                  setValidationErrors(data);
            } else if (data?.statusCode === 401) {
                  setValidationErrors({
                      password : ['Invalid password']
                  });
            }
        }
        return
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="sign-box">
            <form onSubmit={ResigterUser}>
              <h1 className="mb-4">register <span className="brand-name">Innoscripta</span></h1>
                <div  className='row'>
                    <div className="form-group col-lg-6 col-sm-12">
                        <h6>first_name</h6>
                        <input type="text" 
                            className="form-control"
                            placeholder="first_name" 
                            id="first_name"
                            value = {formDatas.first_name}
                            onChange={handleChange}
                            style={{ backgroundColor: '#fff', color: '#1b2e4b'}}
                        />
                        {
                            validationErrors?.first_name && 
                            validationErrors.first_name.map((item, index) => (
                                <span key={index} className="text-danger">{item}</span>
                            ))
                        }
                    </div>
                    <div className="form-group col-lg-6 col-sm-12">
                        <h6>last_name</h6>
                        <input type="text" 
                                className="form-control"
                                placeholder="last_name" 
                                id="last_name"
                                minLength='6'
                                maxLength='50'
                                value = {formDatas.last_name}
                                onChange={handleChange}
                                style={{ backgroundColor: '#fff', color: '#1b2e4b'}}
                            />
                            {
                                validationErrors?.last_name && 
                                validationErrors.last_name.map((item, index) => (
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
                        <h6>password : </h6>
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
                        <h6 >password_confirmation : </h6>
                        <input type={passwordVisible ? 'text' : 'password'}
                            className="form-control"
                            id="confirm"
                            placeholder="············"
                            value = {formDatas.confirm}
                            onChange={handleChange}
                            minLength='6'
                            maxLength='50'
                            style={{ backgroundColor: '#fff', color: '#1b2e4b'}}
                        />
                        <span className="invalid-feedback" role="alert">
                            <strong></strong>
                        </span>
                    </div>
                    <div className="field-wrapper toggle-pass">
                        <p className="d-inline-block">show_password</p>
                            <input
                                type="checkbox"
                                id="toggle-password"
                                className="form-control w-25"
                                style={{ scale: '50%' }}
                                onClick={togglePasswordVisibility}
                                />
                    </div>
                    <div className="form-group col-lg-6 col-sm-12">
                        <button className="btn btn-primary"
                                disabled={!Object.values(formDatas).every(value => Boolean(value))}
                                >
                            register
                        </button>
                        <Link to="/login" className="btn btn-primary ml-2" href="">login</Link>
                    </div>
                </div>
            </form>  
        </div>
    )
}