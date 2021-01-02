/*-----------------------------------------------------------
Module imports*/

const server = require("../server.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const nock = require("nock");
const should = chai.should();
require("dotenv").config();

chai.use(chaiHttp);

/*-----------------------------------------------------------
Test cases*/

describe("Server GET '/'", () => {
    it("Response 200", (done) => {
        chai.request(server)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("Server POST '/weather'", () => {
    beforeEach(() => {
        const city = "Helsinki";
        const apiKey = process.env.openweathermap;
        nock("http://api.openweathermap.org")
            .get(`/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .reply(200, "response");
    });
    it("Response 200 OK", (done) => {
        chai.request(server)
            .post("/weather")
            .send("city=Helsinki")
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal("response");
                done();
            });
    });
});

describe("Server POST '/map'", () => {
    beforeEach(() => {
        const city = "Helsinki";
        const apiKey = process.env.mapbox;
        nock("https://api.mapbox.com")
            .get(`/styles/v1/mapbox/streets-v11/static/24.9342,60.1756,10,0,0/434x250?access_token=${apiKey}`)
            .reply(200, "response");
    });
    it("Response 200 OK", (done) => {
        chai.request(server)
            .post("/map")
            .send("city=Helsinki")
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal("response");
                done();
            });
    });
});

