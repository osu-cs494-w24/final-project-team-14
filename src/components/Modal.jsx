import { NavLink } from "react-router-dom"

import { useState } from "react"

export default function Modal({ name, url, id, location, date, time, onClose, render }) {
    console.log("==", name)
    const handleModalClose = () => {
        onClose()
    }

    if (!render) {
        return null
    }
    return (
        <>
            <div id="modal-backdrop"></div>
            <div id="sell-something-modal">
                <div className="modal-dialog">
                    <div className="modal-header">
                        <button type="button" id="modal-close" className="modal-hide-button" onClick={handleModalClose}>&times;</button>
                    </div>

                    <div className="modal-body">
                        <div className="modal-image-container">
                            <img className="modal-image" src={url} alt="alt" />
                        </div>
                        <div className="result-content-container">
                            <div className="modal-title-container">

                                <NavLink className="modal-link" to={`/events/${id}`}>
                                    <h2 className="modal-title">{name}</h2>
                                </NavLink>

                            </div>
                            <div className="result-details-container">
                                <img src="/map-pin.png" alt="pin" />
                                <h3 className="result-location">{location}</h3>
                                <img src="/calendar.png" alt="calendar" />
                                <h3 className="result-location">{date}</h3>
                                <img src="/clock.webp" alt="clock" />
                                <h3 className="result-time">{time}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}