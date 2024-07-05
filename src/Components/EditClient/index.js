import React, { useState, useEffect } from 'react';
import useAuth from '../useAuth';

const EditClient = () => {

  const isAuthenticated = useAuth();

  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCNIC] = useState('');
  const [ntn, setNTN] = useState('');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [companyList, setCompanyList] = useState([]);
  

  const handleCompanyChange = (e) =>{
    setCompany(e.target.value);
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

  const handleAddressChange = (e) =>{
    setAddress(e.target.value);
  };

  const handleNTNChange = (e) => {
    setNTN(e.target.value);
  };

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };


  useEffect(() => {
    fetchClientList();
  }, []);

  useEffect(() => {
    fetchData();
  }, [company]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/getCompany?company=${encodeURIComponent(company)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }});
      
      const data = await response.text();
      var parsedData = JSON.parse(data);
      
      console.log(parsedData);
      
      setName(parsedData.owner);
      setCNIC(parsedData.cnic);
      setPhone(parsedData.phone);
      setAddress(parsedData.address);
      setBalance(parsedData.balance);
      setNTN(parsedData.ntn);

    } catch (error) {
      console.log('Error fetching name:', error);
    }
  };

  const fetchClientList = async () => {
    try {
      const response = await fetch('/getClient', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }});
      
      const data = await response.text();
      var parsedData = JSON.parse(data);
      setCompanyList(parsedData);

    } catch (error) {
      console.log('Error fetching user list:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch(`/EditClient?company=${encodeURIComponent(company)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            company: company,
            owner: name,
            cnic: cnic,
            phone: phone,
            address: address,
            ntn: ntn,
            balance: balance
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
    
    fetch(`/DeleteClient?company=${encodeURIComponent(company)}`, {
        method: 'DELETE'
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Client deleted successfully:', data);
          alert("Client deleted successfully");
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
          alert("Error deleting data")
        });
  };

  if (isAuthenticated === true ) {
  return (
    <div className="attendance-form-container1">
      <h2 className="form-heading">Edit Client Profile</h2>
      <form className="attendance-form" onSubmit={handleSubmit} onReset={handleReset}>

      <div className="form-group">
          <label htmlFor="userID" className="form-label">
            Company:
          </label>
          <select id="userID" className="form-select" value={company} onChange={handleCompanyChange} required>
            <option value="">Select Company</option>

            {companyList.map((user) => (
              <option key={user._id} value={user.company}>
                {user.company}
              </option>
            ))}

          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Owner:
          </label>
          <input type="text" id="name" className="form-input" value={name} onChange={handleNameChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="cnic" className="form-label">
            CNIC No:
          </label>
          <input type="number" id="cnic" className="form-input" value={cnic} onChange={handleCnicChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="ntn" className="form-label">
            NTN:
          </label>
          <input type="number" id="ntn" className="form-input" value={ntn} onChange={handleNTNChange} required />
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
          <label htmlFor="balance" className="form-label">
            Balance:
          </label>
          <input type="number" id="balance" className="form-input" value={balance} onChange={handleBalanceChange} required />
        </div>

        <button type="submit" className="submit-button">Update</button>
        <button type="reset" className="delete-button">Delete</button>

      </form>
    </div>
  );
};

if (!isAuthenticated) {
  return null; // Redirection is handled in the hook, so no need to render anything
}

};

export default EditClient;
