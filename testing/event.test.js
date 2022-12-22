const fetch = require("node-fetch");
const app = require('../app');
const request = require('supertest');

const url = "http://localhost:8080"

const d = new Date(2022,7,1,19,30);
let luogo = "aKKa Trento";
let idEvt="63a2ec3d3717bf4e9724d778";
let uName="Beenca14"

describe('test-coverage degli eventi', () => {
    test('Get di tutti gli eventi', async () => {
        expect.assertions(1)
        expect((await fetch(url+"/evento")).status).toEqual(200)
    })
    test('Registrazione di un nuovo evento correttamente', async () => {
        
        var payload={
            "nome": "Festa di compleanno",
            "data": d,
            "luogo": luogo    
        }
        const res=await request(url).post('/evento')
        .set('Content-type', 'application/json')
        .send( payload )
        .expect(201);
    })
    test('Registrazione di un utente ad un evento', async () => {
        let payload={
            "id":idEvt
        }       
        await request(url).post('/evento/segui/'+uName)
        .set('Content-type', 'application/json')
        .send( payload )
        .expect(201);
    })
    
    test('Get di tutti gli eventi seguiti da un utente', async () => {
          await request(url).get('/evento/segui/'+uName).expect(200);
    })
    test('Rimozione della registrazione di un utente ad un evento', async () => {
        
        let payload={
            "id":idEvt
        }   
        const res=await request(url).delete('/evento/segui/'+uName).send(payload).expect(204);
        
    })
    

    

});