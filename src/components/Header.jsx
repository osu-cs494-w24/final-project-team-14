import { NavLink } from "react-router-dom"

export function Header(props) {
    return (
        <>
            <div id="header-container">
                <div id="title-container">
                    <NavLink id="site-title" to="/">ShinDig</NavLink>

                </div>
                <div id="navigation-container">
                    <NavLink to="/account"><img id="account-image" src="useraccount.png"></img></NavLink>
                </div>
            </div>
        </>
    )
}