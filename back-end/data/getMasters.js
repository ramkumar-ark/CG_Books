import csv from 'csv-parser';
import fs from 'fs';

async function readCsvData(fileName){
    const results = [];

    const data = fs.readFileSync(fileName, 'utf-8');

    csv({ separator: ',' })
        .on('data', function(data) {
           results.push(data);
        })
        .on('end', function() {
            // finished processing the CSV file
        })
        .write(data);

    return results;
}


export default async function getMasters(){
    const path = `${__dirname}/ledgerMasters.csv`;
    const ledgerMasters = await readCsvData(path);
    return {ledgerMasters};
}
