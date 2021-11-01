import app from '../app';
import request from 'supertest';
import mongoose from 'mongoose';

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzg5NDQ2NjZjYjMzNjdhOTJiZWZiZSIsImlhdCI6MTYzNTMwMjE1NSwiZXhwIjoxNjM1NzM0MTU1fQ.xTPlJmR0tDimWfwvv4apFaWK-9dh_MkPDlXAtpn-7mE";

//const agent = request(app);

class Agent {

    home: string

    constructor(home : string){
        this.home = home;
    }

    get(path : string){
        return request(app).get(this.home + path);
    }

    post(path : string){
        return request(app).post(this.home + path);
    }

    put(path : string){
        return request(app).put(this.home + path);
    }

    delete(path : string){
        return request(app).delete(this.home + path);
    }

}

const agent = new Agent("/api");
const authAgent = new Agent("/auth");

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/rekapp");
})

afterAll(async () => {
    await mongoose.disconnect();
});

describe("GET protected", () => {

    test("should response with 401 is a token isn't provided", (done) => {
        agent.get("/protected").set("Accept", "application/json").send()
        .expect(401, done);
    });

    test("should response with 200 status if the token is provided", (done) => {
        agent.get("/protected").set("Accept", "application/json")
        .set("Authorization", token)
        .send()
        .expect(200, done);
    });

})

describe("GET decks", () => {

    test("should respond with a 200 status code", (done) => {
        agent.get("/decks").set("Authorization", token)
        .expect("Content-Type", "application/json; charset=utf-8").send()
        .expect(200, done);
    });

    test("should response with an array", (done) => {

        agent.get("/decks")
        .set("Authorization", token)
        .set("Accept", "application/json")
        .send().expect(200).end((err, res) => {
            if(err) done(err);
            expect(res.body.length).toBeGreaterThanOrEqual(0)
            return done();
        });
    });

});

describe("POST login", () => {
    it("should login and return a token if username and password are provided", (done) => {
        
        const userData = {email: "john@email.com", password: "123456"};
        authAgent.post("/login")
        .send(userData).expect(200).end((err, res) => {
            if(err) done(err);
            expect(res.body.token).toBeDefined();
            return done();
        })
    });

});

/*
describe("POST & DELETE deck", () => {

    //617db4c692dcdb7e7d49c709

    let id : string;

    it("should create the post if data is provided", (done) => {
        const deckData = {name: "Test", backgroundColor: "#ffffff", 
        backgroundImage: "null"}
        agent.post("/deck")
        .set("Authorization", token)
        .send(deckData)
        .expect(200)
        .end((err, res) => {
            if(err) done(err);
            expect(res.body._id).toBeDefined();
            id=res.body._id;
            return done();
        });
    });

    it("should delete the post if the id is provided", (done) => {

        agent.delete("/deck/"+id)
        .set("Authorization", token)
        .send()
        .expect(204, done);

    })

    it("should response with 404 to an unexistant deckId", (done) => {
        const deckId = "ThisIdDoens'tExists";

        agent.delete("/deck/"+deckId)
        .set("Authorization", token)
        .send()
        .expect(404, done);

    })



});

describe("POST & DELETE card", () => {

    let cardId : string;

    it("should create a card if front and back are provided", (done) => {
        const cardData = {front: "Test front", back: "Test back"};
        agent.post("/card/:deckId")
        .set("Authorization", token)
        .send(cardData)
        .expect(200)
        .end((err, res) => {
            if(err) done(err);
            expect(res.body._id).toBeDefined();
            cardId=res.body._id;
            return done();
        });
    });

    it("should delete the post if the id is provided", (done) => {

        agent.delete("/card/:deckId/"+cardId)
        .set("Authorization", token)
        .send()
        .expect(204, done);

    })


});*/

let deckId : string;
let cardId : string;

describe("POST deck", () => {

    it("should create the post if data is provided", (done) => {
        const deckData = {name: "Test", backgroundColor: "#ffffff", 
        backgroundImage: "null"}
        agent.post("/deck")
        .set("Authorization", token)
        .send(deckData)
        .expect(200)
        .end((err, res) => {
            if(err) done(err);
            expect(res.body._id).toBeDefined();
            deckId=res.body._id;
            return done();
        });
    });

});

describe("POST card", () => {

    it("should create a card if front and back are provided", (done) => {
        const cardData = {front: "Test front", back: "Test back"};
        agent.post("/card/"+deckId)
        .set("Authorization", token)
        .send(cardData)
        .expect(200)
        .end((err, res) => {
            if(err) done(err);
            expect(res.body._id).toBeDefined();
            cardId=res.body._id;
            return done();
        });
    });

});

describe("DELETE card", () => {

    it("should delete the post if the id is provided", (done) => {

        agent.delete(`/card/${deckId}/${cardId}`)
        .set("Authorization", token)
        .send()
        .expect(204, done);

    });

    it("should response with 404 to an unexistant cardId", (done) => {
        const fakeCardId = "ThisIdDoens'tExists";

        agent.delete("/deck/"+fakeCardId)
        .set("Authorization", token)
        .send()
        .expect(404, done);

    });
});

describe("DELETE deck", () => {

    it("should delete the post if the id is provided", (done) => {

        agent.delete("/deck/"+deckId)
        .set("Authorization", token)
        .send()
        .expect(204, done);

    });

    it("should response with 404 to an unexistant deckId", (done) => {
        const fakeDeckId = "ThisIdDoens'tExists";

        agent.delete("/deck/"+fakeDeckId)
        .set("Authorization", token)
        .send()
        .expect(404, done);

    })
    
});

/**
 * DELETE ALL DECKS
 * REGISTER
 * 
 */

