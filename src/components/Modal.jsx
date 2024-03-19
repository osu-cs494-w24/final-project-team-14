import { NavLink } from "react-router-dom"

import { useState } from "react"

export default function Modal({ name, url, id, location, date, time, onClose, render }) {
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
                <div class="modal-dialog">
                    <div class="modal-header">
                        <button type="button" id="modal-close" class="modal-hide-button" onClick={handleModalClose}>&times;</button>
                    </div>

                    <div class="modal-body">
                        <div className="modal-image-container">
                            <img className="modal-image" src={url} alt="alt" />
                        </div>
                        <div className="result-content-container">
                            <div className="result-title-container">

                                <NavLink to={`/events/${id}`}>
                                    <h2 className="result-title">{name}</h2>
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