import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, updateDoc, setDoc, doc, serverTimestamp} from "firebase/firestore";

export async function getUserData(uid) {
    // function to get a user data object from firestore given a userId of type string.
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("userId", "==", uid));
    const querySnapshot = await getDocs(q)
    const userData = querySnapshot.docs[0].data()
    return userData
}

export async function updateFsGoals(uid, newGoals) {
    try {
        // First, get the user document reference
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("userId", "==", uid));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            throw new Error("User not found");
        }

        const userDocRef = querySnapshot.docs[0].ref;

        // Update the goals array in the user document
        await updateDoc(userDocRef, {
            goals: newGoals
        });

        console.log("Goals updated successfully in Firestore");
    } catch (error) {
        console.error("Error updating goals in Firestore:", error);
        throw error;
    }
}

export async function updateSharedDate(uid) {
    try {
      // First, get the user document reference
      const usersCollectionRef = collection(db, "users")
      const q = query(usersCollectionRef, where("userId", "==", uid))
      const querySnapshot = await getDocs(q)
  
      if (querySnapshot.empty) {
        throw new Error("User not found")
      }
  
      const userDocRef = querySnapshot.docs[0].ref
  
      // Update the sharedTime field in the user document
      // serverTimestamp() will use the server's time, ensuring consistency
      await updateDoc(userDocRef, {
        sharedTime: serverTimestamp(),
      })
  
      console.log("SharedTime updated successfully")
    } catch (error) {
      console.error("Error updating sharedTime in Firestore", error)
      throw error
    }
  }



export async function moveLocalToFs(uid) {
    try {
        // First, check if the user has goals in Firestore
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("userId", "==", uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("User not found in Firestore");
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // If the user doesn't have a goals field in Firestore
        if (!userData.goals) {
            // Retrieve goals from local storage
            const localGoals = JSON.parse(localStorage.getItem('goals') || '[]');

            if (localGoals.length > 0) {
                // Update the user document in Firestore with the goals from local storage
                await updateDoc(userDoc.ref, {
                    goals: localGoals
                });

                // Delete goals from local storage
                localStorage.removeItem('goals');

                console.log("Goals successfully moved from local storage to Firestore");
            } else {
                console.log("No goals found in local storage to move");
            }
        } else {
            console.log("User already has goals in Firestore, no action taken");
        }
    } catch (error) {
        console.error("Error moving goals from local storage to Firestore:", error);
        throw error;
    }
}
