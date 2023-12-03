import React from 'react'

const index = ({t}) => {
    return (
        <div style={{ margin: "auto", width:"20%", margin:"auto"}}>
            <h4>loading</h4>
            <div className="">
                <div className="spinner-border ml-4" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        </div>
    )
}

export default index