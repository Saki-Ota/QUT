import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div>
            <Link to ="/">Home</Link>
            <Link to ="/location">Location</Link>
            <Link to ="/login">Login</Link> 
            <Link to ="/register">Register</Link>
        </div>
    )
}
