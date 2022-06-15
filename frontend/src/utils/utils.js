export const shortenAddress = (address) => {
    return address.slice(0, 5) + "..." + address.slice(-3)
}
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
