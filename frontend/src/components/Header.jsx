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
    return (
        <div id="header-container">
            <div id="title-container">
                <NavLink id="site-title" to="/"><img id="logo" src="/Logo.png" /></NavLink>
            </div>
            <div id="navigation-container">
                <NavLink to="/search" id="explore-button">
                    <div id="explore-button">Explore Events</div>
                </NavLink>
                <NavLink to="/signup" id="account-image-container"><img id="account-image" src="/useraccount.png"></img></NavLink>
            </div>
        </div>
    );
}