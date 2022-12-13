const fetch = require("node-fetch");
const app = require('../app');
const request = require('supertest');

const url = "http://localhost:8080"


describe('test-coverage degli eventi', () => {
    test('Get di tutti gli eventi', async () => {
        expect.assertions(1)
        expect((await fetch(url+"/evento")).status).toEqual(200)
    })
});