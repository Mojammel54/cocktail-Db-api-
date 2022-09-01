const allDrinks = (search) => {

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDrinks(data.drinks))


}


const displayDrinks = (drinks) => {

    const divContainer = document.getElementById('div-container')
    divContainer.innerHTML = '';
    drinks.forEach(drink => {

        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        
        <div  class="card">
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">category:${drink.strCategory}</h5>
            <p class="card-text">${drink.strInstructions.slice(0, 30)}</p>
        </div >
        <button onClick="drinkId(${drink.idDrink})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>
    </div >


    `
        divContainer.appendChild(div)


    });
    toggleSpinner(false)

}


const search = () => {
    toggleSpinner(true)
    const searchField = document.getElementById('input-Field')
    const searchText = searchField.value;
    allDrinks(searchText)







}





const drinkId = (idDrink) => {

    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
    fetch(url)
        .then(res => res.json())
        .then(data => drinkDetails(data.drinks[0]))

}

const drinkDetails = (details) => {



    const modalHeading = document.getElementById('exampleModalLabel');
    modalHeading.innerText = details.dateModified;

    const img = document.getElementById('img')
    // const div = document.createElement('div')


    img.innerHTML = `
    <img class="img-fluid" src="${details.strDrinkThumb}">
    <ol> Ingredient: <li>${details.strIngredient1}</li>
    <li>${details.strIngredient2}</li>
    <li>${details.strIngredient3}</li>
    </ol>
    `






}
document.getElementById('input-Field').addEventListener('keypress', function (e) {

    if (e.key === 'Enter') {
        search()
    }
});

const toggleSpinner = (isLoading) => {
    const loading = document.getElementById('loader')
    if (isLoading == true) {

        loading.classList.remove('d-none')


    }
    else {

        loading.classList.add('d-none')

    }


}







allDrinks('');
