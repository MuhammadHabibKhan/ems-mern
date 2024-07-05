import React, { useState, useEffect } from 'react';
import '../NewAdmin/index.css';
import useAuth from '../useAuth';

const NewOrder = () => {
  
    const isAuthenticated = useAuth();

    const [company, setCompany] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [material, setMaterial] = useState('');
    const [totalRunningFT, setTotalRunningFT] = useState('');
    const [ratePerFT, setRatePerFT] = useState('');
    const [color, setColor] = useState('');
    const [cost, setCost] = useState('');
    const [advance, setAdvance] = useState('');
    const [oldBalance, setOldBalance] = useState('');

    const [companyList, setCompanyList] = useState([]);

    useEffect(() => {
      fetchClientList();
    }, []);

    const updateBalance = async () => {

      fetch(`/EditClient?company=${encodeURIComponent(company)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            balance: oldBalance + cost - advance
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
    }

    useEffect(() => {
      fetchBalance();
    }, [company]);
  
    const fetchBalance = async () => {
      try {
        const response = await fetch(`/getCompany?company=${encodeURIComponent(company)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }});
        
        const data = await response.text();
        var parsedData = JSON.parse(data);
        setOldBalance(parsedData.balance);
  
      } catch (error) {
        console.log('Error fetching name:', error);
      }
    };

    useEffect(() => {
      setCost(totalRunningFT * ratePerFT);
    }, [totalRunningFT, ratePerFT]);

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

    const handleMaterialChange = (e) =>{
      setMaterial(e.target.value);
    };

    const handleTotalRunningFT = (e) =>{
      setTotalRunningFT(e.target.value);
    };

    const handleRatePerFT = (e) =>{
      setRatePerFT(e.target.value);
    };

    const handleColorChange = (e) =>{
      setColor(e.target.value);
    };

    const handleCostChange = (e) =>{
      setCost(e.target.value);
    };

    const handleAdvanceChange = (e) =>{
      setAdvance(e.target.value);
    };

    const handleCompanyChange = (e) =>{
      setCompany(e.target.value);
    };

    const handleOrderDateChange = (e) => {
      setOrderDate(e.target.value);
    }

    const handleSubmit = (event) =>
    {
      event.preventDefault();
    
      fetch('/NewOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company: company,
            date: orderDate,
            material: material,
            totalFT: totalRunningFT,
            ratePerFT: ratePerFT,
            color: color,
            totalCost: cost,
            advance: advance
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Data inserted successfully:', data);
            alert("Data inserted successfully");
          })
          .catch((error) => {
            console.error('Error inserting data:', error);
            alert("Error inserting data")
          });
      updateBalance();
    };

  if (isAuthenticated === true ) {
    return (
        <div className="attendance-form-container1">
          <h2 className="form-heading">Create New Order</h2>
          <form className="attendance-form" onSubmit={handleSubmit}>
    
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
              <label htmlFor="date" className="form-label">
                Date:
              </label>
              <input type="date" id="date" className="form-input" value={orderDate} onChange={handleOrderDateChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="orderID" className="form-label">
                Material:
              </label>
              <input type="text" id="orderID" className="form-input" value={material} onChange={handleMaterialChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="totalFT" className="form-label">
                Total Ft:
              </label>
              <input type="Number" step={"0.1"} id="totalFT" className="form-input" value={totalRunningFT} onChange={handleTotalRunningFT} required />
            </div>

            <div className="form-group">
              <label htmlFor="rate" className="form-label">
                Rate / Ft:
              </label>
              <input type="Number" step={"1"} id="rate" className="form-input" value={ratePerFT} onChange={handleRatePerFT} required />
            </div>

            <div className="form-group">
              <label htmlFor="color" className="form-label">
                Color:
              </label>
              <input type="text" id="color" className="form-input" value={color} onChange={handleColorChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="cost" className="form-label">
                Total Cost:
              </label>
              <input type="Number" id="cost" className="form-input" value={cost} onChange={handleCostChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="advance" className="form-label">
                Advance:
              </label>
              <input type="Number" id="advance" className="form-input" value={advance} onChange={handleAdvanceChange} required />
            </div>
            
            <button type="submit" className="submit-button">Create</button>
          </form>
        </div>
      );
    };

    if (!isAuthenticated) {
      return null; // Redirection is handled in the hook, so no need to render anything
    };

};
    
export default NewOrder;
