# Deploying to GitHub Pages

This guide will walk you through the process of deploying your Weather Dashboard application to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your local machine
3. Your Weather Dashboard project ready for deployment

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click on the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "weather-dashboard")
4. Choose whether to make it public or private
5. Click "Create repository"

## Step 2: Initialize Git in Your Project (if not already done)

In your project directory, run:

```bash
git init
git add .
git commit -m "Initial commit"
```

## Step 3: Connect Your Local Repository to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 4: Configure GitHub Pages

The project already includes the necessary configuration:

1. The `vite.config.ts` file is configured with `base: '/weather-dashboard/'`
2. A GitHub Actions workflow is set up in `.github/workflows/deploy.yml`

## Step 5: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Navigate to "Settings" > "Pages"
3. Under "Build and deployment", set the source to "GitHub Actions"

## Step 6: Trigger the Deployment

The deployment will automatically trigger when you push to the main branch. To manually trigger it:

1. Go to the "Actions" tab in your repository
2. Click on the "Deploy to GitHub Pages" workflow
3. Click "Run workflow" and select the branch to deploy from

## Step 7: Access Your Deployed App

After the workflow completes successfully:

1. Go to `https://YOUR_USERNAME.github.io/weather-dashboard/`
2. Your Weather Dashboard should now be live!

## Troubleshooting

- If your deployment fails, check the Actions tab for error logs
- Ensure your API key is properly set in the `weatherService.ts` file
- Make sure the repository visibility settings allow for GitHub Pages (for private repos, you might need GitHub Pro)

## Updating Your Deployment

Any time you push changes to the main branch, the GitHub Actions workflow will automatically redeploy your app. 
