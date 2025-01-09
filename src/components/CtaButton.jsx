import { Link } from "react-router-dom"

export default function CtaButton() {
    return (
        <Link to="/tracker">
      <button className="btn btn-primary">Get early access</button>
      </Link>
    )
}