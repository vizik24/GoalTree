import Nav from "./components/Nav";
import { Link } from "react-router-dom";
import Footer from './components/Footer'
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <Nav />
      <SignUpForm></SignUpForm>
      <Footer></Footer>
    </>
  );
}
