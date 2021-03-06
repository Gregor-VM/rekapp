import app from '../app';
import request from 'supertest';
import mongoose from 'mongoose';

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDVmYTFkNzgzNmQyYjRhNjE4MjkzYyIsImlhdCI6MTY0ODc1NDE0OCwiZXhwIjoxNjQ5MTg2MTQ4fQ.KA37Hpqlta9DD55EAcMcg8laT5grlFCN4FHMYlhKMR8";

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



describe("POST login", () => {
    it("should login and return a token if username and password are provided", (done) => {
        
        const userData = {email: "gregorvm@mail.com", password: "1234567"};
        authAgent.post("/login")
        .send(userData).expect(200).end((err, res) => {
            if(err) done(err);
            expect(res.body.token).toBeDefined();
            return done();
        })
    });

});


describe("GET user-info", () => {
    it("should response with status code 200 and an object with the user info", (done) => {
        agent.get("/user-info").set("Authorization", token)
        .set("Accept", "application/json").end((err, res) => {
            if(err) done(err);
            expect(res.body).toBeDefined();
            return done();
        })
    })
});


describe("PUT update-user-info", () => {
    it("should response with status code 200 if a correct username and password are provided", (done) => {

        const userData = {username: "GregorVM", email: "gregorvm@mail.com"};
        agent.put("/update-user-info").set("Authorization", token)
        .set("Accept", "application/json").send(userData)
        .expect(200, done);

    })
});

describe("PUT change-password", () => {
    it("should response with status code 200 if a correct oldPassword and newPassword are provided", (done) => {
        
        const userData = {oldPassword: "1234567", newPassword: "1234567"};
        agent.put("/change-password").set("Authorization", token)
        .set("Accept", "application/json").send(userData)
        .expect(200, done);

    })
})

describe("DELETE delete-account", () => {

    let tokenToDelete : string;

    it("should register a new user to be deleted", (done) => {
        const userData = {username: "Deleted", email: "delete@email.com", password: "shouldbedeleted"};
        authAgent.post("/register")
        .send(userData).expect(200).end((err, res) => {
            if(err) done(err);
            expect(res.body.token).toBeDefined();
            tokenToDelete = "Bearer " + res.body.token;
            return done();
        })
    })

    it("should response with 204", (done) => {
        agent.delete("/delete-account").set("Authorization", tokenToDelete)
        .set("Accept", "application/json").send().expect(204, done);
    })
})



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

    it("should create a card if front and back and img are provided", (done) => {
        const cardData = {front: "Test front", back: "Test back", img: 
        {title: "img-random-title", data: "base64url"}
        };
        agent.post("/card/"+deckId)
        .set("Authorization", token)
        .send(cardData)
        .expect(200)
        .end((err, res) => {
            if(err) done(err);
            expect(res.body._id).toBeDefined();
            return done();
        });
    });

    //TODO

    /*

    it("should create a card if front and back and audioId are provided", (done) => {
        const cardData = {front: "Test front", back: "Test back", audioId: "someID"};
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
    });*/



});

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
            expect(typeof res.body).not.toBe("string");
            expect(res.body.length).toBeGreaterThanOrEqual(0);
            return done();
        });
    });

});

describe("GET cards", () => {

    it("should get a valid card list", (done) => {

        agent.get(`/cards/${deckId}`).set("Accept", "application/json")
        .set("Authorization", token)
        .send()
        .expect(200).end((err, res) => {
            if(err) return done(err);

            expect(typeof res.body).not.toBe("string");
            expect(res.body.length).toBeGreaterThanOrEqual(0);

            return done();
        })
    });
});


describe("PUT deck", () => {
    it("should response with status 200", (done) => {
        const deckData = {name: "Test changed", backgroundColor: "#ffffff", 
        backgroundImage: "null"}
        agent.put("/deck/"+deckId).set("Authorization", token).send(deckData).expect(200, done);
    });
});

describe("PUT card", () => {
    it("should response with status 200", (done) => {
        const cardData = {front: "Test front changed", back: "Test back changed"};
        agent.put(`/card/${deckId}/${cardId}`)
        .set("Authorization", token).send().expect(200, done);
    })
})


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

describe("Share deck", () => {
    it("should response with code 406", (done) => {
        agent.post("/deck/share/gregorvm@mail.com/" + deckId)
        .set("Authorization", token).send().expect(406, done);
    })
})

/**
 * GET CARD
 * DELETE ALL DECKS
 * REGISTER
 * 
 */

