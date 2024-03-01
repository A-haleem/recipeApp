(async function(){
const respons = await fetch("./recipe.json")
const recipes = await respons.json()
//console.log(recipes)
const inputEle = document.getElementById("searchInput")
//console.log(inputEle)
const btnEle = document.getElementById("searchBtn")
//console.log(btnEle)
const listEle = document.getElementById("recipe-list")
const detailsEle = document.getElementById("recipeDetailsContainer")
function loadRceip(res){
detailsEle.innerHTML = `
<h2 class="title">${res.title}</h2>
<h3>Ingredients:</h3>
<ul>${res.ingredients.map(function(ingredient){
    return "<li>"+ingredient+"</li>"
}).join("")}</ul>
<h3>Instruction:</h3>
<div>${res.instructions}</div>

`;
}
function displayResult(result){
listEle.innerHTML = "";
result.forEach(function(res){
    const li = document.createElement("li")
    const listItem = `
    <h2 clss="title">${res.title}</h2>
    <div class="description">${res.description}</div>

    `;
    li.innerHTML = listItem;
    li.addEventListener("click",function(){
        loadRceip(res)
    })
    listEle.appendChild(li);
})

}
function search(){
    const query = inputEle.value.toLowerCase()
    const result = recipes.filter(function(recipe){
        return recipe.title.toLowerCase().includes(query)||
        recipe.ingredients.join("").toLowerCase().includes(query)
    })
    displayResult(result)
    }
    btnEle.addEventListener("click",search);

})();