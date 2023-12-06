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
            name: '',
            password: '',
            confirm: '',
        },
    );
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        let isAuth = localStorage.getItem('token')
        if(isAuth && isAuth !== 'undefined') {
           navigate('/articles')
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
                        <button className="btn btn-primary"
                                disabled={!Object.values(formDatas).every(value => Boolean(value))}
                                >
                            Register
                        </button>
                        <Link to="/login" className="btn btn-primary ml-2" href="">Login</Link>
                    </div>
                </div>
            </form>  
        </div>
    )
}