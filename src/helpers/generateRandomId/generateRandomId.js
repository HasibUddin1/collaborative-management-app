export const generateRandomId = () => {
    const timeStamp = new Date().getTime()
    const random = Math.random().toString(36).substring(7)
    return `${timeStamp}${random}`
}