import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchEvents } from '../redux/eventsSlice'
import ResultCard from "../components/ResultCard"

export default function Search() {
    const [text, setText] = useState("")
    const [query, setQuery] = useState("")

    const dispatch = useDispatch()


    const events = useSelector((state) => state.events.events);

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
                {console.log("First event:", events[0])}
                {events.filter(event => query === "" || event.event_name.replace(/\s/g, '').toLowerCase().includes(query.replace(/\s/g, '').toLowerCase())).map((event) => (
                    <ResultCard
                        key={event.id}
                        id={event.id}
                        url={event.event_url}
                        name={event.event_name}
                        location={event.event_location}
                        date={event.event_date}
                        time={event.event_time}
                    />
                ))
                }
            </div>
        </>
    )
}
