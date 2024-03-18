import React, { useState, useEffect } from 'react';

import ResultCard from "../components/ResultCard"

export default function Search() {
    const [ events, setEvents ] = useState([])
    const [ text, setText ] = useState("")

    // Used for obtaining the JSON data locally. May need to change for when we get data from Database
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/events.json')
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const data = await response.json()
                setEvents(data)
            } catch (err) {
                console.error('Error fetching data:', err)
            }
        };
        fetchData()
    }, [])
    
    return (
        <>
            <div className="search-container">
                <form onSubmit={e => {
                    e.preventDefault()
                 }}>
                    <input 
                        value={text}  
                        className="search-input" 
                        placeholder={`Enter an event...`}
                        onChange={(e) => setText(e.target.value)} />
                </form>
            </div>
            <div className="results-container">
                {events.filter(event => text === "" || event.name.toLowerCase().includes(text.toLowerCase())).map((event, index) => (
                    <ResultCard 
                        key={index}
                        id={event.id}
                        url={event.url}
                        name={event.name}
                        location={event.location}
                        date={event.date}
                        time={event.time}
                    />
                ))}
            </div>
        </>
    )
}
