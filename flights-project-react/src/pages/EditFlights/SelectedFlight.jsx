import React,{useState, useEffect} from 'react'
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import UpdateFlight from './UpdateFlight';


export default function SelectedFlight() {
    const nav = useNavigate()
    const API_URLS = {
        SELECT: 'http://localhost:3001/api/getFlightsInnerTableById/',        
        UPDATE: 'http://localhost:3001/api/updateFlight/',
        REMOVE: 'http://localhost:3001/api/removeFlight/',
        FLIGHT_INNER_TABLE: 'http://localhost:3001/api/flightsInnerTable',
        COUNTRIES: 'http://localhost:3001/api/getAllCountries',
        AIRLINES: 'http://localhost:3001/api/getAllAirlineCompanies',
    }

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);   


  //fetching apis data
  const fetchSelected = async (flightId) =>{  
    try {
        const response = await fetch(`${API_URLS.SELECT}${flightId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSelectedFlight(data[0]);
    } catch (error) {
        console.error('Error fetching flight details:', error);
    }
}

useEffect(()=>{
  const flightId = localStorage.getItem('flightId')
  fetchSelected(flightId)

})

//actions: update+delete+exit
  
const handleRemove = async(flightId) =>{
  try {
    const response = await axios.delete(`${API_URLS.REMOVE}${flightId}`);
    if (response.status === 200) {
      console.log(`Flight with ID ${flightId} successfully removed`);
      setSelectedFlight(null)
      alert('Removal Completed')
      nav('/flightsAdmin')
    } else {
        console.error(`Failed to remove flight with ID: ${flightId}`);
    }
    } catch (error) {
        console.error(`Error removing flight with ID: ${flightId}:`, error);
    }
}

const exit = () =>{
  setSelectedFlight(null)
  nav('/flightsAdmin')
  if(showUpdateForm) return setShowUpdateForm(false)
}
const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString(); // Converts to local time and formats
  };
  return (
    <div className="flights-select-container">
        <div className={`selected-flight ${selectedFlight ? 'show' : ''}`}>
        {selectedFlight && (
          <>
            <h2>Selected Flight</h2>
            <table>
              <thead>
                <tr>
                  <th>Flight ID</th>
                  <th>Airline</th>
                  <th>Origin Country</th>
                  <th>Destination Country</th>
                  <th>Departure Time</th>
                  <th>Landing Time</th>
                </tr>
              </thead>
              <tbody>
                <tr key={selectedFlight.id}>
                  <td className='id'>{selectedFlight.id}</td>
                  <td>{selectedFlight.airline_company_id}</td>
                  <td>{selectedFlight.origin_country_id}</td>
                  <td>{selectedFlight.destination_country_id}</td>
                  <td>{formatTime(selectedFlight.departure_time)}</td>
                  <td>{formatTime(selectedFlight.landing_time)}</td>
                </tr>
              </tbody>
            </table>
            <div className="actions">
              <button onClick={() => {
                setShowUpdateForm(true)
                }}>Update</button>
              <button className='book-btn' onClick={() => handleRemove(selectedFlight.id)}>Remove</button>
              <button onClick={exit}>Exit</button>
            </div>
          </>
        )}
      </div>
      {showUpdateForm && (
        <UpdateFlight selectedFlight={selectedFlight}/>
      )}
      <div>
    </div>
    </div>
  )
}
