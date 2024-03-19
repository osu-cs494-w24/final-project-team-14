import React from 'react'
import { NavLink } from "react-router-dom"
import { useState, useEffect } from 'react'
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import Userbox from './UserBox'


const emooji = css`
    width: 60px;
    height: 70%;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    display: flex;
    color: black;
    text-decoration: none;
    margin: 0px 20px 0px 20px;
`

export function Header(props) {
    const [ userbox, setUserBox ] = useState(false)

    const handlesetUserBox = () => {
        setUserBox(!userbox)

    }

    return (
        <div id="header-container">
            <div id="title-container">
                <NavLink id="site-title" to="/">ShinDig</NavLink>
            </div>
            <div id="navigation-container">
                    <img onClick={handlesetUserBox} id="account-image" src="useraccount.png" />
                    {userbox && <Userbox />}
            </div>
        </div>
    );
}