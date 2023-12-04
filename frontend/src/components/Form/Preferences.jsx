import React from 'react'
import Spinner from '../SpinnerText' 

const Preferences = ({loading, 
                   colSize = 3,
                   buttonDisabled, 
                   handleChange,
                   data, 
                   handleSubmit }) => {
    return (
        <div>
            {
                loading ? (
                        <Spinner />
                ) : data && (
                    <div className="widget-content widget-content-area">
                            <div className="row">
                            { data.map((item, i) => {
                                    return (
                                    <div key={i} className={`col-lg-${colSize} col-sm-12`}>
                                        <div className="form-group d-flex border border-radius p-2 text-center" 
                                             style={{borderRadius:"10px"}}
                                             >
                                        <p className='w-75 my-auto'>
                                            {item.name}
                                        </p>
                                        <input
                                            className="form-control custom-checkbox"
                                            type="checkbox"
                                            checked={item.value}
                                            value={item.value}
                                            id={item.id}
                                            onChange={(e) => handleChange(e)}
                                        />
                                        </div>
                                    </div>
                                    );
                                })}
                                </div>
                            <button className='btn btn-success' 
                                    type="submit" 
                                    onClick={handleSubmit}
                                    disabled={buttonDisabled}
                                    >
                                        {
                                            buttonDisabled ? (
                                                <span className=" spinner-border">
                                                </span>
                                            ) : 'Submit' 
                                        }
                                        
                            </button>
                        <div>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default Preferences