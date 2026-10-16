# DevFolio

A responsive software engineering portfolio for Sourabh Jain. The site presents professional experience, education, technical skills, example projects, technical writing, credentials, coding profiles, and contact information.

## Features

- Responsive layout for desktop, tablet, and mobile screens.
- Dark and light themes, with the selected theme saved in the browser.
- Mobile navigation and smooth in-page scrolling.
- Project filtering by technology.
- Searchable technical article directory with category filters and a show-all control.
- Contact form with client-side validation. The form does not send or store messages.
- Accessible labels, keyboard focus styles, and reduced-motion support.

## Technologies

- HTML for page content and structure.
- CSS for responsive layout, themes, and visual styling.
- Vanilla JavaScript for interactive features.
- Python's built-in HTTP server for local testing (optional).

No framework, package manager, backend, or API credentials are required. Google Fonts is used for the display typeface; fallback fonts are defined for when it is unavailable.

## Project Structure

```text
DevFolio/
├── index.html   # Page content and portfolio sections
├── style.css    # Themes, layout, and responsive styles
├── script.js    # Theme, navigation, filters, article directory, and form behavior
├── README.md    # Project and setup instructions
└── .gitignore   # Common local files excluded from Git
```

## Prerequisites

- A modern web browser.
- Python 3 if you want to run the recommended local HTTP server. You can check with `python3 --version`.

## Installation

There are no dependencies to install. Open the project folder in your editor, or clone the repository and enter its directory:

```bash
git clone <repository-url>
cd DevFolio
```

Replace `<repository-url>` with the URL of your repository.

## Run Locally

From the project directory, start Python's built-in web server:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser. Stop the server with `Ctrl+C` in the terminal. If you are using a cloud development environment, forward port `8000` in its Ports panel and open the forwarded address.

You can also open `index.html` directly in a browser, though an HTTP server is more reliable in browser-based development environments.

## Screenshots

Screenshot placeholder: capture the portfolio and save it as `screenshots/portfolio-preview.png`, then add it here, for example:

```markdown
![DevFolio portfolio preview](screenshots/portfolio-preview.png)
```

## Contributing

1. Create a branch for your change.
2. Keep edits focused and use the existing HTML, CSS, and vanilla JavaScript structure.
3. Run the site locally and check the affected interactions at desktop and mobile widths.
4. Check that internal links, external URLs, and browser console output are correct.
5. Open a pull request describing the change and how you tested it.

When updating profile details or links, edit the relevant markup in `index.html` and the article catalog in `script.js`. Do not add private information, credentials, or claims that have not been verified.
