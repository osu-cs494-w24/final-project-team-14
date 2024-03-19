import { useState } from 'react'
import styled from '@emotion/styled'

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
                <input value={text} onChange={(e) => setText(e.target.value)} />
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
