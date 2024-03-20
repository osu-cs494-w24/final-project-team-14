import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchEvents } from '../redux/eventsSlice'
import ResultCard from "../components/ResultCard"
import { selectEvent, getAllEvents, addEvent } from '../redux/eventsSlice'

// add user
import { selectUser} from '../redux/userSlice'
import { loginUser, logoutUser } from '../redux/userSlice'



export default function Search() {
    const [ text, setText ] = useState("")
    const [query, setQuery] = useState("")

    const [ events, setEvents ] = useState([])
    //const events = useSelector((state) => state.events.events)

    // current user
    const dispatch = useDispatch()
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://lucky-outpost-400621.uw.r.appspot.com/getevents', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("==getData", data);
                    dispatch(getAllEvents(data)); // dispatch 이후에 return 배치
                    setEvents(data); // events 상태 업데이트
                    console.log("Success!");
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error while fetching data:', error);
            }
        }
        fetchData(); // 컴포넌트가 처음 렌더링될 때만 데이터를 가져옴
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
            {events.filter(event => query === "" || event.name.replace(/\s/g, '').toLowerCase().includes(query.replace(/\s/g, '').toLowerCase())).map((event) => (
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
