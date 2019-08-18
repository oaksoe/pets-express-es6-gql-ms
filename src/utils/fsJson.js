import * as fs from 'fs';

export function readFileAsync(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(result));
            }
        });
    });
}

export function writeFileAsync(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(data), (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}