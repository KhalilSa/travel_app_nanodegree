import { handleSubmit } from "../client/js/formHandler"
import { daysBetween } from "../client/js/utils"

describe("Testing Client functions", () => {
    test.each `
        startDate                 |   endDate                 | expectedResult
        ${new Date("04 25 2021")} | ${new Date("04 29 2021")} | ${4}  
        ${new Date("04 25 2021")} | ${new Date("05 20 2021")} | ${25}    
        ${new Date("02 25 2020")} | ${new Date("06 02 2021")} | ${463}       
        // add new test cases here
    ` ('calculate the days between $startDate and $endDate', ({ startDate, endDate, expectedResult }) => {
            expect(daysBetween(startDate, endDate)).toBe(expectedResult)
        }),
        test("Testing the handleSubmit() function", () => {
            expect(handleSubmit).toBeDefined();
        })
});