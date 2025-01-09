import Nav from "./components/Nav";
import { Link } from "react-router-dom";
import Footer from './components/Footer'
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Nav />
      <LoginForm></LoginForm>
      <Footer></Footer>
    </>
  );
}
