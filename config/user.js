import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// put getUser in firebase.js and mve this over to pages or usercontext
export const getUser = () => firebase.auth().currentUser;

export const onAuthStateChanged = (args) =>
  firebase.auth().onAuthStateChanged(args);

export const sendVerification = () => getUser().sendEmailVerification();

export const reload = () => getUser().reload();

export const reauthenticate = async ({ email = "", password = "" }) => {
  await getUser().reauthenticateWithCredential(
    firebase.auth.EmailAuthProvider.credential(email, password)
  );
};

export const updatePassword = ({ password = "" }) =>
  getUser().updatePassword(password);

export const signUp = async ({ email = "", password = "" }) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      sendVerification();
    });
};

/*

export const updateEmail = async ({ email = "" }) => {
  await getUser().updateEmail(email);
};

export const verifyBeforeUpdateEmail = async ({ email = "" }) => {
  await getUser()
    .verifyBeforeUpdateEmail(email)
    .then(() => {
      // Verification email sent.
      //  When the user clicks the email link,
      // it will update to newEmail@example.com and set it as verified,
      // emailVerified: true.
      // Until then, the old email remains on the account.
    })
    .catch(function (error) {
      // Error occurred. Inspect error.code.
    });
};

export const signOut = async () => {
  await firebase.auth().signOut();
};

// Notice Firebase automatically signs user in when their account is created
export const signUp = async ({ email = '', password = '' }) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(sendVerification);
};

export const signIn = async ({ email = '', password = '' }) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const sendPasswordReset = ({ email = '' }) =>
  firebase.auth().sendPasswordResetEmail(email);
  */
