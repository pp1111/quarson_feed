const parseString = require('xml2js').parseString;
const request = require('request');
const fs = require('fs');
const q = require('q');
const csvjson = require('csvjson');
const jsonexport = require("jsonexport");
const express = require('express');
let app = express();

app.get('/qarson_super_promo', (req, res, next) => q.async(function *() {
    const quarsonXML = yield promiseRequest('http://export.qarson.fr/compare/0f2ffd6aa2bdf6ae67aa6b2007ff4642');
    let quarsonCSV = yield promiseRequest('http://feed.qarson.fr/uploads/export/export_file/13/AdWords.csv');
    const quarsonJSON = yield promiseXmlParse(quarsonXML);

    let quarsonMap1 = new Map();
    let quarsonMap2 = new Map();

    quarsonJSON.products.product.map(product => {
        let mapValue = {
            title: product.custom[0].title[0],
            price: product.custom[0].price[0],
            old_price: product.custom[0].old_price[0],
            link: product.click[0],
            photo: product.photo[0]
        }
        quarsonMap1.set(product.id[0], mapValue);
    });

    csvjson.toObject(quarsonCSV.toString('utf8')).filter(product => {
        return product.super_promo == '1';
    }).map(product => {
        product.offer = product.offer.split('.')[0];
        let mapValue = JSON.parse(JSON.stringify(product));
        delete mapValue.offer;

        quarsonMap2.set(product.offer, mapValue);
    });
    const mapIds = csvjson.toObject(quarsonCSV.toString('utf8')).map(product => product.offer.split('.')[0]);

    const feed = mapIds.map(id => {
        if (quarsonMap1.get(id) && quarsonMap2.get(id)) {
            return {
                id: id,
                title: quarsonMap1.get(id).title,
                description: quarsonMap1.get(id).title,
                link: quarsonMap1.get(id).link,
                condition: `new`,
                price: quarsonMap1.get(id).price,
                availability: 'in stock',
                'image link': quarsonMap1.get(id).photo,
                gtin: id,
                mpn: id,
                brand: quarsonMap2.get(id).make,
                'custom_label_0': quarsonMap1.get(id).old_price,
                'custom_label_1': quarsonMap2.get(id).discount_amount,
                'custom_label_2': quarsonMap2.get(id).monthly_installment,
                'custom_label_3': quarsonMap2.get(id).first_payment,
                'custom_label_4': quarsonMap2.get(id).downpayment_amount,
            };
        }
    }).filter(product => product);

    jsonexport(feed, function(err, csv){
        res.send(csv);
    });
})().catch(error => console.log(error)));

app.get('/qarson_discount', (req, res, next) => q.async(function *() {
    const quarsonXML = yield promiseRequest('http://export.qarson.fr/compare/0f2ffd6aa2bdf6ae67aa6b2007ff4642');
    let quarsonCSV = yield promiseRequest('http://feed.qarson.fr/uploads/export/export_file/13/AdWords.csv');
    const quarsonJSON = yield promiseXmlParse(quarsonXML);

    let quarsonMap1 = new Map();
    let quarsonMap2 = new Map();

    quarsonJSON.products.product.map(product => {
        let mapValue = {
            title: product.custom[0].title[0],
            price: product.custom[0].price[0],
            old_price: product.custom[0].old_price[0],
            link: product.click[0],
            photo: product.photo[0]
        }
        quarsonMap1.set(product.id[0], mapValue);
    });

    csvjson.toObject(quarsonCSV.toString('utf8')).map(product => {
        product.offer = product.offer.split('.')[0];
        let mapValue = JSON.parse(JSON.stringify(product));
        delete mapValue.offer;

        quarsonMap2.set(product.offer, mapValue);
    });
    const mapIds = csvjson.toObject(quarsonCSV.toString('utf8')).map(product => product.offer.split('.')[0]);

    const feed = mapIds.map(id => {
        if (quarsonMap1.get(id) && quarsonMap2.get(id)) {
            return {
                id: id,
                title: quarsonMap1.get(id).title,
                description: quarsonMap1.get(id).title,
                link: quarsonMap1.get(id).link,
                condition: `new`,
                price: quarsonMap1.get(id).price,
                availability: 'in stock',
                'image link': quarsonMap1.get(id).photo,
                gtin: id,
                mpn: id,
                brand: quarsonMap2.get(id).make,
                'custom_label_0': quarsonMap1.get(id).old_price,
                'custom_label_1': quarsonMap2.get(id).discount_amount,
                'custom_label_2': quarsonMap2.get(id).monthly_installment,
                'custom_label_3': quarsonMap2.get(id).first_payment,
                'custom_label_4': quarsonMap2.get(id).downpayment_amount,
            };
        }
    }).filter(product => product);

    jsonexport(feed, function(err, csv){
        res.send(csv);
    });
})().catch(error => console.log(error)));

app.get('/qarson_adw_rem', (req, res, next) => q.async(function *() {
    const quarsonXML = yield promiseRequest('http://export.qarson.fr/compare/0f2ffd6aa2bdf6ae67aa6b2007ff4642');
    let quarsonCSV = yield promiseRequest('http://feed.qarson.fr/uploads/export/export_file/13/AdWords.csv');
    const quarsonJSON = yield promiseXmlParse(quarsonXML);

    let quarsonMap1 = new Map();
    let quarsonMap2 = new Map();

    quarsonJSON.products.product.map(product => {
        let mapValue = {
            title: product.custom[0].title[0],
            price: product.custom[0].price[0],
            old_price: product.custom[0].old_price[0],
            link: product.click[0],
            photo: product.photo[0]
        }
        quarsonMap1.set(product.id[0], mapValue);
    });

    csvjson.toObject(quarsonCSV.toString('utf8')).filter(product => {
        return product.super_promo == '1';
    }).map(product => {
        product.offer = product.offer.split('.')[0];
        let mapValue = JSON.parse(JSON.stringify(product));
        delete mapValue.offer;

        quarsonMap2.set(product.offer, mapValue);
    });
    const mapIds = csvjson.toObject(quarsonCSV.toString('utf8')).map(product => product.offer.split('.')[0]);

    const feed = mapIds.map(id => {
        if (quarsonMap1.get(id) && quarsonMap2.get(id)) {
            return {
                ID: id,
                ID2: quarsonMap1.get(id).title,
                'Item title': quarsonMap1.get(id).title,
                'Final URL': quarsonMap1.get(id).link,
                'Image URL': quarsonMap1.get(id).photo,
                'Item description': quarsonMap1.get(id).title,
                'Sale price': quarsonMap1.get(id).price,
                'image link': quarsonMap1.get(id).photo,
                'Item category': quarsonMap2.get(id).make,
                price: quarsonMap1.get(id).old_price,   
                'Contextual keywords': quarsonMap2.get(id).make,
                'Item subtitle': quarsonMap2.get(id).make,
                'Formatted price': quarsonMap2.get(id).monthly_installment,
                'Formatted sale price': quarsonMap2.get(id).downpayment_amount,
            };
        }
    }).filter(product => product);

    jsonexport(feed, function(err, csv){
        res.send(csv);
    });
})().catch(error => console.log(error)));


app.listen(3000, () => console.log('app listen 3000'));

function promiseRequest(url) {
    return new Promise( (resolve, reject) => {
        request(url, function (error, response, body) {
            body ? resolve(body) : reject(err);
        });
    })
}

function promiseXmlParse(xml) { 
    return new Promise((resolve, reject) => {
        parseString(xml, function (err, result) {
            result ? resolve(result) : reject(err);
        });
    })
}
