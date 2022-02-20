import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// put this in right userConnt
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

// not sure if this works Need to test
export const updateEmail = async ({ email = "" }) => {
  await getUser().updateEmail(email);
};

/*
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
