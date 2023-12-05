import React from 'react'
import { BiDetail } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const CardFooter = (props) => {
    return (
        <div className="row mt-4">
            <div className='col-md-12 btn-group my-2'>
                <Link to={`/articles/${props.data.slug}/profile`} className='btn btn-dark mx-2'>
                    <h6>
                        <BiDetail /> 
                    </h6>
                </Link>
                {
                    props.handleAction.map((item, index) => (
                        <button key={index} className={`btn ${item.color ? 'btn-'+item.color : 'btn-dark'} mx-2`}
                                onClick={() => item.method(props.data)}
                            >
                            <h6> 
                                {item.icon}
                            </h6>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default CardFooter