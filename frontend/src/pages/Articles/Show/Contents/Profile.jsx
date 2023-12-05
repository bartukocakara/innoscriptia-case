import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../../component-style/cards/card.css'
import { loadShowAction } from '../../../../store/actions/DataShowAction';
import '../../../../component-style/custom-list-group.css'

const Profile = () => {

    const dispatch = useDispatch();
    const data  = useSelector(state => state.dataShow.dataShow);
    const navigate = useNavigate()
    const [ formData, setFormData ] = useState({})
    let { slug } = useParams();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(loadShowAction('articles', slug, navigate));
        setTimeout(() => {
            setLoading({profile_data : true})
        }, 1000);
    }, [dispatch, navigate, slug])

    useEffect(() => {
        setFormData(data?.result)
    }, [data])
    console.log(formData);
    
    

    return (
        <div className='row'>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className='card component-card_profile m-1'>
                    <div className="card-body">
                        <ul className="list-group list-group-icons-meta">
                            <div className='d-flex mb-3'>
                                <h5>
                                    Profile
                                </h5>
                            </div>
                            <li className="list-group-item list-group-item-action">
                                <div className="media">
                                    <div className="d-flex mr-3">
                                        <h6 className="text-light">Title </h6>
                                        <p className="ml-2 text-light"> 
                                            {formData?.title}
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item list-group-item-action">
                                <div className="media">
                                    <div className="d-flex mr-3">
                                        <h6 className="text-light">
                                            Description: 
                                        </h6>
                                        <p className="ml-2 text-light"> 
                                            {formData?.description}
                                        </p>
                                    </div>
                                </div>
                            </li>
                           
                            <li className="list-group-item list-group-item-action">
                                <div className="media">
                                    <div className="d-flex mr-3">
                                        <h6 className="text-light">
                                            Published at
                                        </h6>
                                        <p className="ml-2 text-light"> 
                                            {formData?.published_at}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className='card component-card_profile m-1'>
                    <div className="card-body">
                        <ul className="list-group list-group-icons-meta">
                            <div className='d-flex mb-3'>
                                <h5>
                                    Properties
                                </h5>
                            </div>
                            <li className="list-group-item list-group-item-action">
                                <div className="media">
                                    <div className="d-flex mr-3">
                                        <h6 className="text-light">
                                            Author: 
                                        </h6>
                                        <p className="ml-2 text-light"> 
                                            {formData?.author?.name}
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item list-group-item-action">
                                <div className="media">
                                    <div className="d-flex mr-3">
                                        <h6 className="text-light">
                                            Category :
                                        </h6>
                                        <p className="ml-2 text-light"> 
                                            {formData?.category?.name}
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item list-group-item-action">
                                <div className="media">
                                    <div className="d-flex mr-3">
                                        <h6 className="text-light">
                                            Source :
                                        </h6>
                                        <p className="ml-2 text-light"> 
                                            {formData?.source?.name }
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile