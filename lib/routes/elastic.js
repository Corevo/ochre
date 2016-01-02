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
                multi_match: {
                    query: req.params.query,
                    fields: ["name", "contents"]
                }
            },
            highlight: {
                fields: {
                    contents: {
                        fragment_size : 250,
                        number_of_fragments : 5,
                        no_match_size: 250
                    }
                }
            }
        }
    }, (err, response) => {
        if (!err) {
            res.json(response.hits.hits.map((hit) => ({
                title: hit._source.name,
                url: hit._source.path.replace(FILES_PATH, '/files'),
                desc: hit._source.contents,
                date: hit._source.date
            })));
        } else {
            res.status(502);
        }
    });
});

module.exports = elasticRouter;
