import express from 'express';
import path from 'path';
import elastic from './lib/routes/elastic';

let port = 80;
let app = express();

const STATIC_DIR = path.join(__dirname, 'public/assets');
app.use('/assets', express.static(STATIC_DIR));

const FILES_PATH = process.env.FILES_PATH || '/data';
app.use('/files', express.static(FILES_PATH));

app.use('/api', elastic);

app.use('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server.
let server = app.listen(port, () => {
    let { address } = server.address();
    console.log(`Server listening at http:\/\/${address}:${port}`);
});
