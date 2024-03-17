import React, { useState, useEffect } from 'react';

import ResultCard from "../components/ResultCard"

export default function Search() {
    const [ events, setEvents ] = useState([])

    // Used for obtaining the JSON data locally. May need to change for when we get data from Database
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/events.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);
    
    return (
        <>
            <div className="search-container">
                <form>
                    <input type="text" className="search-input" placeholder="Search"></input>
                    <button className="search-button" >Search</button>
                </form>
            </div>
            <h1 className="query-name">Search Results for "Hiking"</h1>
            <div className="results-container">
                {/* Code for mapping the JSON data to a bunch of ResultCards */}
                {events.map((event, index) => (
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

                {/* <ResultCard url="/public/osu.jpg" name="Hiking Club Meeting" location="Dixon Rec Center" date="Saturday, March 23" time="2:00 pm" />
                <ResultCard url="/public/osu.jpg" name="Hiking Club Meeting" location="Dixon Rec Center" date="Saturday, March 23" time="2:00 pm" />
                <ResultCard url="/public/osu.jpg" name="Hiking Club Meeting" location="Dixon Rec Center" date="Saturday, March 23" time="2:00 pm" />
                <ResultCard url="/public/osu.jpg" name="Hiking Club Meeting" location="Dixon Rec Center" date="Saturday, March 23" time="2:00 pm" /> */}
            </div>
        </>
    )
}