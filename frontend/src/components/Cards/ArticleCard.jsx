import React from 'react';
import '../../component-style/cards/card.css'

const ArticleCard = (props) => {

    return (
            <div key={props.index} className=" col-lg-10 col-md-12 mx-auto my-3">
                <h5>
                    {props.data.title}
                </h5>
                <div className='component-card_10'>
                    <div className="text-right p-0">
                        <span className={`badge badge-${props.data.status?.label}`}>
                            {props.data.status?.title}
                        </span>
                    </div>
                    <div className="card-body">
                        <div className="progress-order">
                            <div className="progress-order-header">
                                <div className="row border">
                                    <div className="col-lg-3 col-md-6 col-sm-6 text-center m-auto p-3">
                                        <h6> {props.data.city} / {props.data.district}  
                                            <br/>
                                            <br/>
                                            {props.data.court}
                                        </h6>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 text-center m-auto p-3">
                                        <h6>{props.data.date.expiring_date}</h6>
                                        <h6>{props.data.time.begin_time} - {props.data.time.end_time} </h6>
                                    </div>
                                    <div className="col-lg-2 col-md-6 col-sm-6 text-center m-auto p-3">
                                        <h6>
                                            {props.data.price}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        <div className="row mt-4">
                                {props.data.items?.length > 0 &&
                                        props.data.items.map((team) => (
                                            <div key={team.id} className="col-lg-6 col-md-12">
                                                <h6>{team.title}</h6>
                                                
                                            </div>
                                    ))}
                                    
                                </div>
                            </div>
                            { props.cardFooter({
                                                t: props.t,
                                                prefix : props.prefix, 
                                                data : props.data,
                                                setShowModal : props.setShowModal,
                                                setSelectedModalData: props.setSelectedModalData,
                                                loading: props.loading,
                                                handleAction: props.handleAction,
                                                handleSendRequest: props.handleSendRequest
                                            }) }
                    </div>
                </div>
            </div>
    );
};

export default ArticleCard;
