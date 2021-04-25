const supertest = require("supertest")
const { app } = require("../server/index")
const request = supertest(app)
import { randomInt, heightGreater } from '../server/index'

describe("Testing Express server", () => {
    test("It should return 200 Ok to the GET method", () => {
            return request
                .get("/")
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
        test.concurrent.only.each([
            [628, 220, true],
            [1262, 635, true],
            [1200, 2100, false],
        ])('Return true if Height(%i) greater than Width(%i) and false otherwise',
            async(a, b, expected) => {
                expect(heightGreater(a, b)).toBe(expected)
            })
})