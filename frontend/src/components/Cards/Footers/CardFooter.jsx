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
            </div>
        </div>
    )
}

export default CardFooter