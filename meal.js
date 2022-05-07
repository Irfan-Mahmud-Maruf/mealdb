const loadMeal = () => {
    const inputField = document.getElementById('input-Field');
    const inputText = inputField.value;
    const error = document.getElementById('error');

    // empty field error massage

    if(inputText == ''){
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <h5 class="text-danger text-center w-full">Please write something!!!</h5>
        `
        error.appendChild(div);
        const row = document.getElementById('row');
        row.textContent = ''
        const singleMeal = document.getElementById('single-meal');
        singleMeal.textContent=''
    }
    if(inputText != ''){
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeal(data.meals))
    

    inputField.value = ''
    error.textContent= ''
    }
};

const displayMeal = (meals) => {
    const row = document.getElementById('row');
    row.textContent = ''
    
    if (meals == null){
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            
            <h5 class="text-danger text-center w-full">No Data Found!!!</h5>
        `
        error.appendChild(div);
        const row = document.getElementById('row');
        row.textContent = ''
        const singleMeal = document.getElementById('single-meal');
        singleMeal.textContent=''
    }else{
    meals.forEach(meal =>{
        
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
              <button type="button" class="btn btn-success" onclick='showDetails(${meal.idMeal})'>Show Details</button>
              <button type="button" class="btn btn-outline-success"><a href=${meal.strYoutube} target='_blank' style="text-decoration: none; color:green" onMouseOver="this.style.color='#fff'" onMouseOut="this.style.color='green'"> Recipe Video</a></button>

            </div>
        </div>
        `
        row.appendChild(div);
    })
}
}

const showDetails = (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => showSingleMeal(data.meals[0]))
}

const showSingleMeal = (meal) =>{
    const singleMeal = document.getElementById('single-meal');
    singleMeal.textContent=''
    const div = document.createElement('div');
    div.classList.add('row');

    div.innerHTML = `
        <div class="col-md-4">
            <img src=${meal.strMealThumb} class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>

            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    Description
                  </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">${meal.strInstructions}</div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingTwo">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Category
                  </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">${meal.strCategory}</div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingThree">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    Area
                  </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">${meal.strArea}</div>
                </div>
              </div>
            </div>
            
            <button type="button" class="btn btn-outline-success w-100"><a href=${meal.strYoutube} target='_blank' style="text-decoration: none; color:green" onMouseOver="this.style.color='#fff'" onMouseOut="this.style.color='green'"> Recipe Video</a></button>

          </div>
        </div>
    `
    singleMeal.appendChild(div);
}