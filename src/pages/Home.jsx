import { useState } from 'react'
import { css } from '@emotion/react'
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
    const [ text, setText ] = useState("")
    const [ query, setQuery ] = useState("Oregon+State+University,Corvallis,OR")
    const [showForm, setShowForm] = useState(false)

    return (
        <MapContainer>
            <form onSubmit={(e) => {
                e.preventDefault()
                console.log("Place query: ",text)
                setQuery(text)
            }}>
                <SearchBarContainer>

                    <MagnifyingGlassIcon icon={faMagnifyingGlass}/>
                    <SearchBarInput
                        value={text} 
                        placeholder={`Enter a city or zipcode...`}
                        onChange={(e) => setText(e.target.value)}>
                    </SearchBarInput>

                </SearchBarContainer>
            </form>
            <iframe
                width="100%"
                height="700"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLEMAPS_KEY}&q=${query}`}
            ></iframe>
            <AddEventButton onClick={() => setShowForm(!showForm)} >
                <img src="/map-pin.png" />
            </AddEventButton>
            {showForm &&
                <EventForm>
                    <h2>Add New Event</h2>
                    <label >Event Name: <input type="text" id="eventName" /></label>
                    <label htmlFor="eventLocation">Location: <input type="text" id="eventLocation" /></label>
                    <label htmlFor="eventDate">Date: <input type="date" id="eventDate" /></label>
                    <label htmlFor="eventTime">Time: <input type="time" id="eventTime" /></label>
                    <button onClick={() => setShowForm(false)}>Close</button>
                </EventForm>
            }
        </MapContainer>
    )
}
