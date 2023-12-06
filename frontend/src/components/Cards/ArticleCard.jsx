import React from 'react';
import '../../component-style/cards/card.css'

const spanStyle = { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }

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
                        <div className='w-100'>
                            <div className='row'>
                                <p className='badge badge-primary mx-2 col-3' style={spanStyle}>
                                    Author : {props.data.author?.name}
                                </p>
                                <p className='badge badge-success mx-2 col-3' style={spanStyle}>
                                    Category :{props.data.category?.name}
                                </p>
                                <p className='badge badge-secondary mx-2 col-3' style={spanStyle}>
                                    Source : {props.data.source?.name}
                                </p>
                            </div>
                        </div>
                        <div className="row border">
                            <div className="col-lg-12 col-md-12 col-sm-6 text-center m-auto p-3">
                                <h6>
                                    {props.data.description}
                                </h6>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 text-center m-auto p-3">
                                <h6>{props.data.published_at}</h6>
                            </div>
                            </div>
                            { props.cardFooter({
                                                prefix : props.prefix, 
                                                data : props.data,
                                                setShowModal : props.setShowModal,
                                                setSelectedModalData: props.setSelectedModalData,
                                                loading: props.loading,
                                            }) }
                    </div>
                </div>
            </div>
    );
};

export default ArticleCard;
