import elastic from 'elasticsearch';
let elasticRouter = new require('express').Router();

let client = new elastic.Client({
    host: process.env.ELASTIC_SERVER || 'localhost:9200',
    sniffOnStart: true
});

elasticRouter.get('/s/:query', (req, res) => {
    client.search({
        index: 'files',
        body: {
            query: {
                match: {
                    name: req.params.query,
                    contents: req.params.query
                }
            }
        }
    }, (err, response) => {
        console.log(response);
        res.json(response);
    });
});

module.exports = elasticRouter;
