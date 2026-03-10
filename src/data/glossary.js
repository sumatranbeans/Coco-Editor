/**
 * Glossary Data - Template
 *
 * Add your project's technical terms here. Each term has:
 * - technical: precise definition for engineers
 * - plain: everyday analogy for newcomers
 *
 * The GlossaryTooltip component auto-detects these terms
 * throughout the document and shows hover tooltips.
 */
export const glossary = {
  'API': {
    technical: 'Application Programming Interface - a defined set of protocols and tools for building software. APIs specify how software components should interact, typically through HTTP endpoints returning JSON.',
    plain: 'A waiter in a restaurant. You tell the waiter what you want (request), the kitchen makes it (server), and the waiter brings it back (response). You never need to know how the kitchen works.',
  },
  'Component': {
    technical: 'A self-contained, reusable piece of UI that manages its own state and rendering. In React, components are JavaScript functions that return JSX describing what should appear on screen.',
    plain: 'A LEGO brick. Each component is a building block that does one thing well. You snap them together to build complex interfaces, and you can reuse the same brick in different places.',
  },
  'localStorage': {
    technical: 'A web storage API that allows JavaScript to store key-value pairs persistently in the browser. Data survives page refreshes and browser restarts, with a typical limit of 5-10MB per origin.',
    plain: 'A notebook that lives in your browser. When you write something in it, the note stays there even if you close the browser and come back later. Each website gets its own notebook.',
  },
  'Tailwind CSS': {
    technical: 'A utility-first CSS framework that provides low-level utility classes (like p-4, text-sm, flex) directly in HTML/JSX markup, enabling rapid UI development without writing custom CSS files.',
    plain: 'Instead of naming and defining custom styles in a separate file, you describe how things look right where they are - like putting sticky labels directly on items saying "make this blue" or "add some padding."',
  },
  'JSX': {
    technical: 'JavaScript XML - a syntax extension for JavaScript that allows writing HTML-like code within JavaScript functions. JSX is transpiled to React.createElement() calls by tools like Babel or Vite.',
    plain: 'A way to write HTML inside your JavaScript code. It looks like HTML but has superpowers - you can mix in JavaScript variables, loops, and conditions right in the middle of your layout.',
  },
}
