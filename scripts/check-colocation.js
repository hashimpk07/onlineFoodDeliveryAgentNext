/* eslint-disable */
const fs = require('fs');
const path = require('path');

const DASHBOARD_DIR = path.join(__dirname, '../src/app/[locale]/(main)/dashboard');
const ROLES = ['3pl', 'client', 'general'];

const NEXTJS_RESERVED_FILES = new Set([
  'page.tsx',
  'page.ts',
  'layout.tsx',
  'layout.ts',
  'loading.tsx',
  'loading.ts',
  'error.tsx',
  'error.ts',
  'global-error.tsx',
  'global-error.ts',
  'not-found.tsx',
  'not-found.ts',
  'template.tsx',
  'template.ts',
  'default.tsx',
  'default.ts',
  'route.ts',
  'route.js',
]);

const ALLOWED_SYSTEM_FILES = new Set([
  '.ds_store',
  'thumbs.db',
]);

const violations = [];

// Helper function to check if a directory contains a page/route file anywhere in its subtree
function hasPageRoute(dirPath) {
  if (!fs.existsSync(dirPath)) return false;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      // Don't count page files inside private folders starting with '_'
      if (entry.name.startsWith('_')) {
        continue;
      }
      if (hasPageRoute(fullPath)) return true;
    } else if (entry.isFile()) {
      if (entry.name === 'page.tsx' || entry.name === 'page.ts' || entry.name === 'route.ts' || entry.name === 'route.js') {
        return true;
      }
    }
  }
  return false;
}

function checkDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(path.join(__dirname, '..'), fullPath);

    if (entry.isDirectory()) {
      if (entry.name.startsWith('_')) {
        // Private directory, skip checks inside it
        continue;
      }
      
      // It's a directory that doesn't start with '_'
      // Check if it is a route segment (contains page.tsx/route.ts in its subtree)
      if (!hasPageRoute(fullPath)) {
        violations.push({
          type: 'directory',
          path: relativePath,
          message: `Directory does not start with '_' but does not contain any page.tsx or route.ts in its subtree. It should be prefixed with '_' (e.g. '_components') if it is a private folder.`
        });
      } else {
        // Recurse into route segments
        checkDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      const lowerName = entry.name.toLowerCase();
      if (ALLOWED_SYSTEM_FILES.has(lowerName)) {
        continue;
      }
      if (entry.name.startsWith('_')) {
        // Allowed private file
        continue;
      }
      if (!NEXTJS_RESERVED_FILES.has(entry.name)) {
        violations.push({
          type: 'file',
          path: relativePath,
          message: `File does not start with '_' and is not a reserved Next.js routing file (like page.tsx, layout.tsx, etc.). It should be moved into a private folder (like '_components' or '_hooks') or prefixed with '_'.`
        });
      }
    }
  }
}

function main() {
  console.log('Starting Next.js collocation pattern checks...');
  
  for (const role of ROLES) {
    const rolePath = path.join(DASHBOARD_DIR, role);
    if (fs.existsSync(rolePath)) {
      console.log(`Checking role: ${role}...`);
      checkDirectory(rolePath);
    } else {
      console.log(`Role directory not found: ${rolePath}`);
    }
  }

  const reportPath = path.join(__dirname, '../colocation-report.md');
  let reportContent = '# Next.js Collocation Pattern Violations Report\n\n';
  reportContent += `Generated on: ${new Date().toLocaleString()}\n\n`;

  if (violations.length === 0) {
    reportContent += '## 🎉 Perfect! No violations found.\n\nAll checked folders (`3pl`, `client`, `general`) are fully following the Next.js collocation pattern.\n';
  } else {
    reportContent += `Found **${violations.length}** violation(s).\n\n`;
    
    // Group by role
    const grouped = {
      '3pl': [],
      'client': [],
      'general': [],
      'other': []
    };
    
    for (const v of violations) {
      if (v.path.includes('/dashboard/3pl/')) {
        grouped['3pl'].push(v);
      } else if (v.path.includes('/dashboard/client/')) {
        grouped['client'].push(v);
      } else if (v.path.includes('/dashboard/general/')) {
        grouped['general'].push(v);
      } else {
        grouped['other'].push(v);
      }
    }

    for (const [groupName, groupViolations] of Object.entries(grouped)) {
      if (groupViolations.length > 0) {
        reportContent += `## 📁 Role: ${groupName.toUpperCase()} (${groupViolations.length} violations)\n\n`;
        reportContent += '| Type | Path | Description |\n';
        reportContent += '| --- | --- | --- |\n';
        for (const v of groupViolations) {
          reportContent += `| ${v.type === 'directory' ? '📁 Directory' : '📄 File'} | \`${v.path}\` | ${v.message} |\n`;
        }
        reportContent += '\n';
      }
    }
  }

  fs.writeFileSync(reportPath, reportContent, 'utf8');
  console.log(`Report generated successfully at: ${reportPath}`);
  console.log(`Found ${violations.length} violations.`);
}

main();
