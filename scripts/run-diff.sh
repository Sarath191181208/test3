#!/usr/bin/env sh

set -e  # Exit on error

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Emojis
CHECK="✅"
INFO="ℹ️"
WARN="⚠️"
ERROR="❌"

# Detect the current branch in GitHub Actions
echo "${INFO} Detecting current branch..."
if [ -n "$GITHUB_HEAD_REF" ]; then
  HEAD_BRANCH="$GITHUB_HEAD_REF"  # For pull requests
else
  HEAD_BRANCH="$GITHUB_REF_NAME"  # For push events
fi

echo "${INFO} Base branch: ${BLUE}origin/main${NC}"
echo "${INFO} Head branch: ${BLUE}origin/$HEAD_BRANCH${NC}"

# Ensure remote branches are up-to-date
echo "${INFO} Fetching latest branch data..."
git fetch origin main "$HEAD_BRANCH" --depth=1

echo "${INFO} Checking for changed files..."
CHANGED_FILES=$(git diff --name-only origin/main "origin/$HEAD_BRANCH")

if [ -n "$CHANGED_FILES" ]; then
  echo "${CHECK} ${GREEN}Changed files in the diff:${NC}"
  echo "$CHANGED_FILES" | sed 's/^/- /'  # Add bullet points for clarity
  echo "\n${INFO} Running Jest on changed files..."
  npx jest --findRelatedTests $CHANGED_FILES --passWithNoTests
else
  echo "${WARN} ${YELLOW}No changes detected, skipping tests.${NC}"
fi
