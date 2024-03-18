import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { fetchEvents } from '../redux/eventsSlice'

import ResultCard from "../components/ResultCard"

export default function Search() {
    const [query, setQuery] = useState("")

    const dispatch = useDispatch()
    const events = useSelector((state) => state.events.events)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])
    
    return (
        <>
            <div className="search-container">
            <form onSubmit={e => {
                    e.preventDefault()
                }}>
                    <input
                        value={query}
                        className="search-input"
                        placeholder={`Enter an event...`}
                        onChange={(e) => setQuery(e.target.value)} />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
            <div className="results-container">
                {events.filter(event => query === "" || event.name.toLowerCase().includes(query.toLowerCase())).map((event) => (
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