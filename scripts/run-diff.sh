#!/usr/bin/env sh

set -e  # Exit on error

# Detect the current branch in GitHub Actions
if [ -n "$GITHUB_HEAD_REF" ]; then
  HEAD_BRANCH="$GITHUB_HEAD_REF"  # For pull requests
else
  HEAD_BRANCH="$GITHUB_REF_NAME"  # For push events
fi

echo "Base branch: origin/main"
echo "Head branch: origin/$HEAD_BRANCH"

# Ensure remote branches are up-to-date
git fetch origin main "$HEAD_BRANCH" --depth=1

# Get the list of changed files
CHANGED_FILES=$(git diff --name-only origin/main "origin/$HEAD_BRANCH")

# Run Jest only on changed files if there are any
if [ -n "$CHANGED_FILES" ]; then
  echo "Running Jest on changed files..."
  npx jest --findRelatedTests $CHANGED_FILES --passWithNoTests
else
  echo "No changes detected, skipping tests."
fi
