
export const sortByRate = (data) => {
    data.sort((a,b) => {
        if(a.data().csfd > b.data().csfd) {return -1;}
        if(a.data().csfd < b.data().csfd) {return 1;}
        return 0;
    });

    return data;
};