import React, { useState, useEffect } from 'react';
import useAuth from '../useAuth';

const EmpData = () => {

  const isAuthenticated = useAuth();

  const [userName, setUserName] = useState('');
  const [emp_name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salary, setSalary] = useState('');
  const [overtimeHours, setOvertimeHours] = useState('');
  const [lateHours, setLateHours] = useState('');
  const [absents, setAbsents] = useState('');
  const [workerList, setWorkerList] = useState([]);
  const [overtimeRate, setOvertimeRate] = useState('');
  const [accSalary, setAccSalary] = useState('');

  const handleStartDateChange = (e) =>{
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  }

  const handleUserNameChange = (e) =>{
    setUserName(e.target.value);
  };

  const handleNameChange = (e) =>{
    setName(e.target.value);
  };

  const handleOvertimeHours = (e) =>{
    setOvertimeHours(e.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleLateHoursChange = (e) => {
    setLateHours(e.target.value);
  };

  const handleAbsentChange = (e) => {
    setAbsents(e.target.value);
  };

  const handleAccSalaryChange = (e) => {
    setAccSalary(e.target.value);
  };

  useEffect(() => {
    fetchWorkerList();
  }, []);

  useEffect(() => {
    fetchData();
  }, [userName]);

  const fetchAttendance = async () => {
    try {
        const response = await fetch(`/getAttendance?username=${encodeURIComponent(userName)}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }});
        
        const data = await response.text();
        var parsedData = JSON.parse(data);
        let totalDays = parsedData.length;

        let ot_hours = 0;
        let late_hours = 0;
        let absentCount = 0;

        parsedData.forEach(element => {
            ot_hours += element.overtime;
            late_hours += element.lateHours;

            if (element.attendance == "absent") {
                absentCount += 1;
            }
        });

        setOvertimeHours(ot_hours);
        setLateHours(late_hours);
        setAbsents(absentCount);

        // calculate Salary

        let perHourSalary = salary / 208;
        let overtimeSalary = overtimeRate * overtimeHours;
        let lateSalaryDeductions = lateHours * perHourSalary;
        let absentSalaryDeductions = absentCount * 8 * perHourSalary;
        let totalHours = 8 * totalDays;
        let sal = totalHours * perHourSalary;

        let totalSalary = 0;

        if (!isNaN(overtimeSalary)) {
            totalSalary = overtimeSalary - lateSalaryDeductions - absentSalaryDeductions + sal;
        }
        else {
            totalSalary =  sal + lateSalaryDeductions - absentSalaryDeductions;
        }

        setAccSalary(Math.ceil(totalSalary));
                
      } catch (error) {
        console.log('Error fetching name:', error);
      }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/getName?username=${encodeURIComponent(userName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }});
      
      const data = await response.text();
      var parsedData = JSON.parse(data);
      
      console.log(parsedData);
      
      setName(parsedData.fullName);
      setSalary(parsedData.salary);
      setOvertimeRate(parsedData.overtimeRate);
      
    } catch (error) {
      console.log('Error fetching name:', error);
    }
  };

  const fetchWorkerList = async () => {
    try {
      const response = await fetch('/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }});
      
      const data = await response.text();
      var parsedData = JSON.parse(data);
      setWorkerList(parsedData);

    } catch (error) {
      console.log('Error fetching user list:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchAttendance();
  }

  if (isAuthenticated === true ) {
  return (
    <div className="attendance-form-container1">
      <h2 className="form-heading">Employee Salary and Attendance Summary</h2>
      <form className="attendance-form" onSubmit={handleSubmit}>

      <div className="form-group">
          <label htmlFor="userID" className="form-label">
            Username:
          </label>
          <select id="userID" className="form-select" value={userName} onChange={handleUserNameChange} required>
            <option value="">Select Username</option>

            {workerList.map((user) => (
              <option key={user._id} value={user.username}>
                {user.username}
              </option>
            ))}

          </select>
        </div>

        <div className="form-group">
          <label htmlFor="startDate" className="form-label">
            Start Date:
          </label>
          <input type="date" id="startDate" className="form-input" value={startDate} onChange={handleStartDateChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="endDate" className="form-label">
            End Date:
          </label>
          <input type="date" id="endDate" className="form-input" value={endDate} onChange={handleEndDateChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name:
          </label>
          <input type="text" id="name" className="form-input" value={emp_name} onChange={handleNameChange} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="salary" className="form-label">
            Salary:
          </label>
          <input type="number" id="salary" className="form-input" value={salary} onChange={handleSalaryChange} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="overTimeHours" className="form-label">
            OT Hours:
          </label>
          <input type="number" step="1" id="overTimeHours" className="form-input" value={overtimeHours} onChange={handleOvertimeHours} readonly="readonly" />
        </div>

        <div className="form-group">
          <label htmlFor="lateHours" className="form-label">
            Late Hours:
          </label>
          <input type="number" step="1" id="lateHours" className="form-input" value={lateHours} onChange={handleLateHoursChange} readonly="readonly" />
        </div>

        <div className="form-group">
          <label htmlFor="absents" className="form-label">
            Absents:
          </label>
          <input type="number" step="1" id="absents" className="form-input" value={absents} onChange={handleAbsentChange} readonly="readonly" />
        </div>

        <div className="form-group">
          <label htmlFor="accSalary" className="form-label">
          Accumulated Salary:
          </label>
          <input type="number" step="1" id="accSalary" className="form-input" value={accSalary} onChange={handleAccSalaryChange} readonly="readOnly" />
        </div>

        <button type="submit" className="submit-button">Check</button>
      </form>
    </div>
  );
};

if (!isAuthenticated) {
  return null; // Redirection is handled in the hook, so no need to render anything
};

};

export default EmpData;
