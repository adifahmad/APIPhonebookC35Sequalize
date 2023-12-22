const chai = require('chai')
const chaiHTTP = require('chai-http')

const app = require('../app')
const User = require('../models') 


chai.should()
chai.use(chaiHTTP)

describe('phonebook', function(){

    it('Should be successful get data to api/phonebook with Get method',function(done){
        chai.request(app)
        .get('/api/phonebook')
        .query({ keyword : 'Adif98'})
        .end( function (err, res){
            res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property("phonebook")
                res.body.phonebook[0].should.a("object")
                res.body.phonebook[0].should.have.property("id")
                res.body.phonebook[0].id.should.equal(155)
                res.body.phonebook[0].should.have.property("name")
                res.body.phonebook[0].name.should.equal("Adif98")
                res.body.phonebook[0].should.have.property('phone')
                res.body.phonebook[0].phone.should.equal('0821213431411234')
                res.body.phonebook[0].should.have.property('avatar')
                res.body.phonebook[0].should.have.property('createdAt')
                res.body.phonebook[0].createdAt.should.equal('2023-12-22T04:07:48.588Z')
                res.body.phonebook[0].should.have.property('updatedAt')
                res.body.phonebook[0].updatedAt.should.equal('2023-12-22T04:07:48.588Z')
                res.body.should.have.property('page')
                res.body.page.should.be.a('number')
                res.body.page.should.equal(1)
                res.body.should.have.property('limit')
                res.body.limit.should.be.a('number')
                res.body.limit.should.equal(30)
                res.body.should.have.property('pages')
                res.body.pages.should.be.a('number')
                res.body.pages.should.equal(1)
                res.body.should.have.property('total')
                res.body.total.should.be.a('number')
                res.body.total.should.equal(2)
                done()
        })
    })

    it('Should be successful add to api/phonebook with Post method',function(done){
        chai.request(app)
        .post('/api/phonebook')
        .send({ name : 'Adif98', phone : '0821213431411234'})
        .end( function (err, res){
            res.should.have.status(201);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property("id")
                res.body.should.have.property("name")
                res.body.name.should.equal("Adif98")
                res.body.should.have.property("phone")
                res.body.phone.should.equal("0821213431411234")
                res.body.should.have.property("avatar")
                res.body.should.have.property("createdAt")
                res.body.should.have.property("updatedAt")
                done()
        })
    })

    it('Should be successful delete data to api/phonebook with Delete method',function(done){
        chai.request(app)
        .delete('/api/phonebook/146')
        .end( function (err, res){
            res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property("id")
                console.log(res.body)
                res.body.id.should.equal(146)
                res.body.should.have.property("name")
                res.body.name.should.equal("Piso")
                res.body.should.have.property("phone")
                res.body.phone.should.equal("08132433434")
                res.body.should.have.property("avatar")
                res.body.should.have.property("createdAt")
                res.body.should.have.property("updatedAt")
                done()
        })
    })

    it('Should be successful edit data to api/phonebook with Put method',function(done){
        chai.request(app)
        .put('/api/phonebook/152')
        .send({ name : 'Adif97', phone : '0821213431411235'})
        .end( function (err, res){
            res.should.have.status(201);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property("id")
                res.body.id.should.equal(152)
                res.body.should.have.property("name")
                res.body.name.should.equal("Adif97")
                res.body.should.have.property("phone")
                res.body.phone.should.equal("0821213431411235")
                res.body.should.have.property("avatar")
                res.body.should.have.property("createdAt")
                res.body.should.have.property("updatedAt")
                done()
        })
    })



})