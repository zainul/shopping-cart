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

describe('functional tests - inventory', () => {
  let id = 0;
  before((done) => {
    models.Inventory.destroy({truncate: true}).then((res) => {

      done();
    });
  })

  it('should create product inventory', (done) => {

      server.inject({
          method: 'POST',
          url: '/inventories',
          payload: {
            name: 'jakarta',
            address: 'Lemon Street No 90 South Jakarta',
            location: 'Jakarta'
          }
      }, (response) => {
          var result = JSON.parse(response.payload);
          expect(response.statusCode).to.equal(200);
          expect(result).to.be.a.object();
          expect(result.name).to.equal('jakarta')
          expect(result.location).to.equal('Jakarta')
          id = result.id;
          done();
      });
  });

  it('should get products inventory', (done) => {

      server.inject({
          method: 'GET',
          url: '/inventories'
      }, (response) => {
        var result = JSON.parse(response.payload);
        expect(response.statusCode).to.equal(200);
        expect(result.length).to.equal(1);
        done();
      });
  });

  it('should get single product inventory', (done) => {

      server.inject({
          method: 'GET',
          url: '/inventories/' + id
      }, (response) => {
          var result = JSON.parse(response.payload);
          expect(response.statusCode).to.equal(200);
          expect(result).to.be.a.object();
          done();
      });
  });

  it('should update product inventory', (done) => {

      server.inject({
          method: 'PUT',
          url: '/inventories/' + id,
          payload: {
            name: 'surabaya',
            address: 'Lemon Street No 90 South Surabaya',
            location: 'Surabaya'
          }
      }, (response) => {
          var result = JSON.parse(response.payload);
          expect(response.statusCode).to.equal(200);
          expect(result).to.be.a.object();
          expect(result.name).to.equal('surabaya')
          expect(result.location).to.equal('Surabaya')
          done();
      });
  });

  it('should delete product category', (done) => {

      server.inject({
          method: 'DELETE',
          url: '/inventories/' + id
      }, (response) => {
          var result = JSON.parse(response.payload);
          expect(response.statusCode).to.equal(200);
          done();
      });
  });

  after((done) => {
      done();
  });
})
