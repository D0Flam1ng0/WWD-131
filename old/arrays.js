//  arrays.js
const steps = ["one", "two", "three"];
function listTemplate(step,points){
    return `<li>${step}</li>`;
   
}
const stepsHtml = steps.map(listTemplate)
document.querySelector("#myList").innerHTML = stepsHtml.join("")
const grades = ["A", "B", "C"];
let points = 0;
function convertGradeToPoints(grade){
    if (grade === "A") {
        points = 4;
      } else if (grade === "B") {
        points = 3;
      } else {
        points = 2;
      }
    return points
}
const gpaPoints = grades.map(convertGradeToPoints);
const pointsTotal = gpaPoints.reduce(function (total, item) {
    return total + item;
  });
  
  const gpa = gpaPoints.reduce((total, item) => total + item) / gpaPoints.length;

  const words = ["watermelon", "peach", "apple", "tomato", "grape"];
  const shortWords = words.filter(function (word) {
    return word.length < 6;
  });
const myArray = [12, 34, 21, 54];
const luckyNumber = 21;
let luckyIndex = myArray.indexOf(luckyNumber);
 