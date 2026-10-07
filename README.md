# Gent Spa — مركز جنت سبا للرجال Gent Spa

Spec build: a website made for a real Jeddah business that has no site of its own, on Mamar's initiative. **Not commissioned.** Built to show the owner, not published as theirs.

**Live:** https://ahmedps520-svg.github.io/Gent-Spa/

| | |
|---|---|
| Business | Men's grooming & spa |
| District | الروضة — الكيال، جدة |
| Google | 4.8★ · 126 reviews (checked 7 Oct 2026) |
| Phone | 054 444 8720 |
| Web presence before this | none |
| Hours | Sat–Thu 10am–3am · Fri 1:30pm–3am |
| Maps | https://www.google.com/maps/place/?q=place_id:ChIJMcAWPT_RwxUR44bEZOegBAY |

## The idea

A breathing guide — four seconds in, four out — with steam rising behind it. The small details (sterilised tools, coffee and water) are quoted from reviews and labelled as such.

**Palette:** Sage, mist, pine · **Type:** Noto Naskh Arabic · Italiana · Figtree

## Where the content came from

Everything on the page comes from the business's own Google Maps listing — the owner's description, the hours, the listed attributes, and the reviews. Nothing is invented: no prices, no staff names, no history, no claims they haven't made.

**Reviews:** 3 quoted. Five others name a barber or masseur. Reviews are 5-star only, verbatim, and never ones that praise an individual employee — staff move on.

## Before it goes live for them

- **Photos.** The page is deliberately image-free — no stock, and no AI pictures pretending to be their shop. Five real photos from the owner and it's done.
- **Owner check.** Confirm hours, services and the WhatsApp number.
- **Remove** `<meta name="robots" content="noindex, nofollow">` once they adopt it. Until then it stays, so this page never competes with their own listing in search.

## Tech

Plain HTML, CSS and JavaScript — no framework, no build step. Arabic is the default and ships in the markup; English is a toggle remembered in `localStorage`. Opening hours and "open now" are computed in Jeddah time (UTC+3), wherever the visitor is.

---
Developed by [Mamar](https://mamar.site)
