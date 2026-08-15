import fs from 'fs';

const colors = {
  "surface-bright": "#31394d",
  "on-primary-fixed-variant": "#004395",
  "on-secondary-container": "#c4abff",
  "on-primary-container": "#00285d",
  "on-error-container": "#ffdad6",
  "secondary": "#d0bcff",
  "on-tertiary": "#003640",
  "on-primary-fixed": "#001a42",
  "on-tertiary-fixed": "#001f26",
  "on-secondary-fixed": "#23005c",
  "primary-fixed": "#d8e2ff",
  "error": "#ffb4ab",
  "surface-container-high": "#222a3d",
  "tertiary-container": "#009eb9",
  "on-surface": "#dae2fd",
  "success-vibrant": "#10B981",
  "primary-fixed-dim": "#adc6ff",
  "danger-vibrant": "#EF4444",
  "outline": "#8c909f",
  "on-tertiary-container": "#002f38",
  "background": "#0b1326",
  "surface-container-highest": "#2d3449",
  "inverse-on-surface": "#283044",
  "surface-container": "#171f33",
  "secondary-fixed": "#e9ddff",
  "on-secondary": "#3c0091",
  "surface-container-low": "#131b2e",
  "secondary-fixed-dim": "#d0bcff",
  "on-surface-variant": "#c2c6d6",
  "secondary-container": "#571bc1",
  "glass-stroke": "rgba(255, 255, 255, 0.1)",
  "inverse-primary": "#005ac2",
  "error-container": "#93000a",
  "on-tertiary-fixed-variant": "#004e5c",
  "primary": "#adc6ff",
  "primary-container": "#4d8eff",
  "tertiary-fixed-dim": "#4cd7f6",
  "surface-tint": "#adc6ff",
  "surface-dim": "#0b1326",
  "glass-bg": "rgba(15, 23, 42, 0.65)",
  "on-secondary-fixed-variant": "#5516be",
  "on-error": "#690005",
  "inverse-surface": "#dae2fd",
  "surface-container-lowest": "#060e20",
  "surface-variant": "#2d3449",
  "surface": "#0b1326",
  "tertiary-fixed": "#acedff",
  "outline-variant": "#424754",
  "on-background": "#dae2fd",
  "tertiary": "#4cd7f6",
  "on-primary": "#002e6a"
};

const fonts = {
  "body-lg": ["Inter"],
  "display-lg": ["Outfit"],
  "headline-lg-mobile": ["Outfit"],
  "body-md": ["Inter"],
  "body-sm": ["Inter"],
  "headline-sm": ["Outfit"],
  "label-sm": ["Inter"],
  "label-md": ["Inter"],
  "headline-md": ["Outfit"],
  "headline-lg": ["Outfit"]
};

let css = '\n@theme {\n';
for (const [key, value] of Object.entries(colors)) {
  css += `  --color-${key}: ${value};\n`;
}
for (const [key, value] of Object.entries(fonts)) {
  css += `  --font-${key}: ${value[0]};\n`;
}
css += `  --text-body-lg: 18px;\n  --text-body-lg--line-height: 28px;\n  --text-body-lg--font-weight: 400;\n`;
css += `  --text-display-lg: 48px;\n  --text-display-lg--line-height: 56px;\n  --text-display-lg--letter-spacing: -0.02em;\n  --text-display-lg--font-weight: 700;\n`;
css += `  --text-headline-lg-mobile: 28px;\n  --text-headline-lg-mobile--line-height: 36px;\n  --text-headline-lg-mobile--font-weight: 600;\n`;
css += `  --text-body-md: 16px;\n  --text-body-md--line-height: 24px;\n  --text-body-md--font-weight: 400;\n`;
css += `  --text-body-sm: 14px;\n  --text-body-sm--line-height: 20px;\n  --text-body-sm--font-weight: 400;\n`;
css += `  --text-headline-sm: 20px;\n  --text-headline-sm--line-height: 28px;\n  --text-headline-sm--font-weight: 600;\n`;
css += `  --text-label-sm: 12px;\n  --text-label-sm--line-height: 16px;\n  --text-label-sm--letter-spacing: 0.05em;\n  --text-label-sm--font-weight: 600;\n`;
css += `  --text-label-md: 14px;\n  --text-label-md--line-height: 16px;\n  --text-label-md--letter-spacing: 0.05em;\n  --text-label-md--font-weight: 600;\n`;
css += `  --text-headline-md: 24px;\n  --text-headline-md--line-height: 32px;\n  --text-headline-md--font-weight: 600;\n`;
css += `  --text-headline-lg: 32px;\n  --text-headline-lg--line-height: 40px;\n  --text-headline-lg--letter-spacing: -0.01em;\n  --text-headline-lg--font-weight: 600;\n`;
css += '}\n';

css += `
body {
    background-color: var(--color-background);
    color: var(--color-on-background);
    overflow-x: hidden;
}

body::before {
    content: '';
    position: fixed;
    top: -20%;
    left: -10%;
    width: 50%;
    height: 50%;
    background: radial-gradient(circle, rgba(77,142,255,0.08) 0%, rgba(11,19,38,0) 70%);
    z-index: -1;
}
body::after {
    content: '';
    position: fixed;
    bottom: -20%;
    right: -10%;
    width: 50%;
    height: 50%;
    background: radial-gradient(circle, rgba(208,188,255,0.08) 0%, rgba(11,19,38,0) 70%);
    z-index: -1;
}

.glass-panel {
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid var(--color-glass-stroke);
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.02);
    box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.2);
}

.table-row-hover:hover {
    background: rgba(255, 255, 255, 0.03);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
}

html { scroll-behavior: smooth; }
.glass-input {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--color-glass-stroke);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}
.glass-input:focus {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--color-primary);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1), 0 0 0 1px var(--color-primary);
}
`;

fs.appendFileSync('./src/index.css', css);
console.log('Appended to index.css');
