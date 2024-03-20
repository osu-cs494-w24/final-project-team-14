import { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectEvent, fetchEvents, getAllEvents, addEvent } from '../redux/eventsSlice'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import Modal from '../components/Modal'
import { selectUser } from '../redux/userSlice'

const MapContainer = styled.div`
    text-align: center;
    input {
        margin-bottom: 10px;
        width: 40vw;
        height: 3vh;
        border-radius: 20px;
        text-align: center;
    }
`

const SearchBarContainer = styled.div`
    position: relative;
    width: 40vw;
    margin: auto; // Centers the search bar

    // Animations for search bar styling
    transition: transform 0.25s ease-in-out;
    &:hover {
        transform: scale(1.08);
    }
`

const MagnifyingGlassIcon = styled(FontAwesomeIcon)`
    // CSS to shift the icon inside of the search bar
    
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-90%);
`

const SearchBarInput = styled.input`
    width: 100%;
    height: 3vh;
    border-radius: 20px;
    text-align: center;

    &:focus {
        border-color: #007bff;
        
        // Sourced from "https://getcssscan.com/css-box-shadow-examples", example #5.
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
`

const AddEventButton = styled.button`
  position: fixed;
  right: 30px;
  bottom: 30px;
  height: 60px;
  width: 60px;
  border: none;
  border-radius: 30px;
  font-size: 30px;
  background-color: white;
  cursor: pointer;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.25);
  img {
    height: 40px;
  }
  &:hover,
  &:focus {
    right: 27px;
    bottom: 27px;
    height: 66px;
    width: 66px;
    border-radius: 33px;
    font-size: 36px;
  }
`

const EventForm = styled.form`
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 350px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    label {
        margin-left: 0.5rem;
    }
    input {
        width: 100px;
    }
`

export default function Home() {
    const showFormRef = useRef(false);
    const [showForm, setShowForm] = useState(false);
    const [text, setText] = useState("")
    const [query, setQuery] = useState("Oregon+State+University,Corvallis,OR")
    const [eventName, setEventName] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [eventURL, setEventURL] = useState("")
    const [eventTime, setEventTime] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [renderModal, setRenderModal] = useState(false)
    const current_user = useSelector(selectUser)
    const events = useSelector(selectEvent)
    let event_id
    const toggleModal = () => {
        setRenderModal(!renderModal)
    }
    const mapCenter = { lat: 44.5646, lng: -123.262 }
    const [formData, setFormData] = useState({
        eventName: '',
        eventLocation: '',
        eventDate: '',
        eventTime: '',
        eventLon: '',
        eventLat: '',
        eventUrl: '',
        user: current_user.user
    });

    const toggleForm = () => {
        setShowForm(prevShowForm => !prevShowForm);
    };



    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const dispatch = useDispatch()
    //const events = useSelector((state) => state.events.events)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])


    const formRef = useRef(null);
    const handleSubmitButtonClick = async (event) => {
        event.preventDefault(); // 폼 제출 기본 동작 방지
        console.log("=", formData);
        
        // fetch add event POST
        try {
            const response = await fetch('https://lucky-outpost-400621.uw.r.appspot.com/add-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                // POST 성공 처리
                const responseData = await response.json();
                const newEventId = responseData.id; // 서버로부터 받은 새 이벤트의 아이디
                console.log('New Event ID:', newEventId);
                event_id = newEventId;
            } else {
                // POST 실패 처리
                console.error('Failed to add event');
            }
        } catch (error) {
            console.error('Error while adding event:', error);
        }    
        // fetch all events GET
        try {
            const response = await fetch(`https://lucky-outpost-400621.uw.r.appspot.com/event/${event_id}`, 
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                event = await response.json()
                dispatch(addEvent(event))
                console.log("== Success!")
            }

        } catch (error) {
            console.error('Error while getting events:', error);
        }


        setFormData({
            eventName: '',
            eventLocation: '',
            eventDate: '',
            eventTime: '',
            eventLon: '',
            eventLat: '',
            eventUrl: '',
            user: current_user.user
        });
    
        setShowForm(false);
    };
    
    return (
        <MapContainer>
            <form onSubmit={(e) => {
                e.preventDefault()
                console.log("Place query: ", text)
                setQuery(text)
            }}>
                <SearchBarContainer>
    
                    <MagnifyingGlassIcon icon={faMagnifyingGlass} />
                    <SearchBarInput
                        value={text}
                        placeholder={`Enter a city or zipcode...`}
                        onChange={(e) => setText(e.target.value)}>
                    </SearchBarInput>
    
                </SearchBarContainer>
    
            </form>
            <div id="map">
                    <APIProvider apiKey={import.meta.env.VITE_GOOGLEMAPS_KEY}>
                        <Map center={mapCenter} zoom={9}>
                            {events.map((location) => (
                                <Marker key={location.id} position={{ lat: parseFloat(location.lat), lng: parseFloat(location.long) }} onClick={(event) => {
                                    setEventDate(location.date)
                                    setEventLocation(location.location)
                                    setEventTime(location.time)
                                    setEventName(location.name)
                                    setEventURL(location.url)
                                    setRenderModal(true)
                                }} />
                            ))}
                        </Map>
                    </APIProvider>
            </div>
            <Modal render={renderModal} onClose={toggleModal} name={eventName} location={eventLocation} date={eventDate} time={eventTime} url={eventURL} />
            <AddEventButton onClick={toggleForm}>
                <img src="/map-pin.png" />
            </AddEventButton>
            {showForm &&
            <EventForm ref={formRef} onSubmit={handleSubmitButtonClick}>
                <h2>Add New Event</h2>
                <label>Event Name: <input type="text" id="eventName" value={formData.eventName} onChange={handleChange} /></label>
                <label htmlFor="eventLocation">Location: <input type="text" id="eventLocation" value={formData.eventLocation} onChange={handleChange} /></label>
                <label htmlFor="eventDate">Date: <input type="date" id="eventDate" value={formData.eventDate} onChange={handleChange} /></label>
                <label htmlFor="eventTime">Time: <input type="time" id="eventTime" value={formData.eventTime} onChange={handleChange} /></label>
                <label htmlFor="eventLat">Lat: <input type="number" id="eventLat" step="any" value={formData.eventLat} onChange={handleChange} /></label>
                <label htmlFor="eventLon">Lon: <input type="number" id="eventLon" step="any" value={formData.eventLon} onChange={handleChange} /></label>
                <label htmlFor="eventUrl">Url: <input type="text" id="eventUrl" value={formData.eventUrl} onChange={handleChange} /></label>
                <button onClick={() => setShowForm(false)}>Close</button>
                <button type="submit">Submit</button>
            </EventForm>
        }
        </MapContainer>
    
    )
}

