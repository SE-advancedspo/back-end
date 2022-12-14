const fetch = require("node-fetch");
const app = require('../app');
const request = require('supertest');

let url = "http://localhost:8080"
let url2 = "http://localhost:8080"

describe('test-coverage degli user', () => {
    url += "/user"
    test('Funziona la get di tutti gli users', async () => {
        
        expect.assertions(1)
        expect((await fetch(url)).status).toEqual(200)
    })
    test('Registrazione di un utente correttamente', async () => {
        var payload={
            "username": "Beenc2xa14",
            "email": "franceslini@gmail.com",
            "password": "verde32",
            "contatto": "telegram.com"    
        }
        const res=await request(url2).post('/user')
        .set('Content-type', 'application/json')
        .send( payload )
        .expect(200);
        expect(res.body.message).toEqual("Utente registrato con successo");
    })
    test('Inserimento di un utente già registrato', async () => {
        var payload={
            "username": "Beenca14",
            "email": "franceslini@gmail.com",
            "password": "verde32",
            "contatto": "telegram.com"    
        }
        const res=await request(url2).post('/user')
        .set('Content-type', 'application/json')
        .send( payload )
        .expect(200);
        expect(res.body.message).toEqual("User already exists");
    })
    test('Inserimento di un utente senza specifico username', async () => {
        var payload={
            "email": "franceslini@gmail.com",
            "password": "verde32",
            "contatto": "telegram.com"    
        }
        const res=await request(url2).post('/user')
        .set('Content-type', 'application/json')
        .send( payload )
        .expect(200);
        expect(res.body.Error.errors.username.name).toEqual("ValidatorError");
    })
    test('Get di uno user specifico', async () => {
        
        let res=await request(url2).post("/user/auth?username=Francesco1&password=verde32").expect(200); 
        let token=res.body.token
        res=await request(url2).get('/user/search?username=Francesco1&token='+token).expect(200);
        expect(res.body).toEqual({
            _id: '63946406673a91aeb485e1dd',
            email: 'francescoVerdolini@gmail.com',
            password: 'verde32',
            username: 'Francesco1',
            contatto: 'telegram.com',
            status: true,
            __v: 0
          });
            
    })



});