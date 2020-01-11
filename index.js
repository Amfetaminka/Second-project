let btn = document.querySelector(".btn");
let col = document.querySelector(".col");
let bodyTable= document.querySelector(".table-body");
let menu = document.querySelector(".dropdown-menu");
let spinnerJs = document.querySelector('.spinner-border');
spinnerJs.style.display = 'none';

function exchangeRates() {
    if(localStorage.length == 0) {
        localStorage.setItem('value', 'USD');
        let menuEl = document.querySelector(`.${localStorage.getItem('value')}`);
        menuEl.classList.add('active');
    } 
    else {
        let menuEl = document.querySelector(`.${localStorage.getItem('value')}`);
        menuEl.classList.add('active');
    }
    readMoney();
}

function buildTbody(arrKeys, arrValues) {
    btn.innerHTML = localStorage.getItem('value');
    col.innerHTML = localStorage.getItem('value') + " Exchange rate";
    bodyTable.innerHTML = '';
    for(let i = 0; i < arrValues.length; i++) {
        let tbodyTextEl =  `<tr class="row-${i+1}">
                                <th scope="row"> ${arrValues[i]} </th>
                                <td>${arrKeys[i]}</td>
                            </tr>`;
        bodyTable.insertAdjacentHTML('beforeend', tbodyTextEl);
    };
}

async function readMoney () {
    try {
        loader();
        let money = await fetch(`https://api.exchangerate-api.com/v4/latest/${localStorage.getItem('value')}`);
        let moneys = await money.json();
        let arrValues = Object.keys(moneys.rates);
        let arrKeys = Object.values(moneys.rates);
        buildTbody(arrKeys, arrValues);
    }
    catch {
        alert("Sorry, check your internet connection!")
    }
    finally {
        spinnerJs.remove();
    }
}

function buildThead(event) {
    if(event.target.textContent.length == 3) {
        localStorage.setItem('value', event.target.textContent);
        let menuEl = event.target;
        for(let i = 0; i < menu.children.length; i++) {
            let linkEl = menu.children[i];
            linkEl.classList.remove('active');
        }
        menuEl.classList.add('active');
        readMoney();
    }
}
menu.addEventListener('click', buildThead);

function loader() {
    spinnerJs.style.display = 'flex';
}
exchangeRates();

