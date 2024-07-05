import React from 'react';
import './index.css';
import TodoList from '../TodoList';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuth from '../useAuth';

const Dashboard = () => {

  const isAuthenticated = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state?.uname;    
  
  const handleAttendance = () => {
    navigate('/Attendance')
  };

  const handleEditProfile = () => {
    console.log('Edit user profile');
    navigate('/EditProfile', {state: {adminText:"Edit Admin Profile", workerText: "Edit Worker Profile", clientText: "Edit Client Profile"}})
  };

  const handleNewOrder = () => {
    console.log('Add new order');
    navigate('/NewOrder')
  };

  const handleEditOrder = () => {
    console.log('Edit Order');
    navigate('/EditOrder');
  };

  const handleAddUser = () => {
    navigate('/NewProfile', {state: {adminText:"Add New Admin", workerText: "Add New Worker", clientText: "Add New Client"}})
  };

  const handleEmpData = () => {
    navigate('/EmpData');
  };

  const [user, setUser] = useState();

  const fetchUser = async () => {
    try {
      const response = await fetch(`/getName?username=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }});
      
      const data = await response.text();
      var parsedData = JSON.parse(data);
      
      console.log(parsedData);
      setUser(parsedData.fullName);

    } catch (error) {
      console.log('Error fetching name:', error);
    }
  };

  useEffect(() => {
    // Fetch the user list from the server
    fetchUser();
  }, []);


  if (isAuthenticated === true ) {
      return (
    <div className='dash'>
        <div className="admin-dashboard">

            <div className="dashboard-cover">
                <div className="profile-icon"></div>
            </div>

            <h1 className="dashboard-title">Welcome, {user}!</h1>
        </div>
        <div className='main'>
            <div className='dashboard-options'>
  
                <div className="container" onClick={handleAttendance}>
                    <img src={require('./calender.png')} className="image" alt='calender'/>
                    <div className="overlay">
                        <div className="text">Mark Attendance</div>
                    </div>
                </div>

                <div className="container" onClick={handleAddUser}>
                    <img src={require('./userplus.png')} className="image" alt='add user'/>
                    <div className="overlay">
                        <div className="text">New Profile</div>
                    </div>
                </div>

                <div className="container" onClick={handleEditProfile}>
                    <img src={require('./userchange.png')} className="image" alt='edit user'/>
                    <div className="overlay">
                        <div className="text">Edit User Profile</div>
                    </div>
                </div>

                {/* <div className="container" onClick={handleNewOrder}>
                    <img src={require('./order.png')} className="image"/>
                    <div className="overlay">
                        <div className="text">Add New Order</div>
                    </div>
                </div> */}

                <hr/>
            </div>

            <div className='todo'>
                <TodoList/>
            </div>

        </div>

        <div className='dashboard-options'>
        
          <div className="container" onClick={handleNewOrder}>
              <img src={require('./order.png')} className="image" alt='add order'/>
                <div className="overlay">
                    <div className="text">Add New Order</div>
                </div>
          </div>

          <div className="container" onClick={handleEditOrder}>
              <img src={require('./orderchange.png')} className="image" alt='edit order'/>
                <div className="overlay">
                    <div className="text">Edit Order</div>
                </div>
          </div>

          <div className="container" onClick={handleEmpData}>
              <img src={require('./employee.png')} className="image" alt='employee data'/>
                <div className="overlay">
                    <div className="text">Employee Data</div>
                </div>
          </div>

          <hr/>

        </div>

    </div>
  );
}

if (!isAuthenticated) {
  return null; // Redirection is handled in the hook, so no need to render anything
}

};

export default Dashboard;
