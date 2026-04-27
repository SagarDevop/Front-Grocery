/**
 * PWA Icon Generator Script
 * Creates properly sized PNG icons from the existing logo.
 * Run: node generate-icons.cjs
 */
const fs = require('fs');
const path = require('path');

const ICON_DIR = path.join(__dirname, 'public', 'icons');
const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

// Ensure icons directory exists
if (!fs.existsSync(ICON_DIR)) {
  fs.mkdirSync(ICON_DIR, { recursive: true });
}

/**
 * Creates a simple SVG icon and saves it as a reference.
 * For production, replace these with actual designed PNG icons.
 * The SVG will render correctly as a PWA icon placeholder.
 */
function createSVGIcon(size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}" fill="#22c55e"/>
  <g transform="translate(${size/2}, ${size/2})">
    <path d="M${-size*0.15} ${-size*0.2} L${-size*0.12} ${size*0.12} A${size*0.05} ${size*0.05} 0 0 0 ${-size*0.07} ${size*0.16} L${size*0.15} ${size*0.16} A${size*0.05} ${size*0.05} 0 0 0 ${size*0.2} ${size*0.12} L${size*0.25} ${-size*0.12} L${-size*0.1} ${-size*0.12}" fill="none" stroke="white" stroke-width="${Math.max(2, size*0.04)}" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${-size*0.06}" cy="${size*0.24}" r="${size*0.03}" fill="white"/>
    <circle cx="${size*0.12}" cy="${size*0.24}" r="${size*0.03}" fill="white"/>
  </g>
</svg>`;
  return svg;
}

// Copy the existing logo for all sizes (the browser will scale it)
const logoPath = path.join(__dirname, 'public', 'GreenCart_logo.png');

if (fs.existsSync(logoPath)) {
  SIZES.forEach(size => {
    const destPath = path.join(ICON_DIR, `icon-${size}x${size}.png`);
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(logoPath, destPath);
      console.log(`✅ Created icon-${size}x${size}.png (from logo)`);
    } else {
      console.log(`⏭️  icon-${size}x${size}.png already exists`);
    }
  });
} else {
  console.log('⚠️  GreenCart_logo.png not found, creating SVG placeholders...');
  SIZES.forEach(size => {
    const svgPath = path.join(ICON_DIR, `icon-${size}x${size}.svg`);
    fs.writeFileSync(svgPath, createSVGIcon(size));
    console.log(`✅ Created SVG placeholder: icon-${size}x${size}.svg`);
  });
}

console.log('\n🎉 Icon generation complete!');
console.log('📁 Icons saved to:', ICON_DIR);
