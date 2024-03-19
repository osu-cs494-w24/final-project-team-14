import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchEvents } from '../redux/eventsSlice'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

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
    const [text, setText] = useState("")
    const [showForm, setShowForm] = useState(false)
    const eventLocations = [
        { latitude: 44.53, longitude: -123.2 },
        { latitude: 44.55, longitude: -123.3 },
    ]

    const [formData, setFormData] = useState({
        eventName: '',
        eventLocation: '',
        eventDate: '',
        eventTime: '',
        eventLon: '',
        eventLat: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const dispatch = useDispatch()
    const events = useSelector((state) => state.events.events)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])


    const handleSubmit = useCallback(() => {
        console.log("==여기가 출력되어야함formdata", JSON.stringify(formData));
        fetch('https://lucky-outpost-400621.uw.r.appspot.com/add-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                // POST 성공 처리
                console.log('Event added successfully');
            } else {
                // POST 실패 처리
                console.error('Failed to add event');
            }
        })
        .catch(error => {
            console.error('Error while adding event:', error);
        });
    }, []);

    
    
    useEffect(() => {
        const initMap = () => {
            const mapOptions = {
                center: { lat: 44.5646, lng: -123.262 }, // Default center (New York City coordinates)
                zoom: 9, // Default zoom level
            }
            const map = new window.google.maps.Map(document.getElementById('map'), mapOptions)

            // Add event markers
            //console.log("Adding Events...")
            events.forEach((location, index) => {
                //console.log("location.lat: ", location.lat)
                const marker = new window.google.maps.Marker({
                    animation: google.maps.Animation.DROP,
                    position: { lat: parseFloat(location.lat), lng: parseFloat(location.long) },
                    map,
                    title: location.name,
                })
            })
        }
    

        // Load Google Maps API script
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLEMAPS_KEY}&callback=initMap`
        script.defer = true
        script.async = true
        script.onload = initMap

        document.head.appendChild(script)

        // Clean up function
        return () => {
            document.head.removeChild(script)
        }
    }, [eventLocations])

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
            <div id="map"></div>
            <AddEventButton onClick={() => setShowForm(!showForm)} >
                <img src="/map-pin.png" />
            </AddEventButton>
            {showForm &&
                <EventForm>
                    <h2>Add New Event</h2>
                    <label>Event Name: <input type="text" id="eventName" value={formData.eventName} onChange={handleChange} /></label>
                    <label htmlFor="eventLocation">Location: <input type="text" id="eventLocation" value={formData.eventLocation} onChange={handleChange} /></label>
                    <label htmlFor="eventDate">Date: <input type="date" id="eventDate" value={formData.eventDate} onChange={handleChange} /></label>
                    <label htmlFor="eventTime">Time: <input type="time" id="eventTime" value={formData.eventTime} onChange={handleChange} /></label>
                    <label htmlFor="eventLat">Lat: <input type="number" id="eventLat" step="any" value={formData.eventLat} onChange={handleChange} /></label>
                    <label htmlFor="eventLon">Lon: <input type="number" id="eventLon" step="any" value={formData.eventLon} onChange={handleChange} /></label>
                    <button onClick={() => setShowForm(false)}>Close</button>
                    <button onClick={handleSubmit}>Submit</button> {/* 수정된 부분 */}
                </EventForm>
            }
        </MapContainer>
    )
}