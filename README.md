# Vector Climate — research and portfolio demo guide

Built November 2, 2026 for Daxton Zimmerman. This is the third HVAC website concept, with a bold technical style and four pages: Home, Services, Comfort Lab, and Request Preview.

## What to show a prospect

1. Start on the home page. Select **Plan an upgrade** to show how the next step responds to the visitor’s goal.
2. Open **Comfort lab**. Switch between **AC + furnace**, **Ducted heat pump**, and **Ductless**. Change heating/cooling mode and use the airflow play/pause control.
3. Build a project plan. Pick a project, a priority, and timing. Change an earlier answer to show that the selections stay intact.
4. Download the project brief. It is a real text download that a homeowner could bring to a consultation.
5. Choose **Use this in my request**. The plan follows into the request page and preselects system replacement when appropriate.
6. Fill in sample details, review the request, and edit it. Nothing is sent, stored, or booked.
7. On Services, search the FAQs to demonstrate useful filtering and a clear empty state.

A short introduction: “This is a concept I built to show how an HVAC website can help people understand their options and arrive with a clearer project request.”

Present it as a concept, rather than past paid client work or evidence of sales results. The business, branding, and imagery are illustrative.

## Research and design decisions

### Start with the homeowner’s intent

Trane’s official recommendation experience begins with repair versus replacement. Vector adapts that idea into repair, replacement, and everyday comfort paths, with an original visual design. The selector updates the explanation and sends the visitor into the relevant planner starting point.

Source: https://www.trane.com/residential/en/system-recommendation/

### Help visitors prepare for a useful conversation

ENERGY STAR recommends considering the existing system, maintenance history, and uncomfortable rooms when talking to a contractor. The planner gathers a few initial goals and produces a brief, while the Services page suggests questions about scope, equipment, airflow, and care.

Source: https://www.energystar.gov/saveathome/heating-cooling/10-tips-hiring

### Explain system types visually

The U.S. Department of Energy explains heat pumps as systems that transfer heat for heating and cooling. ENERGY STAR describes ductless systems without central ductwork. The explorer makes these broad differences visible, with corresponding written explanations. It is an illustrative diagram, not a designed installation.

Sources:
- https://www.energy.gov/heat-pumps
- https://www.energystar.gov/products/ductless_heating_cooling

### Keep sizing and equipment selection with qualified professionals

ENERGY STAR emphasizes using the characteristics of the actual home for equipment sizing and checking airflow. Vector therefore offers planning tools, rather than a square-footage-only tonnage calculator or a made-up price or savings estimate.

Source: https://www.energystar.gov/saveathome/heating-cooling/hvac-quality-installation

### Give the planner a clear beginning, progress, and review

W3C recommends logical groups of questions, visible progress, and understandable instructions for multi-step forms. The planner has three explicit stages, Back and Edit controls, preserved choices, keyboard focus on each new question, and a review before the request handoff.

Source: https://www.w3.org/WAI/tutorials/forms/multi-page/

### Make interactive controls usable by keyboard

The explorer uses tabs with arrow-key, Home, and End navigation. Selections have visible and accessible states. Inputs have visible labels, and required fields use native validation. The mobile menu can be closed with Escape.

Sources:
- https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- https://www.w3.org/WAI/tutorials/forms/labels/

### Keep motion optional and the site light

Airflow animation is off by default, has an explicit play/pause control, and is disabled for the device’s reduced-motion preference. The site uses static pages, a compressed hero image, and small browser scripts, with no application framework.

Sources:
- https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/motion
- https://developers.google.com/search/docs/appearance/core-web-vitals

No Lighthouse score, conversion improvement, or guaranteed loading time is claimed. Actual performance depends on the hosting, fonts, device, and network.

## Verification performed

- Viewed the full desktop Home and Comfort Lab pages, plus the Request page and phone Comfort Lab layout.
- Checked all four pages at 320, 390, 768, and 1440 pixels wide; no horizontal page overflow was found.
- Tested system tab keyboard navigation, system switching, heating/cooling mode, and airflow play/pause.
- Completed the planner, edited an earlier answer, and confirmed the selected answer remained.
- Downloaded and inspected the sample brief.
- Confirmed plan transfer and service preselection on the request page.
- Confirmed empty required fields block review; filled the preview, reviewed it, and returned to edit with values preserved.
- Tested FAQ matches, no-results state, and accordion expansion.
- Tested mobile menu open and Escape close.
- Checked internal files, links, anchor targets, unique IDs, JavaScript syntax, and successful local page responses.
- Reviewed source for misleading claims and corrected selected-state, diagram animation, and small-text contrast issues.

This is a focused functional and visual review, not a formal accessibility certification or a field performance study.

## Local use and client adaptation

Main source folder:
`/Users/daxtonzimmerman/Desktop/Web Dev/Websites/HVAC Demo 03 - Vector Climate`

Website files live in `dist/`. Open `dist/index.html` or serve `dist/` with a static web server. No build or dependency installation is required. Google Fonts has normal system-font fallbacks.

For a real business, replace the fictional brand, approved service claims, photos, service area, and contact details. Connect the request to the business’s chosen contact system and test delivery. Confirm scope, hosting, ownership, maintenance, and any paid integrations before a sale. The interactive feature set shown here does not by itself establish the scope of a $1,000 client contract.
