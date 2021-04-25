const supertest = require("supertest")
const { app } = require("../server/index")
const request = supertest(app)
import { randomInt, heightGreater } from '../server/index'

describe("Testing Express server", () => {
    test("It should return 200 Ok to the GET method", () => {
            return request
                .get("/trips")
                .then(res => {
                    expect(res.statusCode).toBe(200)
                })
        }),
        test("It Should Add the trip, It should return 201 CREATED to the POST method", () => {
            return request
                .post("/addtrip")
                .send({
                    start: 'Mon, 26 Apr 2021',
                    end: 'Wed, 28 Apr 2021',
                    daysLeft: 1,
                    duration: 2,
                    location: 'Paris, France'
                })
                .then(res => {
                    expect(res.statusCode).toBe(201)
                })
        })
})

describe("Testing Helper functions", () => {
    test("It should return integer in the interval [0, 10]", () => {
            expect(randomInt(10)).toBeGreaterThanOrEqual(0)
            expect(randomInt(10)).toBeLessThanOrEqual(10)
        }),
        test.each `
        height  | width   | result
        ${628}  | ${220}  | ${true}  
        ${1262} | ${2100} | ${false}    
        ${1200} | ${2100} | ${false}       
        // add new test cases here
    ` ('Return true if $height greater than $width and false otherwise', ({ height, width, result }) => {
            expect(heightGreater(height, width)).toBe(result)
        })
})