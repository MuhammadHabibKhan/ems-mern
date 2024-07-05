import React, { useState, useEffect } from 'react';
import useAuth from '../useAuth';

const EditWorker = () => {

  const isAuthenticated = useAuth();

  const [userName, setUserName] = useState('');
  const [emp_name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCNIC] = useState('');
  const [pass, setPass] = useState('');
  const [address, setAddress] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [salary, setSalary] = useState('');

  const [overtimeRate, setOvertimeRate] = useState('');
  const [skillArea, setSkillArea] = useState('');
  const [expertise, setExpertise] = useState('');
  const [workerList, setWorkerList] = useState([]);

  const handleJoinDateChange = (e) =>{
    setJoinDate(e.target.value);
  };

  const handleUserNameChange = (e) =>{
    setUserName(e.target.value);
  };

  const handleNameChange = (e) =>{
    setName(e.target.value);
  };

  const handlePhoneChange = (e) =>{
    setPhone(e.target.value);
  };

  const handleCnicChange = (e) =>{
    setCNIC(e.target.value);
  };

  const handlePassChange = (e) =>{
    setPass(e.target.value);
  };

  const handleAddressChange = (e) =>{
    setAddress(e.target.value);
  };

  const handleOvertimeChange = (e) =>{
    setOvertimeRate(e.target.value);
  };

  const handleSkillChange = (e) =>{
    setSkillArea(e.target.value);
  };

  const handleExpertise = (e) => {
    setExpertise(e.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  useEffect(() => {
    fetchWorkerList();
  }, []);

  useEffect(() => {
    fetchData();
  }, [userName]);

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
      setPass(parsedData.password);
      setCNIC(parsedData.cnic);
      setPhone(parsedData.phone);
      setAddress(parsedData.address);
      setJoinDate(parsedData.joinDate);
      setSalary(parsedData.salary);
      setOvertimeRate(parsedData.overtimeRate);
      setSkillArea(parsedData.skillArea);
      setExpertise(parsedData.expertise);

    } catch (error) {
      console.log('Error fetching name:', error);
    }
  };

  const fetchWorkerList = async () => {
    try {
      const response = await fetch('/getWorker', {
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
    
    fetch(`/EditWorker?username=${encodeURIComponent(userName)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: userName,
            password: pass,
            fullName: emp_name,
            cnic: cnic,
            phone: phone,
            address: address,
            joinDate: joinDate,
            overtimeRate: overtimeRate,
            skillArea: skillArea,
            expertise: expertise,
            salary: salary
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data updated successfully:', data);
          alert("Data updated successfully");
        })
        .catch((error) => {
          console.error('Error updating data:', error);
          alert("Error updating data")
        });
  };

  const handleReset = (event) => {
    event.preventDefault();
    
    fetch(`/DeleteWorker?username=${encodeURIComponent(userName)}`, {
        method: 'DELETE'
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Worker deleted successfully:', data);
          alert("Worker deleted successfully");
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
          alert("Error deleting data")
        });
  };

  if (isAuthenticated === true ) {
  return (
    <div className="attendance-form-container1">
      <h2 className="form-heading">Edit Worker Profile</h2>
      <form className="attendance-form" onSubmit={handleSubmit} onReset={handleReset}>

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
          <label htmlFor="pass" className="form-label">
            Password:
          </label>
          <input type="password" id="pass" className="form-input" value={pass} onChange={handlePassChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name:
          </label>
          <input type="text" id="name" className="form-input" value={emp_name} onChange={handleNameChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="cnic" className="form-label">
            CNIC No:
          </label>
          <input type="number" id="cnic" className="form-input" value={cnic} onChange={handleCnicChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone No:
          </label>
          <input type="number" id="phone" className="form-input" value={phone} onChange={handlePhoneChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input type="text" id="address" className="form-input" value={address} onChange={handleAddressChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Join Date:
          </label>
          <input type="date" id="date" className="form-input" value={joinDate} onChange={handleJoinDateChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="salary" className="form-label">
            Salary:
          </label>
          <input type="number" id="salary" className="form-input" value={salary} onChange={handleSalaryChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="overtime" className="form-label">
            OT Rate:
          </label>
          <input type="number" step="0.1" id="overtime" className="form-input" value={overtimeRate} onChange={handleOvertimeChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="skill" className="form-label">
            Skill Area:
          </label>
          <input type="text" id="skill" className="form-input" value={skillArea} onChange={handleSkillChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="expertise" className="form-label">
            Expertise:
          </label>
          <input type="text" id="expertise" className="form-input" value={expertise} onChange={handleExpertise} required />
        </div>

        <button type="submit" className="submit-button">Update</button>
        <button type="reset" className="delete-button">Delete</button>
      </form>
    </div>
  );
};

if (!isAuthenticated) {
  return null; // Redirection is handled in the hook, so no need to render anything
};

};

export default EditWorker;
