/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

// Load your translation JSON file
const translationFilePath = path.join(__dirname, 'src', 'locales', 'en.json');
const translations = JSON.parse(fs.readFileSync(translationFilePath, 'utf-8'));

// Load your routing files
const routesFilePath = path.join(__dirname, 'src', 'routes', 'routes.js');
const pathnamesFilePath = path.join(__dirname, 'src', 'routes', 'pathnames.js');

const routesContent = fs.readFileSync(routesFilePath, 'utf-8');
const pathnamesContent = fs.readFileSync(pathnamesFilePath, 'utf-8');

// Parse the route definitions and pathnames
const routesAst = babelParser.parse(routesContent, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
const pathnamesAst = babelParser.parse(pathnamesContent, { sourceType: 'module', plugins: ['jsx', 'typescript'] });

let componentToRouteMap = {};
let pathnameMap = {};

// Extract the component to route mapping
traverse(routesAst, {
    VariableDeclarator(path) {
        if (path.node.id.name === 'lazyPages') {
            path.traverse({
                ObjectProperty(innerPath) {
                    const componentName = innerPath.node.key.name;
                    const importPath = innerPath.node.value.arguments[0].value;
                    componentToRouteMap[componentName] = importPath;
                }
            });
        }
    }
});

// Extract the route paths
traverse(pathnamesAst, {
    VariableDeclarator(path) {
        if (path.node.id.name === 'pathnames') {
            path.traverse({
                ObjectProperty(innerPath) {
                    const routeName = innerPath.node.key.name;
                    const routePath = innerPath.node.value.value;
                    pathnameMap[routeName] = routePath;
                }
            });
        }
    }
});

// Map each translation key to the component and route
function mapTranslationKeysToRoutes(translations, parentKey = '') {
    let result = {};
    for (const [key, value] of Object.entries(translations)) {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof value === 'string') {
            const { component: _c, route } = findComponentAndRouteForTranslationKey(fullKey);
            result[key] = {
                value,
                href: route ? route : '#',  // Use '#' if the route is not found
            };
        } else {
            result[key] = mapTranslationKeysToRoutes(value, fullKey);
        }
    }
    return result;
}

// Helper function to find which component and route a translation key belongs to
function findComponentAndRouteForTranslationKey(translationKey) {
    let component = null;
    let route = null;

    // Search through the components for usage of the translation key
    glob.sync('src/**/*.tsx').forEach(file => {
        const fileContent = fs.readFileSync(file, 'utf-8');
        const ast = babelParser.parse(fileContent, { sourceType: 'module', plugins: ['jsx', 'typescript'] });

        traverse(ast, {
            CallExpression(path) {
                if (t.isIdentifier(path.node.callee, { name: 't' })) {
                    const arg = path.node.arguments[0];
                    if (t.isStringLiteral(arg) && arg.value === translationKey) {
                        component = path.hub.file.opts.filename;
                    }
                }
            }
        });
    });

    // Find the route that corresponds to the component
    if (component) {
        for (const [key, importPath] of Object.entries(componentToRouteMap)) {
            if (component.includes(importPath)) {
                route = pathnameMap[key];
                break;
            }
        }
    }

    return { component, route };
}

// Generate the new translation file with routes
const newTranslations = mapTranslationKeysToRoutes(translations);

// Write the new translations to a file
const outputFilePath = path.join(__dirname, 'src', 'locales', 'en_with_routes.json');
fs.writeFileSync(outputFilePath, JSON.stringify(newTranslations, null, 2), 'utf-8');

console.log('Translation file with routes generated at', outputFilePath);
