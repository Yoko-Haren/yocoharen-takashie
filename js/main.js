/**
 * Entry point for the CV's interactions.
 *
 * The page is complete without JavaScript. Each module below only adds
 * motion or interaction on top of the HTML and CSS.
 */
import { initNav } from './modules/nav.js';
import { initTyping } from './modules/typing.js';
import { initReveal } from './modules/reveal.js';
import { initTimeline } from './modules/timeline.js';
import { initSkills } from './modules/skills.js';
import { initTilt } from './modules/tilt.js';

initNav();
initTyping();
initReveal();
initTimeline();
initSkills();
initTilt();

// Lets the CSS know scripted animations are in charge from here on.
document.documentElement.classList.add('js-ready');
