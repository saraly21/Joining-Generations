Joining Generations website
===========================
index.html        - home page structure and text
about.html        - About Us page ("About Us" button)
programs.html     - What We Do page ("Explore" buttons under What we do)
events.html       - Events page ("View all events" & event arrow buttons)
work-with-us.html - Training & Consulting page ("Work with us" button)
resources.html    - Open Resources library ("Browse the library" & resource arrows)
styles.css        - colours, fonts, spacing (brand colours are at the top, in :root)
script.js         - newsletter pop-up, mobile menu, smooth scrolling
server.js         - local HTTP server to run the site from the terminal

Running from the terminal
-------------------------
Run `node server.js` (or `npm start`) in the terminal and open http://localhost:3000 in your browser.
You can also open any page directly from PowerShell, e.g.: `Start-Process index.html`

Notes
- Photos load from Unsplash (internet needed). To use your own, replace the
  src="https://images.unsplash.com/..." links in index.html with local files.
- Newsletter pop-up: set SHOW_NEWSLETTER_ON_LOAD to false in script.js to stop it
  appearing on first load.
- The newsletter and contact forms don't send anywhere yet (same as the original).
