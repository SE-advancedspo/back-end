const fetch = require("node-fetch");
const app = require('../app');
const request = require('supertest');

const url = "http://localhost:8080"


describe('test-coverage degli spot', () => {
    test('Get di tutti gli spot', async () => {
        expect.assertions(1)
        expect((await fetch(url+"/evento")).status).toEqual(200)
    })
    test('Aggiunta di uno spot', async () => {
        
        let payload={
            "testo" : "Spotto Alessandra in mensa a povo 0",
            "autore" : "Francesco1"
    }      
        let res= await request(url).post("/spot").send(payload).expect(201);
       
        expect(res.body.message).toEqual("Spot creato con successo");
    })

    test('Aggiunta di un like ad uno spot', async () => {
        
        let payload={
            "id": "63a329cfa04114ce4f5523df"
        }    
        await request(url).post("/spot/like/Francesco1").send(payload).expect(201);
       
    })
    test('Errore nel inserire un doppio like allo stesso spot', async () => {
        
        let payload={
            "id": "63a329cfa04114ce4f5523df"
        }    
        const res= await request(url).post("/spot/like/Francesco1").send(payload).expect(400);
        expect(res.body.res).toEqual("Spot already liked");
       
    })
    test('Rimozione di un like ad uno spot', async () => {
        
        let payload={
            "id": "63a329cfa04114ce4f5523df"
        }    
         await request(url).delete("/spot/like/Francesco1").send(payload).expect(204);
       
    })
   


});