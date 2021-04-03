
export const filterByCategory = (data, category) => {
    let list = [];

    data.forEach((el) => {
        if(el.data().category === category) {
            list.push(el);
        }
    });

    return list;
};