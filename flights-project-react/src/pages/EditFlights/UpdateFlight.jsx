// updateFlight.js

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../../api/axios';

export default function UpdateFlight({ selectedFlight }) { // Pass selectedFlight as prop
    const API_URLS = {
        SELECT: 'http://localhost:3001/api/getFlightsInnerTableById/',
        UPDATE: 'http://localhost:3001/api/updateFlight/',
        REMOVE: 'http://localhost:3001/api/removeFlight/',
        FLIGHT_INNER_TABLE: 'http://localhost:3001/api/flightsInnerTable',
        COUNTRIES: 'http://localhost:3001/api/getAllCountries',
        AIRLINES: 'http://localhost:3001/api/getAllAirlineCompanies',
    };

    const [countriesDB, setCountriesDB] = useState([]); // Fix typo
    const [airlinesDB, setAirlinesDB] = useState([]);
    const [updateValues, setUpdateValues] = useState({
        airline_company_id: '',
        origin_country_id: '',
        destination_country_id: '',
        departure_time: new Date(),
        landing_time: new Date(),
        remaining_tickets: ''
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        const formattedDepartureTime = updateValues.departure_time.toISOString().slice(0, 19).replace('T', ' ');
        const formattedLandingTime = updateValues.landing_time.toISOString().slice(0, 19).replace('T', ' ');

        axios.put(`${API_URLS.UPDATE}${selectedFlight.id}`, { // Use selectedFlight.id for updating
            airline_company_id: updateValues.airline_company_id,
            origin_country_id: updateValues.origin_country_id,
            destination_country_id: updateValues.destination_country_id,
            departure_time: formattedDepartureTime,
            landing_time: formattedLandingTime,
            remaining_tickets: updateValues.remaining_tickets
        })
            .then(res => {
                console.log('Res Data: ', res.data);
                setUpdateValues({
                    ...updateValues,
                    airline_company_id: res.data.airline_company_id,
                    origin_country_id: res.data.origin_country_id,
                    destination_country_id: res.data.destination_country_id,
                    departure_time: res.data.departure_time,
                    landing_time: res.data.landing_time,
                    remaining_tickets: res.data.remaining_tickets
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const fetchCountries = () => {
        fetch(API_URLS.COUNTRIES)
            .then(response => response.json())
            .then(data => {
                setCountriesDB(data);
            })
            .catch(err => console.log('fetch Countries Error :', err));
    };

    const fetchAirlines = () => {
        fetch(API_URLS.AIRLINES)
            .then(response => response.json())
            .then(data => {
                setAirlinesDB(data);
            })
            .catch(err => console.log('fetch Airlines Error :', err));
    };

    useEffect(() => {
        fetchAirlines();
        fetchCountries();
    }, []);

    return (
        <div>
            <div className="update-form">
                <form onSubmit={handleUpdate}>
                    <label>Airline</label>
                    <select
                        value={updateValues.airline_company_id}
                        onChange={e => setUpdateValues({ ...updateValues, airline_company_id: e.target.value })}
                    >
                        <option>Select Airline</option>
                        {airlinesDB.map((airline) => (
                            <option key={airline.id} value={airline.id}>
                                {airline.airline_name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label>Origin Country</label>
                    <select
                        value={updateValues.origin_country_id}
                        onChange={e => setUpdateValues({ ...updateValues, origin_country_id: e.target.value })}
                    >
                        <option>Select Country</option>
                        {countriesDB.map((countries) => (
                            <option key={countries.id} value={countries.id}>
                                {countries.country_name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label>Destination Country</label>
                    <select
                        value={updateValues.destination_country_id}
                        onChange={e => setUpdateValues({ ...updateValues, destination_country_id: e.target.value })}
                    >
                        <option>Select Country</option>
                        {countriesDB.map((countries) => (
                            <option key={countries.id} value={countries.id}>
                                {countries.country_name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label>Departure Time</label>
                    <DatePicker
                        selected={updateValues.departure_time}
                        onChange={(date) => setUpdateValues({ ...updateValues, departure_time: date })}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                    />
                    <br />
                    <label>Landing Time</label>
                    <DatePicker
                        selected={updateValues.landing_time}
                        onChange={(date) => setUpdateValues({ ...updateValues, landing_time: date })}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                    />
                    <br />
                    <label>Tickets Amount</label>
                    <input
                        type="text"
                        placeholder="Type Amount"
                        value={updateValues.remaining_tickets}
                        onChange={e => setUpdateValues({ ...updateValues, remaining_tickets: e.target.value })}
                    />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
