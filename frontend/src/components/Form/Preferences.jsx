import React from 'react'
import Spinner from '../SpinnerText' 

const Preferences = ({loading, 
                        colSize = 3,
                        buttonDisabled, 
                        handleChange,
                        data, 
                        handleSubmit }) => {
    return (loading ? (
                        <Spinner />
                ) : data && (
                    <>
                    <div className="row w-75 m-auto">
                            { data.map((item, i) => {
                                return (
                                    <div key={i} className={`col-lg-${colSize} col-sm-2`}>
                                        <div className="form-group d-flex border border-radius p-2 text-center" 
                                             style={{borderRadius:"10px"}}
                                             >
                                        <p className='w-75 my-auto' style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                            {item.name}
                                        </p>

                                        <input type="checkbox"
                                                checked={item.checked}
                                                value={item.checked}
                                                id={item.id}
                                                onChange={(e) => handleChange(e)}
                                                style={{ scale:'1.5' }}
                                        />
                                        </div>
                                    </div>
                                    );
                                })}
                           
                    </div>
                     <button className='btn btn-success btn-lg float-right' 
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
             </>
                )
            )
}

export default Preferences