const newP = document.createElement("p");
const newI = document.createElement("img");
newI.src = "https://picsum.photos/200";
newI.alt= "Set image of picsum";
newP.textContent = "Hello World!";
document.body.append(newP)
document.body.append(newI)
const newDiv = document.createElement("div");
newDiv.innerHTML = "<ul><li<One</li><li>Two</li><li>Three</li></ul>";
document.body.appendChild(newDiv);


const newSection = document.createElement("section");
const newh2 = document.createElement("h2");
newh2.innerText = "Dom Basics";
newSection.appendChild(newh2);
const newp = document.createElement("p");
newp.innerText = "This section was added through javascript";
newSection.appendChild(newp);
document.body.appendChild(newSection);




const ingredientData = ["Pinto Beans", "Corn", "Spices", "Tortillas"];
const portionData = ["1 15oz can","1 15oz can","1 Tbsp",8]

const newlist = document.createElement("ul");
newlist.classList.add("dark")
newlist.innerHTML=`
<li>${portionData[0]} ${ingredientData[0]}</li>
<li>${portionData[1]} ${ingredientData[1]}</li>
<li>${portionData[2]} ${ingredientData[2]}</li>
<li>${portionData[3]} ${ingredientData[3]}</li>`;
newSection.append(newlist)

