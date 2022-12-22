const fetch = require("node-fetch");
const app = require('../app');
const request = require('supertest');

let url = "http://localhost:8080"

describe('test-coverage degli user', () => {
    test('Funziona la get di tutti gli users', async () => {
        await request(url).get("/user").expect(200)
    })
    test('Registrazione di un nuovo utente correttamente', async () => {
        var payload={
            "username": "Alessandro22",
            "email": "franceslini@gmail.com",
            "password": "verde32",
            "contatto": "telegram.com"    
        }
        const res=await request(url).post('/user')
        .set('Content-type', 'application/json')
        .send( payload )
        .expect(201);
        expect(res.body.message).toEqual("Utente registrato con successo");
    })
    test('Errore nel caso in cui avvenga la registrazione di un utente già registrato', async () => {
        var payload={
            "username": "Beenca14",
            "email": "franceslini@gmail.com",
            "password": "verde32",
            "contatto": "telegram.com"    
        }
        const res=await request(url).post('/user')
        .set('Content-type', 'application/json')
        .send( payload )
        .expect(400);
        expect(res.body.message).toEqual("User already exists");
    })
    test('Errore nel caso di inserimento di un utente senza specifico username', async () => {
        var payload={
            "email": "franceslini@gmail.com",
            "password": "verde32",
            "contatto": "telegram.com"    
        }
        const res=await request(url).post('/user')
        .set('Content-type', 'application/json')
        .send( payload )
        .expect(200);
        expect(res.body.Error.errors.username.name).toEqual("ValidatorError");
    })
    test('Get di uno user specifico', async () => {
        var payload={
            "username" : "Francesco1",
            "password" : "verde32"
        }
        let res= (await request(url)).post("/user/auth?username=Francesco1&password=verde32").send(payload).expect(200); 
        let token=(await res).body.token
        res=await request(url).get('/user/search?username=Francesco1&token='+token).expect(200);
        expect(res.body).toEqual({
            _id: '63946406673a91aeb485e1dd',
            email: 'francescoVerdolini@gmail.com',
            password: 'verde32',
            username: 'Francesco1',
            contatto: 'telegram.com',
            status: false,
            __v: 0
          }); 
            
    })
    test('Aggiunta di un amico', async () => {
        
        let payload={
            "friend_username" : "Beenca14"
        }
        let res= await request(url).post("/friend/Francesco1").send(payload).expect(201);
       
        expect(res.body.username).toEqual("Francesco1");
        expect(res.body.friend_username).toEqual("Beenca14");
            
    })

    test('Errore se viene aggiunto un amico nonostante ci sia gia una relazione di amicizia tra i due utenti', async () => {
        let payload={
            "friend_username" : "Beenca14"
        }
        let res= await request(url).post("/friend/Francesco1").send(payload).expect(400);
        expect(res.body.res).toEqual("Friend already added");
    })

    test('Rimozione di un amico', async () => {
        let payload={
            "friend_username" : "Beenca14"
        }
        await request(url).delete("/friend/Francesco1").send(payload).expect(204);
    })
    test('Get di tutti gli amici di un utente', async () => {
       
        await request(url).get("/friend/Francesco1").expect(200)
    })

});

