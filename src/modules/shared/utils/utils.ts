export const clone = objectToClone => Object.assign({}, objectToClone)

export const compareIds = (id1, id2) => id1.toString() === id2.toString()

export const pluralize = (str: string) => {
    return str.endsWith('s') ? str : str + 's'
}
