# Mazen Sameh — Web Developer Portfolio

Static site: HTML5, CSS3, vanilla JavaScript. No build step, no backend, no dependencies.

## Run locally
Open `index.html`, or serve the folder (`python -m http.server`).

## Replace the placeholders
| What | Where |
|---|---|
| Projects and featured project | `js/projects.js` (leave `github`/`live` empty until you have real URLs) |
| GitHub username, email | top of `js/main.js` (`GITHUB_USERNAME`, `EMAIL`), and the `YOUR_GITHUB_USERNAME` / `YOUR_EMAIL` links in `index.html` |
| Project images | put files in `assets/images/`, set `image: "assets/images/name.jpg"` |
| Journey timeline | the `<ol class="timeline">` in `index.html` |
| Site URL | `YOUR_SITE_URL` in `robots.txt` and `sitemap.xml`; optionally add `og:url` / `og:image` in `index.html` |
| Accent color | `--ac` in `css/style.css` |

Project categories: `Web Apps`, `Interactive`, `Tools`, `Experiments`.

## Deploy to GitHub Pages
Push the folder to a repo, then Settings → Pages → deploy from the `main` branch root.

## Notes
- The GitHub section calls the public GitHub API only after you set a username; on failure it shows placeholders.
- Custom cursor and magnetic effects auto-disable on touch devices, with reduced motion, or on low core-count devices.
- Light mode was intentionally left out to keep the dark design uncompromised.
