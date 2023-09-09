const users = JSON.parse(localStorage.getItem("users")) || []

export const getUniqueEmails = () => {
    const emails = new Set()

    users.forEach(user => {
        const userEmail = user.userEmail
        if(userEmail){
            emails.add(userEmail)
        }
    })

    return Array.from(emails)
}