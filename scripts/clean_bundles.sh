#!/bin/bash
# Bersihkan bundle lama di root yang sudah tidak dirujuk index.html
set -e
cd /home/sya/ReynaldaSyalwa.github.io
for f in assets/*; do
  b=$(basename "$f")
  if ! grep -q "$b" index.html; then
    rm -f "$f"
    echo "removed $b"
  fi
done
echo "--- sisa assets ---"
ls assets/
