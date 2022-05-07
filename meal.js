const loadMeal = () => {
    const inputField = document.getElementById('input-Field');
    const inputText = inputField.value;
    
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeal(data.meals))

    inputField.value = ''
};

const displayMeal = (meals) => {
    // console.log(meals)
    meals.forEach(meal =>{
        console.log(meal)
        const row = document.getElementById('row');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
        <img src=${meal.strMealThumb} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">
           ${meal.strInstructions.slice(0, 200)}
          </p>
          <button type="button" class="btn btn-success">Show Details</button>
          <button type="button" class="btn btn-outline-success"><a href=${meal.strYoutube} target='_blank' style="text-decoration: none; color:green" onMouseOver="this.style.color='#fff'" onMouseOut="this.style.color='green'"> Recipe Video</a></button>

        </div>
      </div>
        `
        row.appendChild(div);
    })
}