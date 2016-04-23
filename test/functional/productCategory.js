'use strict'
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const expect = require('code').expect;

const describe    = lab.describe;
const it          = lab.it;
const after       = lab.after;
const before      = lab.before;

const models              = require('../../models/index');
const server              = require('../../');

describe('functional tests - product category', () => {
    let id = 0;
    before((done) => {
      models.ProductCategory.destroy({truncate: true}).then((res) => {

        done();
      });
    })

    it('should create product category', (done) => {

        server.inject({
            method: 'POST',
            url: '/product_categories',
            payload: {
              name: 'man'
            }
        }, (response) => {
            var result = JSON.parse(response.payload);
            expect(response.statusCode).to.equal(200);
            expect(result).to.be.a.object();
            expect(result.name).to.equal('man')
            id = result.id;
            done();
        });
    });

    it('should get products category', (done) => {

        server.inject({
            method: 'GET',
            url: '/product_categories'
        }, (response) => {
          var result = JSON.parse(response.payload);
          expect(response.statusCode).to.equal(200);
          expect(result.length).to.be.at.least(1);
          done();
        });
    });

    it('should get single product category', (done) => {

        server.inject({
            method: 'GET',
            url: '/product_categories/' + id
        }, (response) => {
            var result = JSON.parse(response.payload);
            expect(response.statusCode).to.equal(200);
            expect(result).to.be.a.object();
            done();
        });
    });

    it('should update product category', (done) => {

        server.inject({
            method: 'PUT',
            url: '/product_categories/' + id,
            payload: {
              name: 'man1'
            }
        }, (response) => {
            var result = JSON.parse(response.payload);
            expect(response.statusCode).to.equal(200);
            expect(result).to.be.a.object();
            expect(result.name).to.equal('man1')
            done();
        });
    });

    it('should delete product category', (done) => {

        server.inject({
            method: 'DELETE',
            url: '/product_categories/' + id
        }, (response) => {
            var result = JSON.parse(response.payload);
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    after((done) => {
        done();
    });
});
