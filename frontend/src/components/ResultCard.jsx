import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser} from '../redux/userSlice'
import { loginUser, logoutUser } from '../redux/userSlice'

export default function ResultCard(props) {
    console.log("Event ID:", props.id);
    console.log("Event name:", props.name);
    console.log("Event name:", props.lon);
    return (
        <div className="result-card-container">
            <div className="result-image-container">
                <img className="result-image" src={props.url} alt="alt" />
            </div>
            <div className="result-content-container">
                <div className="result-title-container">

                    <NavLink to={`/events/${props.id}`}>
                        <h2 className="result-title">{props.name}</h2>
                    </NavLink>

                </div>
                <div className="result-details-container">
                    <img src="/map-pin.png" alt="pin" />
                    <h3 className="result-location">{props.location}</h3>
                    <img src="/calendar.png" alt="calendar" />
                    <h3 className="result-location">{props.date}</h3>
                    <img src="/clock.webp" alt="clock" />
                    <h3 className="result-time">{props.time}</h3>
                </div>
            </div>
        </div>
    )
}