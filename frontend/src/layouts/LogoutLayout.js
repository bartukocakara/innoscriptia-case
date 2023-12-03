import { Outlet } from "react-router-dom";
import '../component-style/authentication/form-1.css'
import '../component-style/cards/tabs-accordian/custom-accordions.css'

const LogoutLayout = () => {
    localStorage.clear();
    
    return (
        <div className="form-container">
            <div className="form-form">
                <div className="form-form-wrap">
                    <div className="form-container">
                        <div className="container jumbotron">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LogoutLayout;