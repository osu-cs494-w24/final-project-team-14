import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchEvents } from '../redux/eventsSlice'
import ResultCard from "../components/ResultCard"

// add user
import { selectUser} from '../redux/userSlice'
import { loginUser, logoutUser } from '../redux/userSlice'



export default function Search() {
    const [ text, setText ] = useState("")
    const [query, setQuery] = useState("")

    const events = useSelector((state) => state.events.events)

    // current user
    const dispatch = useDispatch()
    const current_user = useSelector(selectUser)
    

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
            {events.filter(event => query === "" || event.name.replace(/\s/g, '').toLowerCase().includes(query.replace(/\s/g, '').toLowerCase())).map((event, index) => (
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
