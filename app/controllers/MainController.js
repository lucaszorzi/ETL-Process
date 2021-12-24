const fetch = require('node-fetch');
const numbers_db = require("../models/numbers");

async function main(req, res){
    let numbers = [];

    //extraio os dados da fonte
    numbers = await extract(numbers);

    //ordena utilizando QuickSort
    numbers = await quickSort(numbers, 0, numbers.length);


    //insere no banco SQLite
    try {
        numbers.forEach(number => {
            if(number != null)
                numbers_db.create({
                    number: number
                });

        });
    } catch (err) {
        console.log(err);
        res.sendStatus(err);
    }

    res.sendStatus(200);
}


/// extrai os números de cada página da URL e concatena em um array
async function extract(numbers) {
    let page = 2000;

    console.log("Getting numbers. It may take a long time. Please wait...");

    do {

        let response = await fetch("http://challenge.dienekes.com.br/api/numbers?page=" + page);
        
        if (response.status !== 200) continue;

        let data = await response.json();

        numbers = numbers.concat(data.numbers);
        
        if (data.numbers.length == 0) break;
        page++;

    } while (true);
        
    return numbers;
}

/// particiona o array para descobrir quando trocar os elementos
function partition(array, first, last) {
    var pivot = array[Math.floor((last + first) / 2)];
    var i = first;
    var j = last;

    while (i <= j) {
        while (array[i] < pivot)    i++;
        while (array[j] > pivot)    j--;

        if (i <= j) {
            //swap
            aux = array[i];
		    array[i] = array[j];
			array[j] = aux;
            i++;
            j--;
        }
    }
    return i;
}


function quickSort(array, first, last) {
    var pivot;

    if (array.length > 1) {
        pivot = partition(array, first, last);
        if (first < pivot - 1)
            quickSort(array, first, pivot - 1);
        
        if (pivot < last)
            quickSort(array, pivot, last);
    }
    return array;
}

module.exports = { main };
