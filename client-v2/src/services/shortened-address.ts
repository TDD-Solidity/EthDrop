
export function shortenedAddress(address) {

    if (!address ||
        typeof address !== 'string' ||
        !address.length ||
        address.length < 10)
        return '';

    return address.substr(0, 6) + '...' + address.substr(address.length - 4)
}
