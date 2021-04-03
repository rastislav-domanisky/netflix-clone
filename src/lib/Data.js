import { realDb, db, auth } from './firebase';

export const loadData = async (lang) => {
    const result = await ( await realDb.ref('/strings/'+lang+"/").get()).val();
    return result;
}

export const loadMedia = async () => {
    const result = await (await db.collection("media").get()).docs;
    return result;
}

export const loadMediaData = async (id) => {
    const result = await db.collection("media").doc(id).get();
    return result;
}

export const isInList = async (id) => {
    const result = await db.collection("users").doc(auth.currentUser.uid).get();
    if(!result.exists) {
        return false;
    }
    let x = false;
    result.data()["list"].forEach((el) => {
        if(el === id) {
            x = true;
        }
    });

    return x;
};

export const getMyList = async () => {
    const result = await db.collection("users").doc(auth.currentUser.uid).get();
    if(!result.exists) {
        return [];
    }
    return result.data()["list"];
};

export const addToMyList = async (id) => {
    const result = await db.collection("users").doc(auth.currentUser.uid).get();
    let myList = [];
    if(result.exists) {
        if(result.data()["list"] === undefined) {
            myList = [];
        }
        else  {
            myList = [...result.data()["list"]]
        }
    }
    myList.push(id);
    await db.collection("users").doc(auth.currentUser.uid).set({list: myList});
};

export const removeFromMyList = async (id) => {
    const result = await db.collection("users").doc(auth.currentUser.uid).get();
    let myList = [];
    if(result.exists) {
        if(result.data()["list"] === undefined) {
            myList = [];
        }
        else  {
            myList = [...result.data()["list"]]
        }
    }
    let newList = [];
    myList.forEach((el) => {
        if(el === id) {
            return;
        } else {
            newList.push(el);
        }
    });
    await db.collection("users").doc(auth.currentUser.uid).set({list: newList});
};