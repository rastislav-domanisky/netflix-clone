import { auth, provider } from './firebase';

const logIn = async () => {
    await auth.signInWithRedirect(provider);
}

const logOut = async () => {
    await auth.signOut();
}


const getCurrentUser = () => {
    return auth.currentUser;
}

const isUserSignedIn = () => {
    const usr = getCurrentUser();
    if(usr != null) {
        return true;
    }
    return false;
}

export {logIn, getCurrentUser, isUserSignedIn, logOut};