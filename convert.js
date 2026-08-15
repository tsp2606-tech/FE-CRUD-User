import fs from 'fs';
import path from 'path';

function htmlToJsx(html) {
  return html
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/<!--[\s\S]*?-->/g, '')
    // Fix self closing tags
    .replace(/<img([^>]*[^\/])>/g, '<img$1 />')
    .replace(/<input([^>]*[^\/])>/g, '<input$1 />')
    .replace(/<br([^>]*[^\/])>/g, '<br$1 />')
    .replace(/<hr([^>]*[^\/])>/g, '<hr$1 />')
    // Fix onsubmit
    .replace(/onsubmit="[^"]*"/g, 'onSubmit={(e) => e.preventDefault()}')
    // Remove dummy background image in modals
    .replace(/<div className="absolute inset-0 z-0 opacity-50 select-none pointer-events-none">[\s\S]*?<\/div>/g, '')
    // Fix style attributes
    .replace(/style="([^"]*)"/g, (match, p1) => {
      const styleObj = p1.split(';').filter(s => s.trim()).reduce((acc, style) => {
        const [key, value] = style.split(':').map(s => s.trim());
        if (key && value) {
          const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          acc[camelKey] = value;
        }
        return acc;
      }, {});
      return `style={${JSON.stringify(styleObj)}}`;
    });
}

function extractBodyContent(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

const reqDir = './requirements';
const outDir = './src/pages';
const compDir = './src/components';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });

const files = [
  { dir: 'user_management_dashboard', out: 'src/pages/Dashboard.jsx', name: 'Dashboard' },
  { dir: 'user_management_add_user_modal_new', out: 'src/components/AddUserModal.jsx', name: 'AddUserModal' },
  { dir: 'user_management_edit_user_modal', out: 'src/components/EditUserModal.jsx', name: 'EditUserModal' },
  { dir: 'user_management_delete_confirmation_modal', out: 'src/components/DeleteModal.jsx', name: 'DeleteModal' },
];

files.forEach(({ dir, out, name }) => {
  const filePath = path.join(reqDir, dir, 'code.html');
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const bodyHtml = extractBodyContent(html);
    const jsx = htmlToJsx(bodyHtml);
    
    const reactComponent = `import React from 'react';\n\nconst ${name} = () => {\n  return (\n    <>\n      ${jsx}\n    </>\n  );\n};\n\nexport default ${name};\n`;
    fs.writeFileSync(out, reactComponent);
    console.log(`Created ${out}`);
  }
});
