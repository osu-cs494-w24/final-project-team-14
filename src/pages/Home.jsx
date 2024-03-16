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

export default function Home() {
    const [ text, setText ] = useState("")
    const [ query, setQuery ] = useState("Oregon+State+University,Corvallis,OR")

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
        </MapContainer>
    )
}
