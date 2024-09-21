const inputBox=document.querySelector(".inputBox");
const inputBtn=document.querySelector(".inputBtn");
const recontenair=document.querySelector(".recipe-container");
const closebtn=document.querySelector(".close-btn");
const remethode=document.querySelector(".recipes-methode");
const redetail=document.querySelector(".recipes-detail");
const babu=document.querySelector(".babu");


 const findRecipes= async(invalue)=>{
   try{recontenair.innerHTML="Fetching your recipes....";
    let url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${invalue}`;
    let data= await fetch(url);
    recontenair.innerHTML="";
    inputBox.value=" ";
    let response= await data.json();
    displayfun(response);}catch(err){
        if(err){
            recontenair.innerHTML="Sorry Someone problem Your Recipes Try Again...";
        }
       
        return recontenair;
    }
 }

let displayfun=(mealvalue)=>{
    mealvalue.meals.forEach(meal => {
        let cdiv=document.createElement("div");
        cdiv.classList.add("creatdiv");
        cdiv.innerHTML=`
          <img src="${meal.strMealThumb}" class="appimg">
          <h2 >${meal.strArea}</h2>
          <p>${meal.strMeal}</p>
        `
        let btn=document.createElement("button");
        btn.innerHTML="View recipe";
        btn.classList.add("Btn");
        recontenair.appendChild(cdiv);
        cdiv.appendChild(btn);

        btn.addEventListener("click",()=>{
           redetail.classList.remove("hide");
           remethode.innerHTML=`
              <h2 class="one">Ingredient</h2>
              <ul class="unoder">${ingredient(meal)}</ul>
              <div class="instruction">
              <h2 class="three">Instructions</h2>
              <p class="four">${meal.strInstructions}</p>
              </div>
           `

        });
        closebtn.addEventListener("click",()=>{
            redetail.classList.add("hide");
            resetbtn(meal);
        })
    });
}
let ingredient=(meal)=>{
    let data="";
    let i=1;
    for(i=1; i<=20; i++){
       const ingredients = meal[`strIngredient${i}`];
       if(ingredients){
        const missure= meal[`strMeasure${i}`];
        data += `<li class="two">${ingredients} : ${missure}</li>`;
       }else{
        break;
       }
    }
    return data;
}
const resetbtn=(meal)=>{
   
}



inputBtn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    let inputValue=inputBox.value;
    findRecipes(inputValue);
})
