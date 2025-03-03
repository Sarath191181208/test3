from typing import List, Tuple

def pick_items_with_mask(groups: List[List[str]], iteration: int) -> Tuple[List[str], int]:
    """
    Selects a unique combination of items from a list of lists based on an iteration index.

    - Each sublist contributes one item, determined by a binary mask.
    - Supports groups with varying numbers of values.

    Args:
        groups (List[List[str]]): A list of lists containing items.
        iteration (int): The current iteration index (0 to total unique combinations - 1).

    Returns:
        Tuple[List[str], int]: The selected combination and the binmask used.
    """
    selected_items = []
    binmask = iteration  # The binary mask will be used to determine selections

    for group in groups:
        num_options = len(group)
        selected_index = binmask % num_options  # Pick an index based on mask
        selected_items.append(group[selected_index])
        binmask //= num_options  # Shift mask to next group

    return selected_items, iteration  # The mask remains the same

# Example usage:
groups = [
    ["apple", "banana"],                     # Group 0 (2 items)
    ["cherry", "date"],                      # Group 1 (2 items)
    ["elderberry", "fig", "other", "something"],  # Group 2 (4 items)
    ["grape", "honeydew"]                    # Group 3 (2 items)
]

# Calculate total unique combinations (cartesian product)
from math import prod
num_combinations = prod(len(group) for group in groups)

# Running in a loop to get unique combinations
for i in range(num_combinations):
    selected_items, binmask = pick_items_with_mask(groups, i)
    print(f"Iteration {i}: Selected Items: {selected_items}, Binmask: {bin(binmask)}")
