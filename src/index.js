//===================================================
/* "It is not an actual project; therefore,
I rely on comments to assess the code." */
//===================================================
import Index from './WebGLFox/Index';

// Instantiate the Index class with the canvas element
const index = new Index(document.querySelector('canvas.webgl'));

// Add an event listener to handle cleanup when navigating away from the page
window.addEventListener('beforeunload', () => {
  index.destroy();
});

/************ "beforeunload" event
 * 
 - This event is fired when the window, document, or a resource within the document is about to be unloaded. 
 
 - It is a signal that the user is navigating away from the current page (e.g., by closing the tab or navigating to a different URL).
 
 - Purpose: The primary purpose of this event is to allow the webpage to clean up resources, save state, or prompt the user if there are unsaved changes. */
