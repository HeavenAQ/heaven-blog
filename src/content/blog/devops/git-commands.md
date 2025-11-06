---
categories:
- CI-CD
- Git
createdAt: '2025-08-22'
description: '**To remove the last N commits:**'
tags:
- Git
- CI-CD
title: Git Commands
---

# Git Commands

## Interactive Rebase to Remove Commits

**To remove the last N commits:**

```bash
git rebase -i HEAD~N
```

For example, to edit the last 3 commits:

```bash
git rebase -i HEAD~3
```

This opens an editor where you can:

- **Delete entire lines** to remove those commits completely
- Change `pick` to `drop` to remove specific commits
- Change `pick` to `edit` to modify commits
- Reorder commits by moving lines around

## Reset to a Previous Commit

If you want to remove commits and keep changes in your working directory:

```bash
git reset --soft HEAD~N
```

If you want to remove commits and discard all changes:

```bash
git reset --hard HEAD~N
```

## Rebase to a Specific Commit

You can also rebase to a specific commit hash:

```bash
git rebase -i <commit-hash>
```

## Example Workflow

Let's say you want to remove the last 2 commits:

1. Run `git rebase -i HEAD~2`
2. Your editor opens showing something like:
 ```
 pick abc1234 Second to last commit
 pick def5678 Last commit
 ```
3. Delete the lines for commits you want to remove, or change `pick` to `drop`
4. Save and close the editor

**Important Notes:**

- Only do this on commits that haven't been pushed to a shared repository
- If you've already pushed, you'll need to force push: `git push --force-with-lease`
- Force pushing can cause issues for collaborators, so coordinate with your team

Would you like me to explain any of these approaches in more detail, or do you have a specific scenario in mind?

## Tilde

In Git, the `~` (tilde) is a **commit reference modifier** that means "go back N commits from this reference."

## Basic Syntax

```bash
<ref>~<number>
```

## Examples

**HEAD~1** (or just **HEAD~**)

- The commit that's 1 commit before HEAD (the parent of HEAD)
- This is the previous commit

**HEAD~2**

- 2 commits back from HEAD
- The grandparent of HEAD

**HEAD~3**

- 3 commits back from HEAD

## Visual Example

```
A -- B -- C -- D -- E (HEAD)
 ^ ^ ^ ^
 | | | HEAD~1
 | | HEAD~2
 | HEAD~3
 HEAD~4
```

## Common Usage

- `git reset HEAD~1` - Reset to the previous commit
- `git rebase -i HEAD~3` - Interactive rebase for the last 3 commits
- `git show HEAD~2` - Show the commit from 2 commits ago
- `git diff HEAD~1` - Compare current state with previous commit

## Tilde vs Caret

There's also `^` (caret) which works differently:

- `HEAD~2` = 2 commits back in history (following first parent)
- `HEAD^2` = the second parent of a merge commit

For linear history (most cases), `~` is what you want. The `^` is mainly useful when dealing with merge commits that have multiple parents.
