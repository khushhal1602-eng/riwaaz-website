#!/bin/bash
cd "$(dirname "$0")"
echo "✦ Starting RIWAAZ by Jiya Local Server..."
sleep 1
open "http://localhost:3001" 2>/dev/null || open "http://localhost:3000" 2>/dev/null
npm run dev
