const chai = require("chai");
const chaiHttp = require("chai-http");
const getPort = require("get-port");
let server = null;
const should = chai.should();

chai.use(chaiHttp);

describe("Server", () => {
  before(async function () {
    process.env.SERVER_PORT = await getPort();
    server = require("../src/server");
  });
  describe("/GET not found", () => {
    it("it should GET a 404 on not defined addresses", (done) => {
      chai
        .request(server)
        .get("/notfound")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it("it should GET a 400 on a missing query parameter", (done) => {
      chai
        .request(server)
        .get("/romannumeral")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("it should GET a 400 on an invalid query parameter", (done) => {
      chai
        .request(server)
        .get("/romannumeral?query=anumber")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("it should GET a 200 response if given a valid parameter", (done) => {
      chai
        .request(server)
        .get("/romannumeral?query=1234")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
