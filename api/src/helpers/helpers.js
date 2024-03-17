exports.isEmpty = (obj) => {
    if (obj) {
        return Object.keys(obj).length === 0;
    } else {
        return true;
    }
};
