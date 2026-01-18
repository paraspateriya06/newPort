# Deploying to Vercel

Follow these steps to deploy your portfolio to Vercel.

## Option 1: Deploy via GitHub (Recommended)

1.  **Initialize Git (if not done):**
    ```bash
    git init
    git add .
    git commit -m "Initial commit of portfolio"
    ```

2.  **Create a Repository on GitHub:**
    *   Go to [GitHub.com](https://github.com) and create a new repository (e.g., `my-portfolio`).
    *   Do not initialize with README/gitignore (you already have them).

3.  **Push your code:**
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
    git branch -M main
    git push -u origin main
    ```

4.  **Connect to Vercel:**
    *   Go to [Vercel.com](https://vercel.com) and sign up/log in.
    *   Click **"Add New..."** -> **"Project"**.
    *   Import your `my-portfolio` repository.
    *   Framework Preset should auto-detect as **Vite**.
    *   Click **Deploy**.

## Option 2: Deploy via Vercel CLI

If you have the Vercel CLI installed (`npm i -g vercel`), you can deploy directly from your terminal:

1.  Run the deploy command:
    ```bash
    vercel
    ```
2.  Follow the prompts:
    *   Set up and deploy? **Y**
    *   Which scope? (Select your account)
    *   Link to existing project? **N**
    *   Project name? (Press Enter or type a name)
    *   In which directory? (Press Enter for `./`)
    *   Want to modify settings? **N** (Vite defaults are good)

3.  Vercel will build and deploy your site. It will give you a Production URL.

## Configuration

We have included a `vercel.json` file to ensure proper routing if you add multiple pages later.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Enjoy your new site!
