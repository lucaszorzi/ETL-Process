const numbers_db = require("../models/numbers");

/// expõe a API com os números do banco de dados em 100 por página
async function api (req, res) {
    var page = req.params.page;
    var numsPerPage = 100;
    var offset = 0;

    if(isNaN(page) || page < 1)
        res.redirect('/api/numbers/page/1');
    else
        offset = parseInt(page-1) * numsPerPage;
    
    
    try {
        let response = await numbers_db.findAndCountAll({
            limit: numsPerPage,
            offset: offset,
            attributes: ['number'],
            raw: true,
            nest: true,
        });

        if (response != undefined) {
            let numbers = [];
            response.rows.forEach(number => {
                numbers.push(number.number);
            });

            res.status(200).json({ numbers: numbers });
        }
        else
            res.status(404).json({ error: "No numbers found." });
    }
    catch (err) {
        console.error(err);
        res.sendStatus(err);
    }
}

module.exports = { api }