import elastic from 'elasticsearch';
let elasticRouter = new require('express').Router();

const FILES_PATH = process.env.FILES_PATH || '/data';

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
                    contents: req.params.query
                }
            }
        }
    }, (err, response) => {
        if (!err) {
            res.json(response.hits.hits.map((hit) => ({
                title: _source.name,
                url: _source.path.replace(FILES_PATH, '/files'),
                desc: _souce.contents,
                date: _souce.date
            })));
        } else {
            res.status(502);
        }
    });
});

module.exports = elasticRouter;
