"use client";
import { NavLink, Outlet } from "react-router-dom";

import BreadCrumbs from "../components/Breadcrumbs";
import { useState } from "react";
import { rootNav } from "./rootNav";
import { AuthData } from "../App";

export default function RootLayout() {

  const user = AuthData();
  const [user2, setUser2] = useState({ name: "", isAuthenticated: false });
  //const [search, setSearch] =useState();
  const handleChange = (event) => {
    // const value = event.target.value;
    // setSearch(value);
  };



  return (


    <div className='root-layout'>
      <header>
        <nav>
          <NavLink className="nav-element" to="/">Qlogo</NavLink>
          <input className="nav-element searchBar" type="text" placeholder="Search for courses" name="search"  onChange={handleChange} />

          {rootNav.map((r, i) => {
            if (r.isPrivate && user2.isAuthenticated) {
              return (<NavLink className="nav-element" to={r.path} key={i}>{r.name}</NavLink>)
            }
            else if (!r.isPrivate) {
              return (<NavLink className="nav-element" to={r.path} key={i}>{r.name}</NavLink>)
            }
            else return false
          })}
          {/* <NavLink to="/">Home</NavLink>
         <NavLink to="login">Login</NavLink>
         <NavLink to="about">About</NavLink>
         <NavLink to="help">Help</NavLink>
         <NavLink to="careers">Careers</NavLink>
         <NavLink to="register">Register</NavLink> */}
        </nav>
        <BreadCrumbs />
      </header>
      <main>
        <Outlet />
      </main>
    </div>

  )
}


