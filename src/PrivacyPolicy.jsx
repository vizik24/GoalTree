import Nav from "./components/Nav";
import { Link } from "react-router-dom";
import Footer from './components/Footer'

export default function PrivacyPolicy() {
  return (
    <>
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center mb-6">Privacy Policy</h1>

        <h2 className="text-lg font-semibold">
          Effective Date: 9th January 2025
        </h2>
        <p className="my-4">
          Welcome to GoalTree! Your privacy is important to us. This Privacy
          Policy explains how we collect, use, protect, and if necessary,
          disclose your information. This policy applies to information we
          collect when you use our application, website, and services associated
          with it.
        </p>

        <h3 className="text-lg font-semibold mt-4">
          Information Collection and Use
        </h3>
        <p className="my-4">
          <strong>Personal Information:</strong> We currently collect and store
          only your name and email address. This information is used to create
          and manage your account, communicate with you, and provide customer
          support.
        </p>
        <p className="my-4">
          <strong>Future Data Collection:</strong> We may collect your location
          data in the future to customize your experience according to your
          language preferences. Additionally, we plan to collect data on your
          goal progress to enhance our services and provide you with
          personalized insights and progress reports.
        </p>

        <h3 className="text-lg font-semibold mt-4">
          Data Storage and Security
        </h3>
        <p className="my-4">
          Your personal information is stored in secure servers. We take
          reasonable measures to protect your data from unauthorized access,
          alteration, disclosure, or destruction and implement security
          practices to ensure that your data is handled securely.
        </p>

        <h3 className="text-lg font-semibold mt-4">Use of Data</h3>
        <p className="my-4">
          The information we collect is used solely for the purposes of
          providing and improving our services. We do not share your personal
          data outside of GoalTree's systems without your explicit permission,
          except as required by law or to enforce our terms and conditions and
          protect the security or integrity of our service.
        </p>

        <h3 className="text-lg font-semibold mt-4">Your Choices and Rights</h3>
        <p className="my-4">
          You have the right to access, correct, or delete your personal
          information maintained by us. You can also object to or restrict the
          processing of your personal information. If you wish to exercise these
          rights, please{" "}
          <Link to="/contact">
            <a className="text-primary">contact</a>
          </Link>{" "}
          us.
        </p>

        <h3 className="text-lg font-semibold mt-4">Children's Privacy</h3>
        <p className="my-4">
          GoalTree is not directed to children under the age of 13, and we do
          not knowingly collect personal information from children under 13. If
          you are under 13, please do not submit any personal information
          through the app.
        </p>

        <h3 className="text-lg font-semibold mt-4">Contact Us</h3>
        <p className="my-4">
          If you have any questions or concerns about this privacy policy or our
          data practices, please{" "}
          <Link to="/contact">
            <a className="text-primary">contact</a>
          </Link>{" "}
          us.
        </p>

        <h3 className="text-lg font-semibold mt-4">
          Changes to This Privacy Policy
        </h3>
        <p className="my-4">
          We may update this privacy policy to reflect changes to our
          information practices. If we make any material changes, we will notify
          you by email (sent to the e-mail address specified in your account) or
          by means of a notice on this app prior to the change becoming
          effective. We encourage you to periodically review this page for the
          latest information on our privacy practices.
        </p>
      </div>
      <Footer></Footer>
    </>
  );
}
