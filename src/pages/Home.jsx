import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchEvents, addEvent } from '../redux/eventsSlice'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import Modal from '../components/Modal'

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
  right: 60px;
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
    right: 57px;
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    h2 {
        text-align: center;
    }
    label {
        display: block;
        margin-bottom: 5px;
    }
    input {
        width: calc(100% - 10px); 
        padding: 5px; 
        margin-bottom: 10px;
        display: block;
    }
    button {
        margin: 5px;
    }
`

export default function Home() {
    const [eventID, setEventID] = useState("")
    const [eventName, setEventName] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [eventTime, setEventTime] = useState("")
    const [eventURL, setEventURL] = useState("")
    const [eventLat, setEventLat] = useState("")
    const [eventLong, seteventLong] = useState("")
    const [renderModal, setRenderModal] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const toggleModal = () => {
        setRenderModal(!renderModal)
    }
    const mapCenter = { lat: 44.5646, lng: -123.262 }

    const dispatch = useDispatch()
    const events = useSelector((state) => state.events.events)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])



    return (
        <MapContainer>
            <div id="map">
                <APIProvider apiKey={import.meta.env.VITE_GOOGLEMAPS_KEY}>
                    <Map center={mapCenter} defaultZoom={9}>
                        {events.map((location, index) => (
                            <Marker key={index} position={{ lat: parseFloat(location.event_lat), lng: parseFloat(location.event_lon) }} onClick={(event) => {
                                setEventDate(location.event_date)
                                setEventLocation(location.event_location)
                                setEventTime(location.event_time)
                                setEventName(location.event_name)
                                setEventURL(location.event_url)
                                setEventID(location.id)
                                setRenderModal(true)
                            }} />
                        ))}
                    </Map>
                </APIProvider>
            </div>
            <AddEventButton onClick={() => setShowForm(true)} >
                <img src="/map-pin.png" />
            </AddEventButton>
            {showForm &&
                <EventForm>
                    <h2>Add New Event</h2>
                    <label >Event Name:</label>
                    <input value={eventName} onChange={(e) => setEventName(e.target.value)} />
                    <label>Location Name:</label>
                    <input value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
                    <label>Date:</label>
                    <input value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                    <label>Time:</label>
                    <input value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
                    <label>Image URL:</label>
                    <input value={eventURL} onChange={(e) => setEventURL(e.target.value)} />
                    <label>Latitude:</label>
                    <input value={eventLat} onChange={(e) => setEventLat(e.target.value)} />
                    <label>Longitude:</label>
                    <input value={eventLong} onChange={(e) => seteventLong(e.target.value)} />
                    <button onClick={() => {
                        dispatch(addEvent({
                            name: eventName,
                            location: eventLocation,
                            date: eventDate,
                            time: eventTime,
                            url: eventURL,
                            lat: eventLat,
                            long: eventLong,
                        }))
                        setEventName("")
                        setEventLocation("")
                        setEventDate("")
                        setEventTime("")
                        setEventURL("")
                        setEventLat("")
                        seteventLong("")
                        setShowForm(false)
                    }}>Submit</button>
                    <button onClick={() => {
                        setEventName("")
                        setEventLocation("")
                        setEventDate("")
                        setEventTime("")
                        setEventURL("")
                        setEventLat("")
                        seteventLong("")
                        setShowForm(false)
                    }}>Close</button>
                </EventForm>
            }
            <Modal render={renderModal} id={eventID} onClose={toggleModal} name={eventName} location={eventLocation} date={eventDate} time={eventTime} url={eventURL} />
        </MapContainer>

    )
}
