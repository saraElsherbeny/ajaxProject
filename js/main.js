
var recipeData= document.getElementById("recipeData");
var navLinks= document.querySelectorAll(".nav-link");
var resipes=[];



for(var i=0;i<navLinks.length;i++){
   navLinks[i].addEventListener("click",function(e){
     var currentMeal= e.target.text;
     getRecipes(currentMeal)
   })
}





getRecipes("pizza")
async function getRecipes(meal){
   var response= await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
   var recipeBody=await response.json()
   // console.log(recipeBody.recipes)
   resipes=recipeBody.recipes;
   displayRecipes()
}




function displayRecipes(){
   var cols=''
   for (var i=0;i<resipes.length;i++){
      cols+=
      `
         <div class="col-3 my-2">
            <div class="recipe">
                  <img src="${resipes[i].image_url}" class="w-100 " alt="">
                  <h6>${resipes[i].title}</h6>
                  <a target="_blank" href="${resipes[i].source_url}" class="btn btn-info">source</a>
                  <a onclick="getDetails(${resipes[i].recipe_id})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning">details</a>
            </div>
         </div>
      `
   }
   document.getElementById("recipeData").innerHTML=cols;

}




var recipeDetails;
async function getDetails(recipe_id){
   var response=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipe_id}`);
    recipeDetails=await response.json();
   
   displayRecipeDetail()
}




function displayRecipeDetail(){
  var dataDetails= recipeDetails.recipe;
   var recipeDetailsData=
   `
   <img src="${dataDetails.image_url}" class="w-100">
   <h4>${dataDetails.title}</h4>
   <p>${dataDetails.ingredients}</P>
   `;
   document.getElementById("details").innerHTML=recipeDetailsData;
 }
 

