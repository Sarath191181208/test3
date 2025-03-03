/**
 * Generates a single request body permutation using a binary mask.
 * @param {Object[]} params - Array of request body parameters.
 * @param {string} params[].param_name
 * @param {any[]} params[].valid_values
 * @param {any[]} params[].invalid_values
 * @param {number} mask - Binary mask to decide valid/invalid values.
 * @returns {{ body: Object, shouldPass: boolean, invalidFields: string[] }}
 */
function generateSingleTestCase(params, mask) {
  const paramValues = params.map((param) => [
    ...param.valid_values,
    ...param.invalid_values,
  ]);

  const [selectedValues] = pickItemsWithMask(paramValues, mask);

  const invalidFields = selectedValues.reduce((acc, value, index) => {
    const param = params[index];
    const isValid = param.valid_values.includes(value);
    if (!isValid) acc.push(param.param_name);
    return acc;
  }, []);

  const body = params.reduce((acc, param, index) => {
    acc[param.param_name] = selectedValues[index];
    return acc;
  }, {});

  return {
    body,
    shouldPass: invalidFields.length === 0,
    invalidFields,
  };
}

/**
 * Selects a unique combination of items from a list of lists based on an iteration index.
 *
 * - Each sublist contributes one item, determined by a numerical mask.
 * - Supports groups with varying numbers of values.
 * @template T
 * @param {T[][]} groups - List of groups, each containing multiple values.
 * @param {number} iteration - The iteration index (0 to total unique combinations - 1).
 * @returns {[T[], number]} - The selected combination and the binmask used.
 */
function pickItemsWithMask(groups, iteration) {
  let selectedItems = [];
  let binmask = iteration; // The mask will be used to determine selections

  for (const group of groups) {
    const numOptions = group.length;
    const selectedIndex = binmask % numOptions; // Pick an index based on mask
    selectedItems.push(group[selectedIndex]);
    binmask = Math.floor(binmask / numOptions); // Shift mask to next group
  }

  return [selectedItems, iteration]; // The mask remains unchanged
}

module.exports = generateSingleTestCase;