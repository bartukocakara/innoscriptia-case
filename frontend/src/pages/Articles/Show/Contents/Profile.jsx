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
    let { id } = useParams();
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        dispatch(loadShowAction('articles', id, navigate));
        setTimeout(() => {
            setLoading({profile_data : true})
        }, 1000);
    }, [dispatch, navigate, id])

    useEffect(() => {
        setFormData(data?.result?.data)
    }, [data])

    
    

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
                                        <h6 className="text-light">match_name </h6>
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
                                            court
                                        </h6>
                                        <p className="ml-2 text-light"> 
                                            {formData?.court}
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item list-group-item-action">
                                <div className="media">
                                    <div className="d-flex mr-3">
                                        <h6 className="text-light">
                                            field_usage 
                                        </h6>
                                        <p className="ml-2 text-light"> 
                                            {formData?.field_usage }
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item list-group-item-action">
                                <div className="media">
                                    <div className="d-flex mr-3">
                                        <h6 className="text-light">
                                            start_date
                                        </h6>
                                        <p className="ml-2 text-light"> 
                                            {formData?.datetime?.start_date}
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item list-group-item-action">
                                <div className="media">
                                    <div className="d-flex mr-3">
                                        <h6 className="text-light">
                                            expiring_date
                                        </h6>
                                        <p className="ml-2 text-light"> 
                                            {formData?.datetime?.expiring_date}
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item list-group-item-action">
                                <div className="media">
                                    <div className="d-flex mr-3">
                                        <h6 className="text-light">
                                            hours_between
                                        </h6>
                                        <p className="ml-2 text-light"> 
                                            {formData?.datetime?.begin_time }
                                        </p>
                                        <p className="ml-2 text-light"> 
                                            {formData?.datetime?.end_time}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
                <div className="widget widget-activity-three">
                    <div className="widget-heading">
                        <h5 className="">Notifications</h5>
                    </div>
                    <div className="widget-content">
                        <div className="mt-container mx-auto ps ps--active-y">
                            <div className="timeline-line">
                                <div className="item-timeline timeline-new">
                                    <div className="t-dot" data-original-title="" title="">
                                        <div className="t-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                    </div>
                                    <div className="t-content">
                                        <div className="t-uppercontent">
                                            <h5>Logs</h5>
                                            <span className="">27 Feb, 2020</span>
                                        </div>
                                        <p><span>Updated</span> Server Logs</p>
                                        <div className="tags">
                                            <div className="badge badge-primary">Logs</div>
                                            <div className="badge badge-success">CPanel</div>
                                            <div className="badge badge-warning">Update</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-timeline timeline-new">
                                    <div className="t-dot" data-original-title="" title="">
                                        <div className="t-success"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                                    </div>
                                    <div className="t-content">
                                        <div className="t-uppercontent">
                                            <h5>Mail</h5>
                                            <span className="">28 Feb, 2020</span>
                                        </div>
                                        <p>Send Mail to <a href="javascript:void(0);">HR</a> and <a href="javascript:void(0);">Admin</a></p>
                                        <div className="tags">
                                            <div className="badge badge-primary">Admin</div>
                                            <div className="badge badge-success">HR</div>
                                            <div className="badge badge-warning">Mail</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-timeline timeline-new">
                                    <div className="t-dot" data-original-title="" title="">
                                        <div className="t-danger"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                    </div>
                                    <div className="t-content">
                                        <div className="t-uppercontent">
                                            <h5>Task Completed</h5>
                                            <span className="">01 Mar, 2020</span>
                                        </div>
                                        <p>Backup <span>Files EOD</span></p>
                                        <div className="tags">
                                            <div className="badge badge-primary">Backup</div>
                                            <div className="badge badge-success">EOD</div>
                                        </div>
                                    </div>
                                </div>                                     
                            </div>                                    
                        <div className="ps__rail-x" style={{ left: '0px', bottom: '0px;' }}><div className="ps__thumb-x" tabindex="0" style={{ left: '0px', width: '0px' }}>
                            </div></div>
                            <div className="ps__rail-y" style={{ top: '0px', height: '325px', right: '0px' }}>
                                <div className="ps__thumb-y" tabindex="0" style={{ top: '0px', height: '172px' }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile