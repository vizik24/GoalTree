import React from "react";
import { Link } from "react-router-dom";

import LogoutButton from "./LogoutButton";


export default function Nav() {
  return (
    <>
      <div className="navbar bg-base-100 w-full justify-between">
        <div className="justify-start">
          <Link to="/">
            <a className="btn btn-ghost text-xl inline">
              Goals<span className="text-primary">Tree</span>
            </a>
          </Link>
        </div>
        <div className="">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to='/tracker'>
                <a className="text-primary">Dashboard</a>
              </Link>
            </li>
            <li>
              <details>
                <summary>Menu</summary>
                <ul className="bg-base-100 rounded-t-none p-2 z-20">
                  <li>
                    <Link to='/about'>
                      <a>About</a>
                    </Link>
                  </li>
                  <li>
                    <Link to='/contact'>
                      <a>Contact</a>
                    </Link>
                  </li>
                  <li>
                    <Link to='/privacy'>
                      <a>Privacy Policy</a>
                    </Link>
                  </li>
                  <li>
                    <LogoutButton></LogoutButton>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
