import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useAuth from '../useAuth';

const EditProfile = () => {

    const isAuthenticated = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    let adminText = location.state?.adminText;
    let workerText = location.state?.workerText;
    let clientText = location.state?.clientText;

    const handleAdmin = (e) => {
        navigate('/EditAdmin')
    }

    const handleWorker = (e) => {
        navigate('/EditWorker')
    }

    const handleClient = (e) => {
        navigate('/EditClient');
    }

    if (isAuthenticated === true ) {
    return(
        <div className='newprofilecontainer'>
            <div className='admin' onClick={handleAdmin}>
                <img src={require('./adminIcon.png')} className="adminImage"/>
                <div className="overlay">
                    <div className="text">{adminText}</div>
                </div>    
            </div>

            <div className='admin' onClick={handleWorker}>
                <img src={require('./worker.png')} className="workerImage"/>
                <div className="overlay">
                    <div className="text">{workerText}</div>
                </div>    
            </div>

            <div className='admin' onClick={handleClient}>
                <img src={require('./client.png')} className="workerImage"/>
                <div className="overlay">
                    <div className="text">{clientText}</div>
                </div>    
            </div>
            
        </div>
    );
};

if (!isAuthenticated) {
    return null; // Redirection is handled in the hook, so no need to render anything
}

};

export default EditProfile;
