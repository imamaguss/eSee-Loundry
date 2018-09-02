function convertDate (inpdate) {
    let date = inpdate.getDate()
    let month = inpdate.getMonth()+1
    let year = inpdate.getFUllYear()
    let newDate = `${date}/${month}/${year}`
    return newDate
}

module.exports = convertDate