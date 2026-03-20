================================================================================
PORTFOLIO REDESIGN BRIEF — satishjalan.me
Prepared for Antigravity — March 2026
================================================================================

This is a complete, actionable redesign brief covering every known UX failure,
visual issue, and structural gap in the current portfolio. Each problem is
diagnosed with a specific fix. Priority order is at the end. Execute in order.


================================================================================
CONTEXT — WHAT TO PRESERVE
================================================================================

satishjalan.me is a developer portfolio for a Full Stack and Web3 developer.
The site has strong foundational decisions that should be preserved and built
around, not replaced. This is a refinement, not a rebuild.

KEEP THESE. DO NOT TOUCH:

- The bottom dock navigation concept and icon structure
- The section numbering system (01 / ECOSYSTEM, 02 / CODE, 03 / WORK, etc.)
- The "LET'S TALK" contact section — large display heading left, form right
- The project cards with real screenshot previews, tech stack tags, date badges
- The Personal / Client filter tabs on the projects section
- The GitHub contribution graph in the Open Source section
- The script font for "Satish Jalan" in the hero — this is a personality
  decision that works and should stay contained to exactly this one use

OVERALL DESIGN DIRECTION:

Strict black and white. The full site runs on black backgrounds, white
typography, and grey muted text. No color palettes. No accent color systems.
The only color allowed is what this brief calls "micro color" — color so
restrained it is only noticed on second look. If you removed it, the layout
still works perfectly. Color is seasoning, not the meal.

Every color decision must pass this test: does the layout break without it?
If no, reconsider whether it should be there at all.


================================================================================
PROBLEM 1 — EXCESSIVE SCROLLING (CRITICAL UX FAILURE)
Priority: Fix This First
================================================================================

A senior reviewer flagged this as the most serious issue on the site. The
portfolio requires too many scrolls to evaluate fully. Each section consumes
nearly a full viewport of height even when the content inside does not justify
that space. By the time a recruiter or client reaches the projects section they
have already made a judgment. First impressions on portfolio sites happen within
the first two scrolls. Everything after that is confirmation.

TARGET:
A visitor should understand who you are, what you have built, how experienced
you are, and how to contact you within 3 to 4 scrolls on desktop. Not 8. Four.

SPECIFIC FIXES:

Hero Section
  The hero currently has a massive dead zone in the upper half of the viewport.
  All content is compressed into the bottom right quadrant. Vertically center
  the entire hero content block within the full viewport height. This alone
  removes one effective scroll's worth of empty space.

  min-height: 100vh;
  display: flex;
  align-items: center;

Tech Stack Section
  This section occupies a full viewport for two columns of badge pills. The
  categories (Frontend, Backend, DevOps, Web3) are correct and should stay.
  Reduce the internal vertical padding by 40 percent. A recruiter should be
  able to scan all categories without scrolling inside the section.

Experience Section
  Currently a plain vertical list of 5 roles that takes 2 full scrolls.
  Restructure as a compact timeline where each entry is a single horizontal
  row by default. The description sits collapsed underneath and expands on
  click or hover. This collapses the section to approximately half its current
  height while keeping all the information accessible.

Education Section
  Two items do not warrant a full scroll section with its own large heading.
  Merge education into the experience section as a sub-list underneath it,
  or place it in a compact block directly above the footer. Remove it as a
  standalone section entirely. This removes a full scroll from the page.

Writing / Blog Section
  This is a new section being added per this brief. It must be compact by
  design — editorial rows, no thumbnails, no cards. See Problem 8 for full
  specification.


================================================================================
PROBLEM 2 — HERO DEAD ZONE AND PHOTO TREATMENT
Priority: Second
================================================================================

The hero layout puts all content in the bottom right quadrant of the viewport.
The top half is completely empty black. The photo sits inside a thin rectangular
frame that outlines the image without contributing anything visually. These are
two separate but related problems.

FIX A — DEAD ZONE:
  Vertically center the hero content block in the full viewport as described
  in Problem 1. Once centered, the dead zone disappears. If the design still
  feels sparse after centering, add ONE of the following background treatments.
  Pick one. Do not add all of them.

  Option 1 — Dot Grid:
    A very low opacity dot grid across the full background. Each dot is 1px,
    spaced at 28 to 32px intervals, at 8 to 12 percent opacity white. Creates
    a blueprint-like technical atmosphere without adding color.

  Option 2 — Line Grid:
    Faint geometric line grid, single pixel wide lines at 8 percent opacity,
    creating a graph paper effect behind the content.

  Option 3 — Particle Field:
    Animated canvas particles. 40 to 60 particles maximum, moving very slowly,
    connected by lines when within proximity. White particles at 15 percent
    opacity. Lightweight implementation only — no heavy libraries.

FIX B — PHOTO TREATMENT:
  Two options. Pick one and execute it properly. Do not mix them.

  Option A — Remove the Frame, Add Depth:
    Remove the thin rectangular frame entirely. Apply these treatments to the
    photo element itself:

    - SVG noise filter directly on the image at 3 to 5 percent opacity.
      Gives the photo a film-like grain quality matching the dark background.
    - A soft drop shadow underneath:
      box-shadow: 0 20px 60px rgba(0,0,0,0.6)
    - A very faint white radial glow BEHIND the photo, not on it.
      A pseudo-element positioned behind the image with:
      background: radial-gradient(rgba(255,255,255,0.04), transparent)
      This gives the photo a sense of being illuminated from behind without
      adding any color.

  Option B — Keep the Frame, Make it Earn Its Place:
    Apply an animated luminous border treatment. A parent container with a
    rotating conic gradient background. The frame itself with a 1 to 2px gap
    between parent and inner border, creating the illusion of a traveling glow.
    Use ONLY white and very dark grey in the gradient — no color. The effect
    is subtle movement that makes the static photo feel alive.

    .photo-wrapper {
      background: conic-gradient(from var(--angle), #fff, #333, #fff);
      animation: spin 6s linear infinite;
      padding: 1px;
      border-radius: 4px;
    }
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }


================================================================================
PROBLEM 3 — COLOR DIRECTION — BLACK, WHITE, MICRO COLOR ONLY
Priority: Apply Throughout
================================================================================

The full site is black and white. This is a deliberate positioning choice and
must be maintained. Micro color is allowed only in the specific places listed
below. Nowhere else. Not on headings. Not on section dividers. Not on card
borders unless specified here. Not on hover backgrounds with color.

ALLOWED MICRO COLOR MOMENTS — THIS LIST IS COMPLETE AND FINAL:

Location: Available for Freelance badge
  Treatment: A single 6px dot to the left of the text
  Value: #4ADE80 at 80% opacity
  Why: The only green on the entire site. Signals live status. Noticed on
       second look, not first.

Location: Active dock icon
  Treatment: A 2px dot underline indicator below the active icon
  Value: #E8E8F0 (off-white)
  Why: Not color — just distinction. Tells the user which section is active.

Location: Blog post code blocks
  Treatment: A 2px left border on code block elements
  Value: rgba(99, 102, 241, 0.35)
  Why: Nearly invisible desaturated indigo. Just enough to signal "this is
       code" without announcing itself.

Location: Row hover states (blog rows, experience rows)
  Treatment: Background shift on hover only
  Value: rgba(255, 255, 255, 0.03)
  Why: Not color. A barely perceptible brightening on interactive rows.

Location: Reading progress bar (blog post pages only)
  Treatment: 2px tall bar at the very top of the viewport
  Value: #FFFFFF pure white
  Why: No color needed here.

Location: Section number labels (01 / ECOSYSTEM, etc.)
  Treatment: Stay exactly as they are currently
  Value: Current muted grey value — do not change
  Why: Do not colorize these. They work as-is.

If a designer proposes adding color anywhere not on this list, the answer is no.
The restraint is the point. One green dot on the entire site hits harder than
a full accent color system.


================================================================================
PROBLEM 4 — TECH STACK — EVERYTHING LOOKS EQUAL
Priority: Third
================================================================================

All skill badges in the tech stack section are identical in size, weight, and
visual treatment. JavaScript and a library touched once look the same. A
recruiter scanning this section cannot distinguish the primary stack from
peripheral experience. This communicates lack of depth rather than breadth.

FIX — TWO VISUAL TIERS:
  Within each category, split skills into two visual tiers. No labels needed —
  the visual difference communicates the hierarchy silently.

  Tier 1 — Primary Skills (Daily Use):
    - Slightly larger pill than current
    - Full opacity (100%)
    - Border: 1px solid rgba(255, 255, 255, 0.25)
    - Background: rgba(255, 255, 255, 0.06)
    - Font weight: 500

  Tier 2 — Secondary Skills (Known, Not Daily):
    - Slightly smaller pill
    - 60 percent opacity on the entire element
    - Border: 1px solid rgba(255, 255, 255, 0.10)
    - Background: transparent
    - Font weight: 400

  Apply this to every category: Frontend, Backend and APIs, Databases, DevOps,
  Web3. The developer decides which tier each skill belongs to — this is a
  content decision, not a design one.

ADDITIONAL COMPRESSION:
  Remove the category headers as full-width rows. Instead use a small uppercase
  monospace label floated left above each group. This saves approximately 80px
  of vertical space per category — roughly 400px total across all five. That is
  almost a full viewport saved in this section alone.


================================================================================
PROBLEM 5 — EXPERIENCE SECTION — ZERO VISUAL HIERARCHY
Priority: Fourth
================================================================================

The experience section is a plain vertical list where every entry looks
identical regardless of significance. HackQuest Contributor and AI-Wallah Intern
are formatted the same way. The left column holds a massive "Selected
Experience." heading with nothing filling the space beside it. This section
takes 2 full scrolls and communicates very little by the end of them.

FIX — COMPACT TIMELINE FORMAT:
  Restructure the entire section as a compact timeline. Collapses to
  approximately half the current height while making information more readable.

  Timeline Structure:
    - A thin vertical line (1px, rgba(255,255,255,0.12)) runs along the left
      edge of the right column
    - Each entry has a small circle on the line — 6px diameter, border 1px
      white, background transparent by default
    - Most recent or most significant entry gets a FILLED white circle to
      signal primacy
    - Entry layout: Company name in bold full opacity, then a centered dot
      separator, then Role title at 80% opacity, then date range in monospace
      right-aligned at 60% opacity — all on one line
    - Description sits collapsed — one line visible at 65% opacity, full
      description expands on click
    - Remove the large left-column heading. Replace with a small section label
      above the timeline in the same style as 01 / ECOSYSTEM, 02 / CODE

EDUCATION MERGE:
  Remove Education as a standalone section entirely. Add a thin horizontal rule
  at the bottom of the experience timeline, then list the two education entries
  below it using the same timeline format but with SQUARE markers instead of
  circles to visually distinguish them from work experience. Label this
  mini-section with a small monospace "Education" label.
  This removes an entire scroll section from the page.


================================================================================
PROBLEM 6 — TYPOGRAPHY — TWO VOICES NOT RECONCILED
Priority: Fifth
================================================================================

The hero uses a flowing script font for the name. The rest of the site uses a
stark, heavy grotesque for section headings like "Tech Stack." and "LET'S TALK".
These two typographic voices exist on the same site without ever acknowledging
each other. The transition from handwritten warmth to heavy grotesque authority
is abrupt and undesigned.

FIX — PICK ONE OPTION AND EXECUTE IT PROPERLY:

  Option A — Formalize the Contrast:
    Keep the script font for the name ONLY. Add a single deliberate design
    element that signals the shift from personal to professional — a thin
    horizontal rule below the hero bio, or a subtle section divider. The
    contrast becomes a choice rather than an accident. No other page uses the
    script font. It is the developer's signature, contained to one use.

  Option B — Remove the Script Font:
    Replace the script name with a very large, tight grotesque at heavier
    weight than the section headings. For example: 80 to 96px, font-weight 800,
    letter-spacing -0.03em. More cohesive with the rest of the site. Less warm,
    more architectural. Cleaner for screen readers and accessibility.

  Do not use the script font anywhere except the hero name. Not on the blog.
  Not on the contact page. One use only.

BODY TEXT AND LINE HEIGHT RULES — APPLY SITE-WIDE:
  - Body text: 16 to 17px, line-height 1.75 to 1.80, font-weight 300 to 400
  - Section headings (Tech Stack., Open Source., etc.):
    48 to 56px, line-height 1.0, font-weight 800, letter-spacing -0.02em
  - Small section labels (01 / ECOSYSTEM):
    11 to 12px, monospace, uppercase, letter-spacing 0.18em, opacity 55%
  - Project card titles: 15px, font-weight 600, full opacity
  - Project card descriptions: 13px, font-weight 300, opacity 65%
  - Do NOT apply 1.5 line-height to any heading above 32px. This creates
    rivers of white space between words. It is the most common tell of a
    site that was never actually looked at after being built.


================================================================================
PROBLEM 7 — CLIENT-SIDE RENDERING — INVISIBLE TO SEARCH ENGINES
Priority: Fix Before Launch
================================================================================

The entire site is client-side rendered (CSR). When Google's crawler or any
tool that does not execute JavaScript fetches the page, it receives almost
nothing — just a bare HTML shell with a root div and JavaScript bundle
references. All content is invisible to search engines. Anyone searching for
your name, your skills, or your projects will not find this portfolio.

DIAGNOSIS:
  Run the Next.js build and check the output. Pages marked with a static
  symbol are correctly pre-rendered. If the root page (/) is showing as fully
  dynamic or client-only, the page component has a "use client" directive at
  the top level that is causing the entire page to hydrate on the client.

FIXES:
  1. Remove "use client" from any top-level page component. Page components
     should be server components by default in the Next.js App Router.

  2. Wrap only the interactive parts — the dock navigation, hover animations,
     scroll-triggered effects — in separate client components using "use client"
     at their own file level, not the page level.

  3. Add proper meta tags to every page:
     - title
     - description
     - og:title
     - og:description
     - og:image
     - canonical URL
     These are also invisible in a CSR-only setup.

  4. Add a sitemap.xml using next-sitemap or a manual route handler. Submit
     it to Google Search Console.

VERIFICATION:
  After the fix, run this:
    curl -s https://www.satishjalan.me | grep "Satish"

  You should see your name and content in the raw HTML response. If you can
  read your content in the raw HTML, the crawler can too. If nothing returns,
  the page is still client-side rendered.


================================================================================
PROBLEM 8 — BLOG SECTION — NEW ADDITION
Priority: Add After Core Fixes
================================================================================

Add a dedicated Writing section that automatically pulls posts from Hashnode
and Medium. The developer writes on Hashnode and Medium as normal. The portfolio
fetches and displays them automatically. No managing posts in the codebase. No
copy-pasting. Publish on Hashnode, it appears on the portfolio within the hour.

--- 8.1 NAVIGATION ---

Add a Writing icon to the bottom dock alongside Home, Projects, Experience,
and Contact. The dock now has one additional item. Same icon treatment as
existing items. Links to the /blog route.

On the main portfolio page, add a compact blog preview section between the
Experience section and the Contact section. Label it 05 / WRITING following
the existing numbering system.

--- 8.2 DATA FETCHING STRATEGY ---

Pull posts from two sources at build time using Next.js static generation.
Both fetches run at build time — not in the browser. The result is baked into
the static HTML and revalidated every hour in the background using ISR.

HASHNODE API:
  Hashnode exposes a public GraphQL API at https://gql.hashnode.com that
  requires zero authentication for public blogs.

  Query:
    query {
      publication(host: "yourblog.hashnode.dev") {
        posts(first: 10) {
          edges {
            node {
              title
              brief
              slug
              publishedAt
              readTimeInMinutes
              url
            }
          }
        }
      }
    }

MEDIUM RSS FEED:
  Medium exposes an RSS feed at:
    https://medium.com/feed/@yourusername

  Use the rss-parser npm package to convert it to JSON at build time. Pull
  title, link, pubDate, and content snippet from the feed. Strip HTML from the
  content snippet and truncate to 120 characters for the brief.

MERGING AND SORTING:
  export async function getStaticProps() {
    const hashnode = await fetchHashnodePosts()
    const medium  = await fetchMediumPosts()
    const posts   = [...hashnode, ...medium]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    return {
      props: { posts },
      revalidate: 3600  // Rebuild in background every hour
    }
  }

AUTO-DEPLOY ON PUBLISH (HASHNODE ONLY):
  Set up a webhook on Hashnode that triggers a Vercel redeploy when a new
  post is published.
    Hashnode dashboard → Blog Settings → Webhooks → Add Vercel deploy hook URL
  The moment you hit Publish on Hashnode, the portfolio rebuilds and the new
  post appears within 60 seconds. Medium does not support webhooks but the
  hourly revalidate handles it passively.

--- 8.3 WHAT EACH POST ROW SHOWS ---

No cover images. No thumbnails. Clean editorial rows only.

  Title         Full post title, linked to original URL, opens in new tab
  Brief         One sentence max, 100 characters, truncated, muted opacity
  Date          Formatted as "Mar 2026" — not a raw ISO timestamp
  Read time     Shown as "4 min" — Hashnode provides this, Medium estimate
                from word count (words divided by 200)
  Source badge  Tiny monospace pill: [Hashnode] or [Medium] — muted, so
                the visitor knows where clicking takes them

--- 8.4 HOMEPAGE PREVIEW LAYOUT (05 / WRITING) ---

Show the 4 most recent posts only. Each post is a single horizontal row:

  Post Title            Brief description muted           Mar 2026  4 min  [Hashnode]
  ─────────────────────────────────────────────────────────────────────────────────
  Another Post Title    One line of context               Feb 2026  6 min  [Medium]

  - The entire row is a link wrapping all elements
  - On hover: background shifts to rgba(255,255,255,0.03) and an arrow →
    appears on the right edge of the row
  - A thin 1px border bottom rgba(255,255,255,0.08) separates each row
  - Below the 4 posts: a "Read all writing →" link in small monospace,
    right-aligned, linking to /blog

--- 8.5 THE /blog PAGE ---

  - Large "Writing." heading at the top in the same heavy grotesque as other
    section headers
  - Three client-side filter buttons above the list: All, Hashnode, Medium
    These filter the already-fetched array client-side — no additional API calls
  - Clicking any post opens the original URL in a new tab
  - No sidebar. No related posts. No comment widgets.
  - You are not hosting post content on your portfolio — just the index.
    The external platform handles the reading experience.

--- 8.6 INDIVIDUAL POST PAGES ---

There are no individual post pages on the portfolio itself. Every post links
out to the original Hashnode or Medium URL. The portfolio is the index. The
external platform is the reading experience. This keeps the codebase simple
and means formatting, code highlighting, and reader comments are handled by
platforms built for exactly that purpose.


================================================================================
PROBLEM 9 — MOBILE AUDIT CHECKLIST
Priority: Test After Desktop Fixes
================================================================================

Test each on a real device — not just browser dev tools — because fixed
positioning and safe area insets behave differently on actual iOS Safari.

Bottom Dock — iOS Safari on notched iPhone
  Common failure: Dock sits behind home indicator or overlaps content
  Fix: Add env(safe-area-inset-bottom) to the bottom padding of the dock

Hero layout — Viewport widths below 640px
  Common failure: Photo and text side by side — too cramped on small screens
  Fix: Stack vertically below 640px — photo centered top, text below

LET'S TALK heading — Viewport widths below 390px
  Common failure: Massive display text causes horizontal overflow and scroll
  Fix: clamp(48px, 12vw, 120px) so it scales with the viewport width

Project cards — Any mobile width
  Common failure: Two columns too narrow to read card content comfortably
  Fix: Single column below 640px

Tech stack pills — Any mobile width
  Common failure: Pills wrap inconsistently across categories
  Fix: Flex wrap with consistent gap — test each category group separately

Blog rows — Any mobile width
  Common failure: Five columns of data too wide for narrow viewports
  Fix: On mobile show only title and date — hide brief, read time, source badge

Experience timeline — Any mobile width
  Common failure: Timeline line and dots misalign on narrow viewports
  Fix: Test the vertical line positioning with actual content at 375px width


================================================================================
EXECUTION PRIORITY ORDER
================================================================================

Execute in this order. Do not jump ahead. Problems 1 and 2 affect the visual
impression of every subsequent section — fixing them first makes everything
else easier to evaluate correctly.

  1   Fix excessive scrolling — compress all sections vertically
      Impact: Critical — affects the entire user journey
      Effort: Medium — spacing and layout adjustments throughout

  2   Fix hero dead zone — vertically center, add background treatment
      Impact: High — first impression, real estate above the fold
      Effort: Low — CSS changes only

  3   Fix hero photo — remove frame, add depth treatment
      Impact: High — most prominent visual element on the page
      Effort: Low — CSS and filter adjustments

  4   Apply micro color rules site-wide per the list in Problem 3
      Impact: Medium — visual consistency
      Effort: Low — targeted additions only

  5   Fix CSR to SSG — convert page to server rendering
      Impact: Critical — site is invisible to search engines without this
      Effort: Medium — Next.js architecture change

  6   Add proper meta tags and Open Graph data to all pages
      Impact: High — SEO and link sharing (social previews)
      Effort: Low — metadata additions only

  7   Add sitemap.xml and submit to Google Search Console
      Impact: Medium — helps with discovery over time
      Effort: Low — configuration

  8   Apply two visual tiers to skill badges in tech stack section
      Impact: Medium — readability and perceived depth
      Effort: Low — styling changes only

  9   Restructure experience section as compact timeline
      Impact: Medium — reduces scrolling, improves hierarchy
      Effort: Medium — layout restructure

  10  Merge education section into experience
      Impact: Low-Medium — removes a full scroll section
      Effort: Low

  11  Reconcile typography — pick Option A or B and execute consistently
      Impact: Medium — overall site cohesion
      Effort: Low — targeted font change

  12  Add blog section — Hashnode and Medium API integration
      Impact: High — adds substantial new content to the portfolio
      Effort: High — new feature build

  13  Set up Hashnode webhook for auto-redeploy on publish
      Impact: Medium — automation, keeps portfolio current
      Effort: Low — configuration only

  14  Full mobile audit across all breakpoints on a real device
      Impact: High — large percentage of visitors are on mobile
      Effort: Medium — systematic testing and fixes

Items 1 through 4 should be in production within the first sprint.
Items 5 through 11 are the second sprint.
Items 12 through 14 are the third sprint.


================================================================================
NOTES FOR THE DEVELOPMENT TEAM
================================================================================

A few things worth stating clearly so nothing gets debated in implementation:

1.  The blog section pulls from external APIs at build time only. There is no
    backend, no database, no CMS. Do not over-engineer this. rss-parser for
    Medium, a single fetch to the Hashnode GraphQL endpoint for Hashnode,
    merged and sorted in getStaticProps. That is the entire implementation.

2.  The micro color list in Problem 3 is exhaustive. It is not a starting point
    for discussion. If a designer wants to add color somewhere not on that list,
    the answer is no.

3.  The bottom dock stays. Its concept, its position, its icon structure.
    Refinements to its styling are fine. Removing it or moving it is not.

4.  Do not add a traditional top navigation bar. The dock is the navigation.
    Adding a top nav alongside the dock creates two competing navigation systems.

5.  The "LET'S TALK" contact section layout stays. The display typography size,
    the split layout, the form on the right. This is the strongest section on
    the site.

6.  Test on a real iOS device before calling mobile done. Browser dev tools do
    not replicate fixed positioning behavior and safe area insets accurately
    on Safari.

7.  When in doubt about whether a design addition is needed, ask: does the site
    work without it? If yes, it probably does not need to be there.


================================================================================
END OF BRIEF
satishjalan.me — Antigravity Redesign Brief — March 2026
================================================================================