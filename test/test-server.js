/*-----------------------------------------------------------
Module imports*/

const server = require("../server.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("Server GET '/'", () => {
    it("Response 200", () => {
        chai.request(server)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
            });
    });
});

describe("Server POST '/weather'", () => {
    it("Response 200", () => {
        chai.request(server)
            .post("/weather")
            .send("city=Helsinki")
            .end((err, res) => {
                res.should.have.status(200);
            });
    });
});

describe("Server POST '/map'", () => {
    it("Response 200", () => {
        chai.request(server)
            .post("/map")
            .send("city=Helsinki")
            .end((err, res) => {
                res.should.have.status(200);
            });
    });
});

