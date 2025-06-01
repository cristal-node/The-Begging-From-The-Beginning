#!/usr/bin/env bash
set -euo pipefail

export DOLLAR=$

subs(){
  envsubst <"${1}" >"${1%.fm}"
  rm "${1}"
}

subs wrangler.jsonc.fm
