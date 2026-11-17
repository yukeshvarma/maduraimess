# Madurai Mess website

A responsive static website and printable menu card for Madurai Mess in Madivala, Bengaluru.

## Preview locally

Open index.html in a browser. The menu is available at menu.html; use the Print this menu button to print or save it as a PDF.

## Before publishing

- Confirm the sample menu items, address pin code, opening hours, and current prices with the restaurant.
- The menu is labelled as a draft because availability and prices were not provided.
- The generated food photographs are illustrative. Replace them with actual restaurant photography whenever available.
- The owner portrait was supplied for this website.

## Publish with GitHub Pages

The workflow in .github/workflows/deploy.yml publishes the site when changes are pushed to main.

1. In the repository, open Settings → Pages.
2. Under Build and deployment, choose GitHub Actions as the source.
3. The first workflow run will deploy the site and provide its public Pages URL.

The site includes a client-side menu assistant. It describes dishes and sends price checks, personal questions, and custom requests to WhatsApp without guessing prices.

This project uses plain HTML, CSS and JavaScript; it has no build step.
