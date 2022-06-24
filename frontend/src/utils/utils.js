const utils = {
    shortenAddress(address) {
        return address.slice(0, 5) + "..." + address.slice(-3)
    },

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    existEmpty(object) {
        for (let key in object) {
            const value = object[key];
            if (value === undefined || value === null || value.length === 0) {
                return true;
            }
        }
        return false;
    }
}

export default utils;