export default function Home() {

    return (
        <>
            <h2>This is Final project to team 14</h2>
            <iframe
                width="600"
                height="450"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLEMAPS_KEY}&q=City+Hall,New+York,NY`}
            ></iframe>
        </>
    )
}