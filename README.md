# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b4ae33a1-2b62-4f51-a31b-02048bfe11c1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b4ae33a1-2b62-4f51-a31b-02048bfe11c1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Legal (BEE Legislation & Affidavits)

This page is manifest-driven to make adding/removing documents easy and safe.

### Folder layout under `public/legal`

```
public/legal/
  Legislation/
    <Sector Name>/
      <Document>.pdf
  Affidavits/
    EME Affidavits/
      <Document>.pdf
    QSE Affidavits/
      <Document>.pdf
    Specific Affidavits/
      <Document>.(pdf|doc|docx|xls|xlsx)
```

### Generate manifest

Run this whenever files change in `public/legal`:

```bash
npm run build:legal
```

This creates/updates `src/content/legal.json` consumed by `src/pages/BEELegislation.tsx`.

### File types

- PDFs open/download directly.
- Word/Excel (`.doc/.docx/.xls/.xlsx`) include an “Open in Office Online” option via Microsoft Office viewer.

### Add/remove documents

- Drop files into the correct folder above.
- Run `npm run build:legal`.
- Commit both file changes and `src/content/legal.json`.

Notes:
- Keep folder names exactly as shown for affidavits: `EME Affidavits`, `QSE Affidavits`, `Specific Affidavits`.
- Sector names under `Legislation/` become category headings.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b4ae33a1-2b62-4f51-a31b-02048bfe11c1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
