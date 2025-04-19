#!/usr/bin/env bash
set -euo pipefail

# 1. Make sure we're on main
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [[ "$current_branch" != "main" ]]; then
  echo "Checking out main…"
  git checkout main
fi

# 2. Gather all local branches except main
branches_to_delete=$(git branch --format='%(refname:short)' | grep -v '^main$')

# 3. If there are none, exit
if [[ -z "$branches_to_delete" ]]; then
  echo "No branches to delete."
  exit 0
fi

# 4. Show what will be deleted
echo "Deleting the following branches:"
echo "$branches_to_delete"

# 5. Delete them
echo "$branches_to_delete" | xargs -r git branch -D

echo "Done."
