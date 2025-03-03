const request = require("supertest");
const { app, server } = require("../src/server");
const generateSingleTestCase = require("../utils/generateCombination");

const requestBodyParams = [
  {
    param_name: "name",
    valid_values: ["John", "jonh", "jam"],
    invalid_values: [undefined, null, "", " ", "\t"],
  },
  {
    param_name: "email",
    valid_values: ["valid@google.com", "test@example.com"],
    invalid_values: [undefined, null, "", "invalid-email", "foo@"],
  },
  {
    param_name: "age",
    valid_values: [18, 25, 40, 65],
    invalid_values: [undefined, null, "", -1, 17, 100, "twenty"],
  },
];

describe("POST /submit - Dynamic Permutation Tests", () => {
  afterAll(() => {
    server.close();
  });
    test("Total Combinations", () => { });
  for (let i = 0; i < 2; i++) {
    test.concurrent(`Case ${i + 1}`, async () => {
      const { body, shouldPass, invalidFields } = generateSingleTestCase(
        requestBodyParams,
        i
      );
      const response = await request(app).post("/submit").send(body);

      if (shouldPass) {
        expect(response.status).toBe(200);
      } else {
        expect(response.status).toBeGreaterThanOrEqual(400);
          expect(response.status).toBe(400);

          const actualInvalidFields = response.body.errors.map((err) => err.path);

          expect(actualInvalidFields).toEqual(
            expect.arrayContaining(invalidFields)
          );
      }
    });
  }
});
