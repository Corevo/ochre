import path from 'path';
let filesRouter = new require('express').Router();
import canAccess from '../utils/authorization';
import fileOrPreview from '../utils/preview';
import elastic from 'elasticsearch';

const FILES_PATH = process.env.FILES_PATH || '/data';

let client = new elastic.Client({
  host: process.env.ELASTIC_SERVER || 'localhost:9200'
});

filesRouter.get('/files/*', (req, res) => {
    let file = decodeURI(req.url);
    if (file.indexOf("?") >= 0) {
        file = file.substr(0, file.indexOf("?"));
    }
    let absolutePath = path.join(FILES_PATH, file);
    if (canAccess(absolutePath)) {
        fileOrPreview(file, (f) => {res.sendFile(f)});
    } else {
        res.sendStatus(403);
    }
});

filesRouter.get('/file/:id', (req, res) => {
    client.get({
        index: 'files',
        type: 'document',
        id: req.params.id
    }, (err, result) => {
        res.render('file', {
            file: {
                name: result._source.name,
                url: result._source.path.replace(FILES_PATH, '/files'),
                desc: (result._source.contents ? result._source.contents : "") + " \n\r" + (result._source.desc ? result._source.desc : "")
            }
        });
    });
});

export default filesRouter;
