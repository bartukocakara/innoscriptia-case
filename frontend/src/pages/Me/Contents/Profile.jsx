import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../../component-style/cards/card.css'
import Spinner from '../../../components/SpinnerText' 
import { loadShowAction } from '../../../store/actions/DataShowAction';

const Profile = () => {
    const [ loading, setLoading ] = useState(true);
    const dispatch = useDispatch();
    const data = useSelector(state => state.dataShow.dataShow);
    const navigate = useNavigate()
    const [ datas, setDatas ] = useState({})

    const id = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).id

    useEffect(() => {
        dispatch(loadShowAction('users', id, navigate));
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [dispatch, navigate, id])

    useEffect(() => {
        if (data?.result) {
            setDatas(data.result)
        }
    }, [data])

    return (
        <div className="row layout-spacing">
            {
                loading ? (
                   <Spinner />
                ) : datas && (
                    <div className="col-12 layout-top-spacing">
                        <div className="user-profile layout-spacing">
                            <div className="widget-content widget-content-area">
                                <div className='d-flex'>
                                    <h3 className="">
                                        Profile
                                    </h3>
                                </div>
                                
                                <div className="user-info-list">
                                    <div className="">
                                        <ul className="contacts-block list-unstyled">
                                            <li className="contacts-block__item d-flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-coffee"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg> 
                                                <h6>
                                                    Name : {datas.name}
                                                </h6>
                                            </li>
                                            <li className="contacts-block__item d-flex">
                                                <a href="mailto:example@mail.com">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                </a>
                                                <h6>
                                                    Email : {datas?.email}
                                                </h6>
                                            </li>
                                        </ul>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Profile