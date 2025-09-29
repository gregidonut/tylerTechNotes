#!/usr/bin/zsh

supabase_start=$(cd packages/backend && \
    bun run shell src/sb start --stage dev | tee >(cat >&2)
)
lines=("${(@f)supabase_start}")
public_key_line="${lines[-5]}"

# Split at colon
parts=("${(@s/:/)public_key_line}")
# Trim whitespace from second part
value="${parts[2]##*( )}"   # Remove leading spaces
value="${value%%*( )}"      # Remove trailing spaces

bunx sst secret set SupabaseKey $value --stage dev && \
bunx sst dev --stage dev
