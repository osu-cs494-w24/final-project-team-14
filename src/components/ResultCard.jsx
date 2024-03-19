import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser} from '../redux/userSlice'
import { loginUser, logoutUser } from '../redux/userSlice'

export default function ResultCard(props) {
    const dispatch = useDispatch();
    const current_user = useSelector(selectUser)
    const { url, name, location, date, time } = props

    const sendData = async () => {
        try {
            const response = await fetch('https://lucky-outpost-400621.uw.r.appspot.com/add-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: current_user,
                    name: name,
                    location: location,
                    date: date,
                    time: time,
                    url: url
                })
            });
            const data = await response.json();
            console.log(data); // 서버로부터 받은 응답 확인
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    // sendData 함수를 호출하여 POST 요청 보내기
    sendData();

    console.log("==prop--: ", props)
    console.log("==user--: ", current_user)

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