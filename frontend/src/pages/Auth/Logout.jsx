import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const Navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        localStorage.removeItem('token');
        setTimeout(() => {
            Navigate('/login')
        }, 1500)
    })

  return (
        <>
            {loading ? (
                <div style={{ margin: "auto", width:"20%", marginTop:"20%", justifyContent: "center"}}>
                <h4>logging_out...</h4>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">loading...</span>
                    </div>
                </div>
            </div>
            ) : (
                <div></div>
            )}
        </>
  )
}

export default Logout