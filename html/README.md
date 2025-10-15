# CSS Topics Examples

This folder contains comprehensive examples for advanced CSS topics including Transitions, Animations, CSS Variables, Theming, and SASS/SCSS features.

## Files Overview

### 1. Transitions (`transitions.html` & `transitions.css`)
Demonstrates CSS transitions with:
- `transition-property`, `transition-duration`, `transition-timing-function`
- Multiple property transitions
- Interactive buttons with different transition effects
- Hover effects and animations

### 2. Animations (`animations.html`, `animations.css`, `animations.js`)
Showcases CSS animations with:
- `@keyframes` definitions
- `animation-name`, `animation-duration`, timing functions
- Complex animations with multiple keyframes
- Interactive animation controls
- JavaScript-powered animation management

### 3. CSS Variables (`css-variables.html`, `css-variables.css`, `css-variables.js`)
Covers CSS Custom Properties:
- `--var` declarations and `var()` usage
- Color, spacing, and typography variables
- `calc()` functions with variables
- Fallback values and scoped variables
- Interactive variable editor

### 4. Theming (`theming.html`, `theming.css`, `theming.js`)
Advanced theming system featuring:
- Multiple theme implementations (Light, Dark, Blue, Green, Purple, High Contrast)
- Theme switching with CSS variables
- Component library that adapts to themes
- Accessibility considerations
- Local storage persistence

### 5. SASS/SCSS (`sass-demo.html`, `sass-demo.css`, `scss/` folder)
Complete SASS/SCSS demonstration:
- **Variables**: Color, typography, spacing variables
- **Nesting**: Hierarchical CSS structure
- **Mixins**: Reusable code blocks with parameters
- **Partials**: Modular file organization
- **Advanced features**: Functions, loops, conditionals

## SASS/SCSS File Structure

```
scss/
├── main.scss              # Main file that imports all partials
├── _variables.scss        # Global variables
├── _mixins.scss          # Reusable mixins
├── _base.scss            # Base styles and resets
├── components/
│   ├── _buttons.scss     # Button component styles
│   ├── _cards.scss       # Card component styles
│   └── _navigation.scss  # Navigation styles
└── layout/
    ├── _header.scss      # Header layout
    ├── _footer.scss      # Footer layout
    └── _grid.scss        # Grid system and utilities
```

## Key Features Demonstrated

### Transitions
- Property-specific transitions
- Duration and timing function variations
- Transform and color transitions
- Interactive hover effects

### Animations
- Multiple keyframe animations
- Animation iteration and direction control
- Performance-optimized animations
- JavaScript animation control

### CSS Variables
- Global and scoped variable declarations
- Dynamic variable updates with JavaScript
- Variable calculations and manipulations
- Fallback value handling

### Theming
- Complete theming system implementation
- Accessible color schemes
- Theme persistence
- Dynamic theme switching

### SASS/SCSS
- Variable preprocessing vs CSS variables
- Nested selector organization
- Mixin creation and usage
- Partial file imports
- Advanced SASS functions (lighten, darken, etc.)
- Loops and conditional compilation

## How to Use

1. **View Examples**: Open any HTML file in a web browser to see the interactive examples
2. **Study Code**: Examine the CSS and SCSS files to understand implementation
3. **Experiment**: Modify variables, colors, and values to see changes
4. **Learn Structure**: Study the SASS file organization for scalable CSS architecture

## Browser Support

All examples use modern CSS features and are compatible with:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## SASS Compilation

To compile the SASS files:
```bash
# Install SASS
npm install -g sass

# Compile main.scss to CSS
sass scss/main.scss sass-demo.css

# Watch for changes
sass --watch scss/main.scss:sass-demo.css
```

## Educational Value

These examples demonstrate:
- **Progressive Enhancement**: From basic CSS to advanced preprocessing
- **Performance**: Optimized animations and transitions
- **Accessibility**: High contrast themes and keyboard navigation
- **Maintainability**: Organized code structure with SASS
- **Interactivity**: JavaScript integration with CSS features
- **Responsive Design**: Mobile-friendly implementations

Each example builds upon the previous concepts, creating a comprehensive learning path for advanced CSS development.