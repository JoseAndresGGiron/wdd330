const URLrequest =
  "https://brotherblazzard.github.io/canvas-content/fruit.json";

let dropdownOne = document.querySelector("#fruta1");
dropdownOne.length = 0;
let dropdownTwo = document.querySelector("#fruta2");
dropdownOne.length = 0;
let dropdownThree = document.querySelector("#fruta3");
dropdownOne.length = 0;

let defaultOptionOne = document.createElement("option");
defaultOptionOne.text = "Choose One Fruit";
let defaultOptionTwo = document.createElement("option");
defaultOptionTwo.text = "Choose Another Fruit";
let defaultOptionThree = document.createElement("option");
defaultOptionThree.text = "Choose the last Fruit";

dropdownOne.add(defaultOptionOne);
dropdownOne.selectedIndex = 0;
dropdownTwo.add(defaultOptionTwo);
dropdownTwo.selectedIndex = 0;
dropdownThree.add(defaultOptionThree);
dropdownThree.selectedIndex = 0;


fetch(URLrequest)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    let optionOne;
    let optionTwo;
    let optionThree;
    fruits = jsonObject;
    console.log(fruits);


    for (let i = 0; i < jsonObject.length; i++) {
      optionOne = document.createElement("option");
      optionOne.text = jsonObject[i].name;
      dropdownOne.add(optionOne);

      optionTwo = document.createElement("option");
      optionTwo.text = jsonObject[i].name;
      dropdownTwo.add(optionTwo);

      optionThree = document.createElement("option");
      optionThree.text = jsonObject[i].name;
      dropdownThree.add(optionThree);
    }
    return fruits;
  });


freshForm = document.querySelector("form[name=freshForm]");
freshForm.querySelector("button").addEventListener("click", function () {
  freshForm.requestSubmit();
});

freshForm.addEventListener("submit", function (e) {
  e.preventDefault();
  displayForm();
});

function displayForm() {
  // get input information
  let formName = document.querySelector("#form_first").value;
  let formEmail = document.querySelector("#form_email").value;
  let formPhone = document.querySelector("#form_phone").value;
  let formFruitOne = document.querySelector("#fruta1").value;
  let formFruitTwo = document.querySelector("#fruta2").value;
  let formFruitThree = document.querySelector("#fruta3").value;
  let formSpecial = document.querySelector("#form_special").value;


  const date = new Date();

  let fruitCarbOne = fruits.filter(function (fruit) {
    return fruit.name == document.querySelector("#fruta1").value;
  });
  let fruitCarbTwo = fruits.filter(function (fruit) {
    return fruit.name == document.querySelector("#fruta2").value;
  });
  let fruitCarbThree = fruits.filter(function (fruit) {
    return fruit.name == document.querySelector("#fruta3").value;
  });
  let carbTotal =
    fruitCarbOne[0].nutritions.carbohydrates +
    fruitCarbTwo[0].nutritions.carbohydrates +
    fruitCarbThree[0].nutritions.carbohydrates;


  let fruitProteinOne = fruits.filter(function (fruit) {
    return fruit.name == document.querySelector("#fruta1").value;
  });
  let fruitProteinTwo = fruits.filter(function (fruit) {
    return fruit.name == document.querySelector("#fruta2").value;
  });
  let fruitProteinThree = fruits.filter(function (fruit) {
    return fruit.name == document.querySelector("#fruta3").value;
  });
  let proteinTotal =
    fruitProteinOne[0].nutritions.protein +
    fruitProteinTwo[0].nutritions.protein +
    fruitProteinThree[0].nutritions.protein;


  let fruitFatOne = fruits.filter(function (fruit) {
    return fruit.name == document.querySelector("#fruta1").value;
  });
  let fruitFatTwo = fruits.filter(function (fruit) {
    return fruit.name == document.querySelector("#fruta2").value;
  });
  let fruitFatThree = fruits.filter(function (fruit) {
    return fruit.name == document.querySelector("#fruta3").value;
  });
  let fatTotal =
    fruitFatOne[0].nutritions.fat +
    fruitFatTwo[0].nutritions.fat +
    fruitFatThree[0].nutritions.fat;


  let fruitSugarOne = fruits.filter(function (fruit) {
    return fruit.name == document.querySelector("#fruta1").value;
  });
  let fruitSugarTwo = fruits.filter(function (fruit) {
    return fruit.name == document.querySelector("#fruta2").value;
  });
  let fruitSugarThree = fruits.filter(function (fruit) {
    return fruit.name == document.querySelector("#fruta3").value;
  });
  let sugarTotal =
    fruitSugarOne[0].nutritions.sugar +
    fruitSugarTwo[0].nutritions.sugar +
    fruitSugarThree[0].nutritions.sugar;

  let result = `
    <table>
      <caption>Your order is being prepared!<br>Order Details</caption>
      <tbody>
        <tr>
          <td>Order Date: </td>
          <td>${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}</td>
        </tr>
        <tr>
          <td>First Name: </td>
          <td>${formName}</td>
        </tr>
        <tr>
          <td>Email: </td>
          <td>${formEmail}</td>
        </tr>
        <tr>
          <td>Phone: </td>
          <td>${formPhone}</td>
        </tr>
        <tr>
          <td>Fruit #1: </td>
          <td>${formFruitOne}</td>
        </tr>
        <tr>
          <td>Fruit #2: </td>
          <td>${formFruitTwo}</td>
        </tr>
        <tr>
          <td>Fruit #3: </td>
          <td>${formFruitThree}</td>
        </tr>
        <tr>
          <td>Special Instructions: </td>
          <td>${formSpecial}</td>
        </tr>
        <tr>
          <td>Total Carbs: </td>
          <td>${carbTotal.toFixed(2)} grams</td>
        </tr>
        <tr>
          <td>Total Protein: </td>
          <td>${proteinTotal.toFixed(2)} grams</td>
        </tr>
        <tr>
          <td>Total Fat: </td>
          <td>${fatTotal.toFixed(2)} grams</td>
        </tr>
        <tr>
          <td>Total Sugar: </td>
          <td>${sugarTotal.toFixed(2)} grams</td>
        </tr>
    </table>`;

  document.querySelector("#new_drink").innerHTML = result;

  // reset form
  document.querySelector("#form_first").value = "";
  document.querySelector("#form_email").value = "";
  document.querySelector("#form_phone").value = "";
  document.querySelector("#fruta1").value = "";
  document.querySelector("#fruta2").value = "";
  document.querySelector("#fruta3").value = "";
  document.querySelector("#form_special").value = "";

  // set localStorage Value or increase by one
  let drinkCounter = Number(window.localStorage.getItem("drinks"));
  drinkCounter++;
  localStorage.setItem("drinks", drinkCounter);
}