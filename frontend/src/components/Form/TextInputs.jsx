import React from 'react'

const TextInputs = ({loading, 
                     colSize = 4, 
                     handleChange,
                     formData, 
                     handleSubmit,
                     t }) => {
      return (
        <div>
            {
                loading ? (
                <div style={{ margin: 'auto',  width:'20%', justifyContent: 'center', display:"flex"}}>
                    <h4 className='mr-3'>{ t('loading') }</h4>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">{ t('loading') }...</span>
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="widget-content widget-content-area">
                            <div className="row">
                            { formData.map((item, i) => {
                                    return (
                                    <div key={i} className={`col-${colSize}`}>
                                        <div className="form-group d-flex" style={{borderRadius:"10px"}}>
                                        <p>
                                            {t(item.title_tr)}
                                        </p>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={item.value}
                                            id={item.input_id}
                                            onChange={handleChange}
                                        />
                                        </div>
                                    </div>
                                    );
                                })}
                                </div>
                            <button className='btn btn-success' type="submit" onClick={handleSubmit}>Submit</button>
                        <div>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default TextInputs