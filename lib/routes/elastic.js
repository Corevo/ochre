import elastic from 'elasticsearch';
let elasticRouter = new require('express').Router();

const FILES_PATH = process.env.FILES_PATH || '/data';

let client = new elastic.Client({
    host: process.env.ELASTIC_SERVER || 'localhost:9200',
    sniffOnStart: true
});

elasticRouter.get('/s/:query', (req, res) => {
    let fields = ["name", "tags", "author", "unit"];
    if (!req.query.tags) {
        fields.push("contents");
    }
    client.search({
        index: 'files',
        body: {
            query: {
                multi_match: {
                    query: req.params.query,
                    fields
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
                desc: (hit.highlight && hit.highlight.contents) ? hit.highlight.contents.join('...') : undefined,
                date: hit._source.date,
                author: hit._source.author,
                unit: hit._source.unit,
                tags: hit._source.tags
            })));
        } else {
            console.log(err);
            res.status(502);
        }
    });
});

module.exports = elasticRouter;
