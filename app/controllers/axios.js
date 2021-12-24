const axios = require("axios");
const numbers_db = require("../models/numbers");
const lastpage_db = require("../models/lastPage");

async function extract(req, res) {
    let statusCode=200;
    let lastPage=1;

    try {
        let lastPageRegistry = await lastpage_db.findByPk(1);
        if(lastPageRegistry == undefined)
            await lastpage_db.create({ lastpage: 1 });
        else
            lastPage = lastPageRegistry.lastpage;
        
        do {
            let response = await axios.get('http://challenge.dienekes.com.br/api/numbers?page=' + lastPage);
            
            if(response.data.numbers.length == 0){
                statusCode = 404;
                message = "There are no more numbers available.";
                console.log(message);
            }
            else {
                for (let j = 0; j < response.data.numbers.length; j++)
                    numbers_db.create({
                        number: response.data.numbers[j]
                    });
                
                lastPage++;
                lastpage_db.update({ lastpage: lastPage }, { where: { id: 1 } });
            }
        } while (statusCode!=404);

    } catch (err) {
        console.log(err.response.data);
        res.status(500).json({ message: err.response.data });
        return;
    }
        
}


module.exports = {extract};