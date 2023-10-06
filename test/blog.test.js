const request = require('supertest');
const app = require('../app'); // Assuming your main app file is named app.js
const chai = require('chai');
chai.should();

describe('POST /posts/create', () => {
    it('should create a new blog post', (done) => {
        request(app)
            .post('/posts/create')
            .send({ title: 'Sample Title', content: 'Sample Content' })
            .expect(201)
            .expect((res) => {
                res.body.should.have.property('id');
            })
            .end(done);
    });
});

describe('GET /posts/:id', () => {
    it('should retrieve a blog post by ID', (done) => {
        // First, create a post
        const post = { title: 'Test Title', content: 'Test Content' };
        request(app)
            .post('/posts/create')
            .send(post)
            .end((err, response) => {
                const createdPostId = response.body.id;

                request(app)
                    .get(`/posts/${createdPostId}`)
                    .expect(200)
                    .expect((res) => {
                        res.body.title.should.equal('Test Title');
                        res.body.content.should.equal('Test Content');
                    })
                    .end(done);
            });
    });

    it('should return 404 for non-existent post ID', (done) => {
        request(app)
            .get('/posts/9999')
            .expect(404)
            .end(done);
    });
});
