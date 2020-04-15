const request = require('supertest');

const app = require('../index');
var assert = require('assert');


//==================== API test ====================

//TestData Stucture
class TestData{
    constructor(status,number,expect,httpCode,api="")
    {
        this.status = status
        this.number = number
        this.expect = expect
        this.apiKey = (api != "") ? api : undefined 
        this.httpCode = httpCode
    }
}

//Test Data Model
const ValidTestModel =  [];

//Secure Test
var ValidTestModelSecure= []
ValidTestModel.push(new TestData("ok",-0,"zero",200))
ValidTestModel.push(new TestData("ok",0,"zero",200))
ValidTestModel.push(new TestData("ok",1,"one",200))
ValidTestModel.push(new TestData("ok",10,"ten",200))
ValidTestModel.push(new TestData("ok",15,"fifteen",200))
ValidTestModel.push(new TestData("ok",12345678,"twelve million three hundred forty five thousand six hundred seventy eight",200))
ValidTestModel.push(new TestData("fail","",'',422))
ValidTestModel.push(new TestData("ok",-15,"negative fifteen",200))
ValidTestModel.push(new TestData("ok",-29,"negative twenty nine",200))
ValidTestModel.push(new TestData("ok",-1000.41,"negative one thousand point forty one",200))

ValidTestModelSecure.push(new TestData("ok",11,"eleven",200,12345))
ValidTestModelSecure.push(new TestData("ok",21,"twenty one",200,12345))
ValidTestModelSecure.push(new TestData("fail",15,"",422,22122))
ValidTestModelSecure.push(new TestData("ok",12345678,"twelve million three hundred forty five thousand six hundred seventy eight",200,12345))
ValidTestModelSecure.push(new TestData("fail","",'',422))
ValidTestModelSecure.push(new TestData("ok",-11,"negative eleven",200,12345))
ValidTestModelSecure.push(new TestData("ok",-21,"negative twenty one",200,12345))
ValidTestModelSecure.push(new TestData("fail",-222.31,"",422))
ValidTestModelSecure.push(new TestData("ok",-222.31,"negative two hundred twenty two point thirty one",200,12345))


ValidTestModel.forEach(aData =>{
    describe('GET /num_to_english?number='+aData.number, function () {
        it('Non secure test ', function (done) {
            
            request(app)
                .get('/num_to_english?number='+aData.number.toString())
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(aData.httpCode,{
                    status :  aData.status,
                    num_in_english : aData.expect 
                })
                .end(function(err, res) {
                    
                    if (err) return done(err);
                    done();
                  });
                 
                
        });
    });
})


ValidTestModelSecure.forEach(aData =>{
    describe('GET /num_to_english_secure?number='+aData.number.toString(), function () {
        it('Secure test', function (done) {
            request(app)
                .get('/num_to_english_secure?number='+aData.number.toString()+"&apiKey="+aData.apiKey)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(aData.httpCode)
                .expect(aData.httpCode,{
                    status :  aData.status,
                    num_in_english : aData.expect 
                })
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                  });
                 
                
        });
    });
})