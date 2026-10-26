/**
 * Entry point for the CV's interactions.
 *
 * The page is complete without JavaScript. Each module below only adds
 * motion or interaction on top of the HTML and CSS.
 */
import { initNav } from './modules/nav.js';
import { initTyping } from './modules/typing.js';

initNav();
initTyping();

// Lets the CSS know scripted animations are in charge from here on.
document.documentElement.classList.add('js-ready');
