# GitHub Setup Guide

## 🚀 Upload to GitHub

### Step 1: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Sol to 1k - Solana Token Tracker"
```

### Step 2: Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it: `sol-to-1k`
4. Description: "Professional Solana token price tracker with glassmorphism design"
5. Make it **Public** (for free hosting)
6. Don't initialize with README (we already have one)

### Step 3: Connect and Push
```bash
git remote add origin https://github.com/YOUR_USERNAME/sol-to-1k.git
git branch -M main
git push -u origin main
```

## 🌐 Deploy to GitHub Pages

### Option 1: Automatic Deployment
1. Go to your repository Settings
2. Scroll to "Pages" section
3. Source: "Deploy from a branch"
4. Branch: `main` / `build` folder
5. Save and wait for deployment

### Option 2: Manual Deployment
```bash
npm run build
git add build/
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix build origin gh-pages
```

## 🔧 GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm install
    - name: Build
      run: npm run build
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

## 📱 Live Demo

Once deployed, your app will be available at:
`https://YOUR_USERNAME.github.io/sol-to-1k`

## 🎯 Repository Structure
```
sol-to-1k/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   ├── services/
│   └── App.js
├── package.json
├── README.md
└── .gitignore
```

## ✅ Ready to Upload!

Your project is now ready for GitHub upload with:
- ✅ Proper `.gitignore` file
- ✅ Updated README with GitHub instructions
- ✅ Clean project structure
- ✅ Production-ready code
