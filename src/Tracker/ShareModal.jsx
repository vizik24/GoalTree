/**
 * ShareModal component - react component that renders a share Modal with 2 buttons:
 *  - copy link to clipboard 
 *  - share link to twitter.
 * @param {Object} props - The props object.
 * @param {String} props.link - The link to to be shared 
 * @returns 
 */

import { useState } from "react";

export default function ShareModal({ link }) {

    const [copyButtonText, setCopyButtonText] = useState('Copy Link');

    function copyLinkClicked() {
        navigator.clipboard.writeText(link)
            .then(() => {
                console.log('Link copied to clipboard');
                // Change button text immediately after copy
                setCopyButtonText('Copied!');
                // Close modal after 1 second.
                setTimeout(() => {
                    setCopyButtonText('Copy Link');
                    document.getElementById("share-modal").close();
                }, 1000); // Delay in milliseconds
            })
            .catch(err => {
                console.error('Failed to copy link: ', err);
                setCopyButtonText('Failed to copy');
            });
    }


    return (
        <>
        {/* You can open the modal using document.getElementById('ID').showModal() method */ }
        <dialog id="share-modal" className="modal">
        <div className="modal-box">
        <div className="grid items-center">
          <h3 className="font-bold text-lg">Share your Goals Tree</h3>
          <br></br>
          <p>
            <a className='text-primary' href='https://scholar.dominican.edu/psychology-faculty-conference-presentations/3/'>Research </a>
            shows that people who share their goals with a friend 
            are 33% more likely to achieve their goals.</p>
          <br></br>
          <form method="dialog" className="grid place-items-center">
            {/* if there is a button in form, it will close the modal */}
            <button type='button' className="btn w-32 btn-neutral" onClick={copyLinkClicked}>{copyButtonText}</button>
            <br></br>
            <button className="btn w-32 btn-neutral">Cancel</button>
          </form>
        </div>
      </div>
        </dialog>
        </>

    )
}