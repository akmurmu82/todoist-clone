#!/bin/bash
# setup.sh

echo "🔧 Setting up project..."

if [ -f ".env" ]; then
  echo ".env already exists ✅"
else
  cp .env.example .env
  echo "✅ .env file created from .env.example"
  echo "📝 Remember to fill in your secret keys in .env"
fi

echo "✅ Setup complete"
