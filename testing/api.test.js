const fetch = require("node-fetch");

let url = "http://localhost:8080"

describe('test-coverage degli user', () => {
    url += "/user"
    test('Funziona la get di tutti gli users', async () => {
        
        expect.assertions(1)
        expect((await fetch(url)).status).toEqual(200)
    })
    test('Inserimento di un utente correttamente', async () => {
        expect.assertions(1)
        var response = await fetch(url,{
                method: 'POST', body: JSON.stringify({
                    "username": "Francesco1",
                    "email": "francescoVerdolini@gmail.com",
                    "password": "verde32",
                    "contatto": "telegram.com"    
                }),
            headers: { 'Content-Type': 'application/json' }
            })
        expect((await response).status).toEqual(200)
    })

});