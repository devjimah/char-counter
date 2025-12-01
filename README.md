# Character Counter Web Application

A real-time character analysis tool that counts characters, words, sentences, and provides letter density visualization with dark/light theme support.

![Character Counter Preview](./assets/images/preview.jpg)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Design Specifications](#design-specifications)
- [Browser Support](#browser-support)
- [Future Enhancements](#future-enhancements)

## Overview

This is a responsive web application that provides real-time text analysis. Users can type or paste text to get instant statistics including character count, word count, sentence count, and detailed letter density analysis. The app features a beautiful UI with light/dark theme toggle.

## Features

- **Real-time Character Counting** - Instant feedback as you type
- **Word & Sentence Analysis** - Accurate word and sentence counting
- **Letter Density Visualization** - Top 5 most frequent letters with progress bars
- **Theme Toggle** - Seamless light/dark mode switching
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Accessibility** - WCAG compliant with ARIA labels and keyboard navigation
- **Character Limit Option** - Optional character limit with warning indicators
- **Exclude Spaces Option** - Toggle to count characters with/without spaces
- **5000 Character Maximum** - Built-in text limit

## Technologies Used

- **HTML5** - Semantic markup
- **SCSS/Sass** - CSS preprocessor with variables and nesting
- **CSS3** - Modern styling with Grid, Flexbox, and CSS Variables
- **JavaScript (ES6+)** - Real-time counting logic
- **Google Fonts** - DM Sans font family
- **Git** - Version control

## Project Structure

starter-code/
├── assets/
│ ├── fonts/
│ │ └── DM_Sans/
│ │ └── static/
│ │ ├── DMSans-Regular.ttf
│ │ ├── DMSans-SemiBold.ttf
│ │ └── DMSans-Bold.ttf
│ └── images/
│ ├── favicon-32x32.png
│ ├── logo-light-theme.svg
│ ├── logo-dark-theme.svg
│ ├── icon-moon.svg
│ ├── icon-sun.svg
│ ├── bg-light-theme.png
│ ├── bg-dark-theme.png
│ └── illustration-\*.svg
├── css/
│ ├── main.scss
│ ├── main.css
│ └── main.css.map
├── js/
│ └── main.js
├── index.html
└── README.md

## Installation

### Prerequisites

- Node.js (for Sass compilation)
- Git

### Steps

1. **Clone the repository**

   bash
   git clone https://github.com/devjimah/char-counter.git
   cd character-counter

2. **Install Sass (if not already installed)**

   bash
   npm install -g sass

3. **Compile SCSS to CSS**

   bash
   cd css
   sass main.scss main.css --watch

4. **Open in browser**
   bash
   # Simply open index.html in your browser
   # Or use a local server like Live Server in VS Code

## Usage

### Basic Usage

1. Open `index.html` in your web browser
2. Start typing in the text area
3. View real-time statistics in the cards above
4. Scroll down to see letter density analysis

### Theme Toggle

- Click the moon/sun icon in the top-right corner to switch themes
- Theme preference persists across sessions _(requires JavaScript)_

### Options

- **Exclude Spaces** - Check to count characters without spaces
- **Character Limit** - Set a custom character limit with visual warnings

## Design Specifications

### Colors

**Light Theme:**

- Background: `#f5f5f5`
- Text: `#333`
- Primary: `#ba56f9`
- Border: `#e0e0e0`

**Dark Theme:**

- Background: `#1a1a2e`
- Text: `#ffffff`
- Primary: `#ba56f9`
- Border: `#a6a6c8`

### Typography

- **Font Family:** DM Sans
- **Weights:** 400 (Regular), 600 (Semi-Bold), 700 (Bold)
- **Base Size:** 16px

### Responsive Breakpoints

- Desktop: `1440px`
- Tablet: `768px`
- Mobile: `480px`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Future Enhancements

- [x] Add JavaScript functionality for real-time counting
- [x] Implement "See more" button to show extended letter density
- [x] Add reading time estimation
- [x] Theme preference persistence (localStorage)
- [ ] Export statistics as PDF/CSV
- [ ] Add text analysis (readability score, avg word length)
- [ ] Implement copy-to-clipboard functionality
- [ ] Add undo/redo functionality
- [ ] Multiple language support

### Code Style

- Use semantic HTML5
- Follow BEM naming convention for CSS classes
- Write clean, commented SCSS
- Ensure accessibility standards (WCAG 2.1)
- Test on multiple browsers and devices
