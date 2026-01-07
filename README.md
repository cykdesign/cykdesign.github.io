# Chen-Yu Kao Portfolio Website

A modern, responsive portfolio website recreated from Webflow.

## Features

- **Modern Design**: Clean, minimalist design with smooth animations
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Scrolling**: Enhanced user experience with smooth scroll animations
- **Interactive Elements**: Hover effects and scroll-triggered animations
- **Performance Optimized**: Lightweight and fast-loading

## Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `script.js` - Interactive features and animations
- `README.md` - This file

## Setup

1. Simply open `index.html` in your web browser
2. Or use a local server for development:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   ```

## Customization

### Update Email Address
Edit the contact email in `index.html`:
```html
<a href="mailto:your-email@example.com" class="contact-email">your-email@example.com</a>
```

### Add Company Names
Edit the `companies` array in `script.js`:
```javascript
const companies = [
    'Ladder',
    'Cloudflare',
    'Your Company 3',
    // Add more companies here
];
```

### Add Project Images
Replace the `.project-placeholder` divs with actual images:
```html
<div class="project-visual">
    <img src="path-to-your-image.jpg" alt="Project Name">
</div>
```

## Deployment

### Netlify
1. Drag and drop the folder to [Netlify](https://www.netlify.com/)
2. Your site will be live instantly

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory

### GitHub Pages
1. Create a GitHub repository
2. Push your files
3. Enable GitHub Pages in repository settings

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.


