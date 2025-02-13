import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
     <div className="flex gap-6">
        <Link to="/about">
          <a className="underline">About</a>
        </Link>
      
      
        <Link to="/contact">
          <a className="underline">Contact</a>
        </Link>
      
      
        <Link to="/privacy">
          <a className="underline">Privacy Policy</a>
        </Link>
        </div>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          GoalsTree.
        </p>
      </aside>
    </footer>
  );
}
