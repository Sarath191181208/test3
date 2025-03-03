/**
 * @param {Object[]} params
 * @param {string} params[].param_name
 * @param {any[]} params[].valid_values
 * @param {any[]} params[].invalid_values
 */
function generateBodyPermutations(params) {
  // go through all the params and check if they have null, undefined in invalid_values , or valid_values
  // add them if they aren't present
  //   params.forEach((param) => {
  //     const isNullPresent =
  //       param.invalid_values.includes(null) || param.valid_values.includes(null);
  //     const isUndefinedPresent =
  //       param.invalid_values.includes(undefined) ||
  //       param.valid_values.includes(undefined);
  //     if (!isNullPresent) {
  //       param.invalid_values.push(null);
  //       console.warn(
  //         "`null` is not present in the valid or invalid values of " +
  //           param.param_name +
  //           ". Adding `null` to invalid values."
  //       );
  //     }
  //     if (!isUndefinedPresent) {
  //       param.invalid_values.push(undefined);
  //       console.warn(
  //         "`undefined` is not present in the valid or invalid values of " +
  //           param.param_name +
  //           ". Adding `undefined` to invalid values."
  //       );
  //     }
  //   });

  const allPermutations = (params, index = 0, currentBody = {}) => {
    if (index === params.length) return [currentBody];

    const { param_name, valid_values, invalid_values } = params[index];
    const values = [...valid_values, ...invalid_values];

    let permutations = [];
    values.forEach((value) => {
      permutations = permutations.concat(
        allPermutations(params, index + 1, {
          ...currentBody,
          [param_name]: value,
        })
      );
    });

    return permutations;
  };

  const bodies = allPermutations(params);
  const expectations = bodies.map((body) => {
    const invalidFields = Object.entries(body)
      .filter(([key, value]) =>
        params.find((p) => p.param_name === key)?.invalid_values.includes(value)
      )
      .map(([key]) => key);

    return {
      body,
      shouldPass: invalidFields.length === 0,
      invalidFields,
    };
  });

  return { bodies, expectations };
}

module.exports = generateBodyPermutations;
