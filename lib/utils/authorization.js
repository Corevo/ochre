import fs from 'fs';
import path from 'path';
import pathIsInside from 'path-is-inside';

const FILES_PATH = process.env.FILES_PATH || '/data';

function isUnixHiddenPath(thePath) {
    return (/(^|\/)\.[^\/\.]/g).test(thePath);
}

export default function canAccess(absolutePath) {
    if (!pathIsInside(absolutePath, FILES_PATH)) {
        return (new Error("Path is not inside the allowed path"), []);
    } else if (isUnixHiddenPath(absolutePath)) {
        return (new Error("Going inside hidden paths is disallowed"), []);
    } else {
        return true;
    }
}
