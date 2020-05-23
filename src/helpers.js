export const getNumericValue = (value) => {
    return parseInt(value.match(/-?\d+/)[0]);
}
