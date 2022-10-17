const isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0
}
const nameIsUnique = (users, name) => {
    let res = true
    users.forEach(user => {
        if(user === name) return res = false
    })

    return res
}


module.exports = {
    isRealString,
    nameIsUnique
}