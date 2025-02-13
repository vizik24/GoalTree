import React from "react";
import { Link } from "react-router-dom";
import CtaButton from "./CtaButton";

export default function Navbar({ logo, navItems }) {
  return (
    <div className="navbar bg-base-100 flex justify-between items-center px-4 py-2">
      <div className="flex items-center">
        <Link to="/">{logo}</Link>
      </div>
      <div className="flex items-center">
        <ul className="flex space-x-6 items-center">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-base-content hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <CtaButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
