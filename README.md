# Madurai Mess website

A responsive static website and printable menu card for Madurai Mess in Madivala, Bengaluru.

## Preview locally

Open index.html in a browser. The menu is available at menu.html; use the Print this menu button to print or save it as a PDF.

## Site notes

- Menu items and prices are the values supplied by Madurai Mess; prices are shown in Indian rupees.
- Food photographs are illustrative, generated menu visuals.
- The Meenakshi Amman Temple illustration is original artwork; the four history notes link to Madurai District's official temple page.
- The logo artwork and Managing Director portrait were supplied for this website.

## Publish with GitHub Pages

The workflow in .github/workflows/deploy.yml publishes the site when changes are pushed to main.

1. In the repository, open Settings → Pages.
2. Under Build and deployment, choose GitHub Actions as the source.
3. The first workflow run will deploy the site and provide its public Pages URL.

The site includes a client-side menu assistant. It answers dish and price questions from the menu and sends personal or custom questions to WhatsApp.

This project uses plain HTML, CSS and JavaScript; it has no build step.
