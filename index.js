let exchange = document.querySelector(".exchange");
let btn = document.querySelector(".btn");
let menu = document.querySelector(".dropdown-menu");
let tbodyEl = document.querySelector(".tbody");
function buildMoney() {
menu.addEventListener("click", function(event){
  let textContent = event.target.textContent;
  btn.innerHTML = `${textContent}`;
  exchange.innerHTML = `${textContent} Exchange rates`;
  console.log(textContent);
  readRate(textContent);
});
}
async function readRate(textContent) {
  try{
    let moneyAll = await fetch(`https://api.exchangerate-api.com/v4/latest/${textContent}`);
    let money = await moneyAll.json();
    let arrValues = Object.values(money.rates);
    let arrKeys = Object.keys(money.rates);
    console.log(money);
    buildTable(arrKeys, arrValues);
  }
  catch {
    alert("error")
  }
}
function buildTable(arrKeys, arrValues) {
  console.log(arrValues, arrKeys);
    // for (let i = 0; i < arrValues.lenght; i++) {
    //   tbodyEl.insertAdjacentHTML('beforeend',  `<tr class="row-${i+1}">
    //                                             <th scope="row"> ${arrKeys[i]} </th>
    //                                             <td>${arrValues[i]}</td>
    //                                             </tr>` 
    //                                             );
                                                
    // }
    for(let i = 0; i < arrValues.length; i++) {
      tbodyEl.insertAdjacentHTML('beforeend', `<tr class="row-${i+1}">
                                                  <th scope="row"> ${arrKeys[i]} </th>
                                                  <td>${arrValues[i]}</td>
                                              </tr>` 
                                              );
  }
}
buildMoney();


