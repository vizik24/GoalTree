/**
 * ShareButton component - react component that generates a share link and displays a modal to share that link.
 *
 * @param {Object} props - The props object
 * @param {Object} props.currentUser - the currentUser object.
 */

import ShareModal from "./ShareModal";
import { useAuth } from "../context/AuthContext";
import { updateSharedDate } from "./firestore";

export default function ShareButton() {
  const { user } = useAuth(); // Destructure to get user from the context

  // Check if user exists and then access user.uid (Firebase typically uses `uid` not `id`)
  const userId = user ? user.uid : "defaultUser";

  // generate a share link from the currentUser.id
  let shareLink = `https://goals-tree.com/sharedTree?userId=${userId}`;

  // generate a url for sharing to X
  let shareText = "Check out my GoalsTree!";
  let xShareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareLink)}`;

  function showShareModal() {
    // when button is clicked, display the share modal.
    document.getElementById("share-modal").showModal();

    // update user's firestore document with sharedDate = current timestamp
    updateSharedDate(userId)
  }

  return (
    <>
      <ShareModal link={shareLink} xLink={xShareLink}></ShareModal>
      <button onClick={showShareModal} className="btn btn-secondary">
        Share GoalsTree
      </button>
    </>
  );
}
