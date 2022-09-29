export const stringDateToInputDate = (stringDate) => {
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12"
  }

  var dateArray = stringDate.split(" ").filter(s => s !== "")
  var year = dateArray[2]
  var month = months[dateArray[0]]
  var day = ("0" + dateArray[1].split(",")[0]).slice(-2);
  
  return `${year}-${month}-${day}`
}