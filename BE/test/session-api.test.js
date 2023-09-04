const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Import your Express.js app instance
const { describe, it } = require('mocha'); // For Mocha

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /api/sessions/create-session', () => {
  it('should create a new session', (done) => {
    chai
      .request(app)
      .post('/api/sessions/create-session')
      .send({
        name: 'Test Session',
        videoLink: 'https://www.youtube.com/watch?v=your-video-id',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name', 'Test Session');
        expect(res.body).to.have.property(
          'videoLink',
          'https://www.youtube.com/watch?v=your-video-id'
        );
        // Add more assertions as needed

        done();
      });
  });
});
