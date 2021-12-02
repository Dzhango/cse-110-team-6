class RecipeExpand extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    // create elements for style and an article to hold html
    const styles = document.createElement('style')
    const article = document.createElement('article')

    // style for article
    // same as recipepage.css, so should we even use a shadow DOM?
    styles.innerHTML = `
    `
  
      // skeleton code for recipe that will be filled in
      article.innerHTML = `
      <!-- Font awesome -->
      <script src="https://kit.fontawesome.com/16e1426982.js" crossorigin="anonymous"></script>
    
      <!-- Custom styling -->
    
      <!-- Bootstrap cdn -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      <div class = "row mt-4 px-4">
      <div class = "col-5">
          <img class = "photo" src = "https://yournorthcounty.com/wp-content/uploads/2017/07/acai-bowls-san-diego-north-county.jpg" class = "img-fluid rounded" style = "height:auto; width:100%;">
      </div>

      <div class = "col-7 bg-light p-4">
        <div class = "row">
          <div class = "col-3">
            <button class = "btn btn-warning rounded-pill back-button">Back to Search</button>
          </div>

          <div class = "col-6 text-center">
            <h1 class = "recipe-title"></h1>
            <p id="time"></p>

            <div class = "row recipe-tags">
              <p id="summary" class = "mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, accusamus libero, ex dicta magnam, eveniet quisquam nam quos temporibus minima praesentium! Tempora animi ducimus, dolor veniam adipisci deserunt molestias vel.</p>
            </div>
          </div>

          <div class = "col-3">
            <button class = "btn btn-success rounded-pill float-end add-to-myrecipes">Add to Recipe</button>
          </div>
        </div>
      </div>
    </div>

    <!-- bottom -->
    <div class = "row mt-4 ms-4">
      <div class = "col-5">
        <h2>
          Ingredients
        </h2>

        <ul class = "mt-3 ingredients-list">
        </ul>
      </div>

      <div class = "col-7" >
        <h2>
          Directions
        </h2>

        <ol class = "mt-3 directions-list">
        </ol>
      </div>
    </div>
    `
  
      // append style and article to shadow root
      this.shadowRoot.append(styles, article)
    }
  
    /*
       * populates the article child of <recipe-expand> with selected recipe data
       */
    set data (data) {
      this.json = data
  
      // reset article to be empty so we can populate it
      // fill in with same html as in constructor
      this.shadowRoot.querySelector('article').innerHTML = `
      <!-- Font awesome -->
      <script src="https://kit.fontawesome.com/16e1426982.js" crossorigin="anonymous"></script>
    
      <!-- Custom styling -->
    
      <!-- Bootstrap cdn -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      <div class = "row mt-4 px-4">
      <div class = "col-5">
          <img class = "photo" src = "https://yournorthcounty.com/wp-content/uploads/2017/07/acai-bowls-san-diego-north-county.jpg" class = "img-fluid rounded" style = "height:100%; width:100%;">
      </div>

      <div class = "col-7 bg-light p-4 border-end border-start rounded">
        <div class = "row">
          <div class = "col-md-3">
            <button class = "btn btn-warning rounded-pill back-button">Back to Search</button>
          </div>

          <div class = "col-md-6 text-center">
            <h1 class = "recipe-title"></h1>
            <p id="time"></p>

            <div class = "row recipe-tags">
              <p id='summary' class='mt-4'></p>
            </div>
          </div>

          <div class = "col-md-3">
            <button class = "btn btn-success rounded-pill float-end add-to-myrecipes">Add to Recipe</button>
          </div>
        </div>
      </div>
    </div>

    <!-- bottom -->
    <div class = "row mt-4 p-4">
      <div class = "col-5 py-4">
        <h2>
          Ingredients
        </h2>

        <ul class = "mt-3 ingredients-list">
        </ul>
      </div>

      <div class = "col-7 bg-light border-end border-start rounded py-4" >
        <h2>
          Directions
        </h2>

        <ol class = "mt-3 directions-list">
        </ol>
      </div>
    </div>
          `
  
      // TODO: set all data
  
      // set image
      const recipeImage = data.image
      this.shadowRoot.querySelector('.photo').setAttribute('src', recipeImage)
      //this.shadowRoot.querySelector('.photo').style = `background-image: url(${recipeImage})`
  
      // set recipe title
      const recipeTitle = data.title
      this.shadowRoot.querySelector('.recipe-title').innerHTML = recipeTitle
  
      // set total time
      const totalTime = data.readyInMinutes
      this.shadowRoot.getElementById('time').innerHTML = totalTime + ' min'
  
      // set racipe tags
      const diets = ['vegan', 'vegetarian', 'ketogenic', 'gluten free', 'paleo', 'pescetarian']
      const dietArr = data.diets
      const dishTypeArr = data.dishTypes
      const tagsContainer = this.shadowRoot.querySelector('.recipe-tags')
      for (const item of dietArr) {
        if (diets.includes(item)) {
          const div1 = document.createElement('div')
          div1.classList.add('col-4', 'mt-3')
          const but1 = document.createElement('button')
          but1.classList.add('btn', 'btn-primary', 'rounded-pill', 'w-100')
          but1.innerHTML = item
          div1.appendChild(but1)
          tagsContainer.appendChild(div1)
        //   const tag = document.createElement('span')
        //   tag.innerHTML = item
        //   tagsContainer.appendChild(tag)
        }
      }
      for (const item of dishTypeArr) {
        const div1 = document.createElement('div')
        div1.classList.add('col-4', 'mt-3')
        const but1 = document.createElement('button')
        but1.classList.add('btn', 'btn-primary', 'rounded-pill', 'w-100')
        but1.innerHTML = item
        div1.appendChild(but1)
        tagsContainer.appendChild(div1)
        // const tag = document.createElement('span')
        // tag.innerHTML = item
        // tagsContainer.appendChild(tag)
      }
  
      // iterate over 'diets' and 'dishTypes' to set tags
  
      // set description
      if (data.summary !== null) {
        const description = data.summary // need to find this
        const descriptionList = description.split('.')
        let conciseDescription = ''
        for (let i = 0; i < 4; i++) {
          conciseDescription = conciseDescription + descriptionList[i]
        }
        this.shadowRoot.getElementById('summary').innerHTML = conciseDescription
      }
  
      // set serving size
      // TODO: no serving on the page
    //   const servings = data.servings
    //   this.shadowRoot.getElementById('servings').innerHTML = servings
  
      // fetch recipe ingredient and nutrition info
      let recipeInfo
      fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${data.id}/information?&includeNutrition=true`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "e448cb3f23msh24599c589d222bfp18177ajsn2d6682024b3b"
        }
      })
      .then((response) => {
        return response.json()
      }).then((data) => {
        recipeInfo = data
        console.log(recipeInfo)
        // set calories
        // TODO: no calorie
        // const calories = Math.floor(recipeInfo.nutrition.nutrients[0].amount / servings)
        // this.shadowRoot.getElementById('cals').innerHTML = calories

        // set ingredient list
        const ingredientsList = this.shadowRoot.querySelector('ul.ingredients-list')
        for (const item of recipeInfo.extendedIngredients) {
          const ingred = document.createElement('li')
          ingred.innerHTML = item.originalString
          ingredientsList.appendChild(ingred)
        }
      }).catch((error) => {
        console.error(error.name + ' ' + error.message)
        console.log('can not find recipe instructions by id, try to see if the data itself contain it')
      })
  
      // set ingredient list
      if (data.extendedIngredients !== undefined) {
        const ingredientsList = this.shadowRoot.querySelector('ul.ingredients-list')
        for (const item of data.extendedIngredients) {
          const ingred = document.createElement('li')
          ingred.innerHTML = item.originalString
          ingredientsList.appendChild(ingred)
        }
      } else {
        console.log('recipe itself does not contain ingredients list')
      }

      // set necessary equipment
      // TODO: no equipments
      if (data.analyzedInstructions[0] !== undefined) {
        const equipmentSet = new Set()
        const recipeSteps = data.analyzedInstructions[0].steps
        for (let i = 0; i < recipeSteps.length; i++) {
          const equipmentArr = recipeSteps[i].equipment
          for (let j = 0; j < equipmentArr.length; j++) {
            equipmentSet.add(equipmentArr[j].name)
          }
        }

        // set directions list
        const directions = data.analyzedInstructions[0].steps
        const directionsList = this.shadowRoot.querySelector('ol.directions-list')
        for (let i = 0; i < directions.length; i++) {
          const dir = document.createElement('li')
          dir.innerHTML = directions[i].step
          directionsList.appendChild(dir)
        }
      }

    //   let count = 1
    //   const equipmentList = this.shadowRoot.getElementById('equipment-list')
    //   for (const item of equipmentSet) {
    //     if (count === equipmentSet.size) {
    //       equipmentList.innerHTML += item
    //     } else {
    //       equipmentList.innerHTML = equipmentList.innerHTML + item + ', '
    //     }
    //     count++
    //   }
  
      const favoriteButton = this.shadowRoot.querySelector('.add-to-myrecipes')
      if (window.localStorage.getItem(data.id) != null) {
        favoriteButton.innerHTML = 'Remove from MyRecipes'
      } else {
        favoriteButton.innerHTML = 'Add to MyRecipes'
      }
    }
  
    get data () {
      return this.json
    }
}

customElements.define('recipe-expand-bootstrap', RecipeExpand)
