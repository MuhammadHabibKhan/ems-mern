import React, { useState, useEffect } from 'react';
import './AttendanceForm.css';
import useAuth from '../useAuth';

const AttendanceForm = () => {

  const isAuthenticated = useAuth();

  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [overtime, setOvertime] = useState('');
  const [reportingTime, setReportingTime] = useState('');
  const [lateHours, setLateHours] = useState('');
  const [attendance, setAttendance] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Fetch the user list from the server
    fetchUserList();
  }, []);

  
  const fetchName = async () => {
    try {
      const response = await fetch(`/getName?username=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }});
        
        const data = await response.text();
        var parsedData = JSON.parse(data);
        setName(parsedData.fullName);
        
      } catch (error) {
        console.log('Error fetching name:', error);
      }
    };
    
  useEffect( () => {
    fetchName();
  }, [username]);


  const fetchUserList = async () => {
    try {
      const response = await fetch('/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }});
      
      const data = await response.text();
      var parsedData = JSON.parse(data);
      setUserList(parsedData);

    } catch (error) {
      console.log('Error fetching user list:', error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleOvertimeChange = (event) => {
    setOvertime(event.target.value);
  };

  const handleReportingTimeChange = (event) => {
    setReportingTime(event.target.value);
  };

  const handleLateHoursChange = (event) => {
    setLateHours(event.target.value);
  };

  const handleAttendanceChange = (event) => {
    setAttendance(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/attendanceUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            name: name,
            date: date,
            overtime: overtime,
            rptTime: reportingTime,
            lateHours: lateHours,
            attendance: attendance,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data inserted successfully:', data);
          alert("Data inserted successfully");
          // Handle success or update UI accordingly
        })
        .catch((error) => {
          console.error('Error inserting data:', error);
          alert("Error inserting data")
        });
  };

  if (isAuthenticated === true ) {
  return (
    <div className="attendance-form-container">
      <h2 className="form-heading">Attendance Form</h2>
      <form className="attendance-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="userID" className="form-label">
            Employee:
          </label>
          <select id="userID" className="form-select" value={username} onChange={handleUsernameChange} required>
            <option value="">Select Username</option>

            {userList.map((user) => (
              <option key={user._id} value={user.username}>
                {user.username}
              </option>
            ))}

          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input type="text" id="name" className="form-input" value={name} onChange={handleNameChange} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input type="date" id="date" className="form-input" value={date} onChange={handleDateChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="overtime" className="form-label">
            Overtime:
          </label>
          <input type="number" id="overtime" className="form-input" value={overtime} onChange={handleOvertimeChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="reportingTime" className="form-label">
            Reporting Time:
          </label>
          <input type="time" id="reportingTime" className="form-input" value={reportingTime} onChange={handleReportingTimeChange} />
        </div>

        <div className="form-group">
          <label htmlFor="lateHours" className="form-label">
            Late Hours:
          </label>
          <input type="number" id="lateHours" className="form-input" value={lateHours} onChange={handleLateHoursChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="attendance" className="form-label">
            Attendance:
          </label>
          <select id="attendance" className="form-select" value={attendance} onChange={handleAttendanceChange} required>
            <option value="">Select Attendance</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Mark</button>
      </form>
    </div>
  );
};

if (!isAuthenticated) {
  return null; // Redirection is handled in the hook, so no need to render anything
};

};

export default AttendanceForm;
