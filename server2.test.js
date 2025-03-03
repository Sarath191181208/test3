const request = require("supertest");
const { app, server } = require("./server");
const generateSingleTestCase = require("./generateCombination");

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
  //   {
  //     param_name: "phone",
  //     valid_values: ["+1234567890", "9876543210"],
  //     invalid_values: [undefined, null, "", "12345", "abcd12345"],
  //   },
  //   {
  //     param_name: "password",
  //     valid_values: ["StrongPass123!", "Pass@word99"],
  //     invalid_values: [undefined, null, "", "short", "1234567"],
  //   },
  //   {
  //     param_name: "confirm_password",
  //     valid_values: ["StrongPass123!", "Pass@word99"],
  //     invalid_values: [undefined, null, "", "notmatching", "wrongpass"],
  //   },
  //   {
  //     param_name: "gender",
  //     valid_values: ["male", "female", "other"],
  //     invalid_values: [undefined, null, "", "unknown", "m"],
  //   },
  //   {
  //     param_name: "dob",
  //     valid_values: ["1995-06-15", "2000-01-01"],
  //     invalid_values: [undefined, null, "", "invalid-date", "32/13/2000"],
  //   },
  //   {
  //     param_name: "address",
  //     valid_values: [
  //       { street: "123 Main St", city: "New York", zip: "10001" },
  //       { street: "456 Elm St", city: "San Francisco", zip: "94105" },
  //     ],
  //     invalid_values: [
  //       undefined,
  //       null,
  //       "",
  //       { street: "", city: "NY", zip: "10001" },
  //       { street: "Main", city: "", zip: "123" },
  //     ],
  //   },
  //   {
  //     param_name: "preferences",
  //     valid_values: [["sports", "music"], ["reading"]],
  //     invalid_values: [undefined, null, "", "not-an-array", {}],
  //   },
  //   {
  //     param_name: "isAdmin",
  //     valid_values: [true, false],
  //     invalid_values: [undefined, null, "", "yes", 1, "true"],
  //   },
];

const totalCombinations = requestBodyParams.reduce(
  (acc, param) =>
    acc * (param.valid_values.length + param.invalid_values.length),
  1
);

describe("[POST:2] /submit-v2 - Dynamic Permutation Tests", () => {
  afterAll(() => {
    server.close();
  });
    test("Total Combinations", () => { });
  for (let i = 0; i < 1; i++) {
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

          // Check that the expected fields match the actual failing fields
          expect(actualInvalidFields).toEqual(
            expect.arrayContaining(invalidFields)
          );
      }
    });
  }
});
