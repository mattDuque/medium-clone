export function toDate(date: string) {
  var newDate = new Date(date).toString().split(" ")
  return newDate[1] + " " + newDate[2] + " "
}

export function dateFormatter(date: string) {
  var added: any = new Date(date)
  var now: any = new Date()

  const diffTime = Math.abs(now - added)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 360) {
    var dateSplit = added.toString().split(" ")
    return dateSplit[2] + " " + dateSplit[1] + ", " + dateSplit[3]
  }
  if (diffDays > 30) {
    var dateSplit = added.toString().split(" ")
    return dateSplit[2] + " " + dateSplit[1] + " "
  }
  if (diffDays >= 2) return diffDays + " days ago"
  if (diffDays == 1) return " yesterday"
  if (diffDays == 0) return " today"
}