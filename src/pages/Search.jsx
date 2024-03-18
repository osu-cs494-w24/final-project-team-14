import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { fetchEvents } from '../redux/eventsSlice'

import ResultCard from "../components/ResultCard"

export default function Search() {
    const dispatch = useDispatch()
    const events = useSelector((state) => state.events.events)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])
    
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
                {events.map((event) => (
                    <ResultCard 
                        key={event.id}
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