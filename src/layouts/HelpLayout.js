import { Outlet, NavLink } from "react-router-dom";

export default function HelpLayout() {
    return (
        <div className='help-layout'>
            <nav>
                <NavLink to="faq">View the FAQ</NavLink>
            </nav>
            <Outlet />
        </div>)
}