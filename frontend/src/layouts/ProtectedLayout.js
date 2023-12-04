import { Navigate, useOutlet  } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import SubHeader from '../components/SubHeader'
import Footer from '../components/Footer'
import SpinnerText from '../components/SpinnerText'
import { FilterProvider } from "../context/FilterContext";

const ProtectedLayout = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const outlet = useOutlet();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            return <Navigate to="/login" />;
        }
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    }, [token])
    
    return (
        <>
            {loading && 
                <SpinnerText />
            }
            <Navbar />
            <SubHeader />
            <div className="main-container" id="container">
                <FilterProvider>
                    <div id="content" className="main-content">
                        <div className="layout-px-spacing">
                            <div className="row layout-spacing layout-top-spacing">
                                {outlet}
                                <Footer />
                            </div>
                        </div>
                    </div>
                </FilterProvider>
            </div>
        </>
    )
};

export default ProtectedLayout