#!/usr/bin/env sh

# Get the list of changed files compared to the main branch
CHANGED_FILES=$(git diff --name-only origin/main origin/${GITHUB_HEAD_REF})

# Run Jest only on changed files if there are any
if [ -n "$CHANGED_FILES" ]; then
  echo "Running Jest on changed files..."
  npx jest \
    --findRelatedTests $CHANGED_FILES \
    --passWithNoTests # This is to ensure that the script doesn't fail if there are no tests
else
  echo "No changes detected, skipping tests."
fi
