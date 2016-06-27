import path from 'path';
let filesRouter = new require('express').Router();
import canAccess from '../utils/authorization';
import fileOrPreview from '../utils/preview';

const FILES_PATH = process.env.FILES_PATH || '/data';

filesRouter.get('/*', (req, res) => {
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

export default filesRouter;
