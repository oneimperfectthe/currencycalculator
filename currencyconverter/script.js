//const baseurl =
//  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const newurl='https://latest.currency-api.pages.dev/v1/currencies/eur.json';

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".container button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".message");


for (select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === 'From' && currCode === 'USD'){
            newOption.selected = 'selected';
        }else if(select.name === 'To' && currCode === 'INR'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener('change',(evt) => {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let counCode = countryList[element.value];
    newimg = `https://flagsapi.com/${counCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newimg;
}


// const updateExchangeRate = async () => {
//   let amount = document.querySelector(".amount input");
//   let amtVal = amount.value;
//   if (amtVal === "" || amtVal < 1) {
//     amtVal = 1;
//     amount.value = "1";
//   }
//   const URL = `${baseurl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//   let response = await fetch(URL);
//   let data = await response.json();
//   let rate = data[toCurr.value.toLowerCase()];

//   let finalAmount = amtVal * rate;
//   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
// };

// btn.addEventListener("click", (evt) => {
//   evt.preventDefault();
//   updateExchangeRate();
// });

// window.addEventListener("load", () => {
//   updateExchangeRate();
// });

const updateExchangeRate = async()=>{
    let response = await fetch(newurl);
    let data = await response.json();
    console.log(data["eur"]);
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    let x = data["eur"][`${fromCurr.value.toLowerCase()}`];
    let y = data["eur"][`${toCurr.value.toLowerCase()}`];
    finalAmount = (amount.value/x)*y;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});