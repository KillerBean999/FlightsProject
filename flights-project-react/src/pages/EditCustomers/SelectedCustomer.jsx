import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
const API_URLS = {
  CUSTOMER_BY_ID : 'http://localhost:3001/api/getCustomerById/',//:id
  UPDATE_CUSTOMER : 'http://localhost:3001/api/updateCustomer/',//:id
  DELETE_CUSTOMER : 'http://localhost:3001/api/removeCustomer/',//:id
}


export default function SelectedCustomer() {
    const nav = useNavigate()
    const [selectedCustomer, setSelectedCustomer] = useState(null)

    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [updateValues, setUpdateValues] = useState({
        fname: '',
        lname: '',
        address: '',
        phone_no: '',
        credit_card_no: '',
        email: '',
    })

const fetchSelectedData = async (customerId) =>{  
    try {
        const response = await fetch(`${API_URLS.CUSTOMER_BY_ID}${customerId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('data: ',data);
        setSelectedCustomer(data[0]);
    } catch (error) {
        console.error('Error fetching customer details:', error);
    }
}

useEffect(()=>{
const customerId = localStorage.getItem('customerId')
if(customerId) fetchSelectedData(customerId)
else alert('Something went wrong')
  },[])

const handleUpdate = async () =>{   
    await axios.put(`${API_URLS.UPDATE_CUSTOMER}${selectedCustomer.id}`,{
        fname: updateValues.fname,
        lname: updateValues.lname,
        address: updateValues.address,
        phone_no: updateValues.phone_no,
        credit_card_no: updateValues.credit_card_no,
        email: updateValues.email,
    })
    .then( res => {
        console.log('Res Data: ',res.data);
        setUpdateValues({
            ...updateValues,
            fname: res.data.fname,
            lname: res.data.lname,
            address: res.data.address,
            phone_no: res.data.phone_no,
            credit_card_no: res.data.credit_card_no,
            email: res.data.email,
        })
    }).catch(err => console.log('Fetch Update ',err))
}


  return (
    <>
<div className='flights-select-container'>
    {showUpdateForm ? (
        <form onSubmit={handleUpdate}>
            
            <label>First Name</label>
            <input type='text'
            value={updateValues.fname}
            onChange={ e => setUpdateValues({
                ...updateValues, fname : e.target.value
            })}
            />

<label>First Name</label>
            <input type='text'
            value={updateValues.fname}
            onChange={ e => setUpdateValues({
                ...updateValues, fname : e.target.value
            })}
            />

<label>Last Name</label>
            <input type='text'
            value={updateValues.lname}
            onChange={ e => setUpdateValues({
                ...updateValues, lname : e.target.value
            })}
            />

<label>Address</label>
            <input type='text'
            value={updateValues.address}
            onChange={ e => setUpdateValues({
                ...updateValues, address : e.target.value
            })}
            />

<label>Phone Number</label>
            <input type='text'
            value={updateValues.phone_no}
            onChange={ e => setUpdateValues({
                ...updateValues, phone_no : e.target.value
            })}
            />

<label>Credit Card Number</label>
            <input type='text'
            value={updateValues.credit_card_no}
            onChange={ e => setUpdateValues({
                ...updateValues, credit_card_no : e.target.value
            })}
            />

<label>Email</label>
            <input type='text'
            value={updateValues.email}
            onChange={ e => setUpdateValues({
                ...updateValues, email : e.target.value
            })}
            />
<button>Submit</button>
<button onClick={()=> setShowUpdateForm(false)}>Exit</button>
        </form>
    ) : (
        <React.Fragment>
            <h2>Customer Details</h2>
            {selectedCustomer ? (
                <div className='customer-details'>   
                    <p><strong>ID:</strong> {selectedCustomer.id}</p>
                    <p><strong>First Name:</strong> {selectedCustomer.fname}</p>
                    <p><strong>Last Name:</strong> {selectedCustomer.lname}</p>
                    <p><strong>Address:</strong> {selectedCustomer.address}</p>
                    <p><strong>Phone Number:</strong> {selectedCustomer.phone_no}</p>
                    <p><strong>Credit Card Number:</strong> {selectedCustomer.credit_card_no}</p>
                    <p><strong>Email:</strong> {selectedCustomer.email}</p>
                     {/* actions */}
                     <button onClick={()=> nav('/customerList')}>Exit</button>
                     <button onClick={() => setShowUpdateForm(true)}>Update</button>
                     <button >Remove</button>
                </div>
            ) : (   
                <p className='loading'>Loading...</p>
            )}
        </React.Fragment>
    )}
</div>

        </>
  )
}
