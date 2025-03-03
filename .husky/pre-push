#!/usr/bin/env sh

# Get the current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Get the remote tracking branch i.e origin/main, <custom>/develop etc.
# But the branch should be set as upstream, otherwise this will fail 
# TODO: looking for alternatives
REMOTE_BRANCH=$(git rev-parse --abbrev-ref --symbolic-full-name "@{u}" 2>/dev/null)

# If there's no remote tracking branch, exit
if [ -z "$REMOTE_BRANCH" ]; then
  echo "No remote tracking branch found for $CURRENT_BRANCH, skipping tests."
  exit 0
fi

# Get the list of changed files compared to the remote branch
CHANGED_FILES=$(git diff --name-only "$REMOTE_BRANCH")

# Run Jest only on changed files if there are any
if [ -n "$CHANGED_FILES" ]; then
  echo "Running Jest on changed files..."
  npx jest \
    --findRelatedTests $CHANGED_FILES \
    --passWithNoTests # This is to ensure that the script doesn't fail if there are no tests
else
  echo "No changes detected, skipping tests."
fi
