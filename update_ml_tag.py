#!/usr/bin/env python3
"""
Replace 'ML' tag with 'Machine Learning' in all markdown files.
"""

import re
from pathlib import Path

BLOG_CONTENT_DIR = Path("src/content/blog")


def update_ml_tag(file_path):
    """Replace ML tag with Machine Learning in a markdown file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Replace '- ML' in tags section (must be exact match)
    # Match it within the tags array in YAML frontmatter
    content = re.sub(r'^- ML$', '- Machine Learning', content, flags=re.MULTILINE)

    # Check if anything changed
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False


def main():
    """Main function to update ML tags."""
    print("Updating ML tags to Machine Learning...")
    print(f"Directory: {BLOG_CONTENT_DIR}")
    print("=" * 80)

    md_files = list(BLOG_CONTENT_DIR.glob("*.md"))
    print(f"\nFound {len(md_files)} markdown files")

    updated_count = 0

    for md_file in md_files:
        if update_ml_tag(md_file):
            print(f"  ✓ Updated: {md_file.name}")
            updated_count += 1

    print(f"\n{'=' * 80}")
    print(f"Updated {updated_count} files")
    print(f"No changes needed in {len(md_files) - updated_count} files")


if __name__ == "__main__":
    main()
