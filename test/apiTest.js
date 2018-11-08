const request = require('supertest');
const app = require('../app');

const LAT_LNG = 'lat=40.714224&lng=-73.961452';

const RES_EXPECTED = '{"hasError":false,"data":[[{"name":"Bedford Avenue","types":["route"]},{"name":"United States","types":["country","political"]},{"name":"11211","types":["postal_code"]}],[{"name":"11211","types":["postal_code"]},{"name":"United States","types":["country","political"]}],[{"name":"United States","types":["country","political"]}]]}'

describe('GET /api/location', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get(`/api/location?${LAT_LNG}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(JSON.parse(RES_EXPECTED), done);
    });
});