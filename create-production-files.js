const fs = require('fs');
const path = require('path');

// Production path mappings
const pathMappings = {
    '../css/': 'css/',
    '../js/': 'js/',
    '../cookie-banner.js': 'cookie-banner.js',
    '../images/': 'images/'
};

// Files to process
const htmlFiles = [
    'html/index.html',
    'html/gallery.html',
    'html/contact.html',
    'html/privacy.html'
];

console.log('🚀 Creating production files for Hostinger deployment...\n');

// Create production directory
const prodDir = 'production';
if (!fs.existsSync(prodDir)) {
    fs.mkdirSync(prodDir);
    console.log('📁 Created production directory');
}

// Process each HTML file
htmlFiles.forEach(filePath => {
    try {
        // Read the source file
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace all path mappings
        Object.entries(pathMappings).forEach(([oldPath, newPath]) => {
            content = content.replace(new RegExp(oldPath.replace(/\.\./g, '\\.\\.').replace(/\//g, '\\/'), 'g'), newPath);
        });
        
        // Extract filename
        const fileName = path.basename(filePath);
        const outputPath = path.join(prodDir, fileName);
        
        // Write production file
        fs.writeFileSync(outputPath, content);
        console.log(`✅ Created: ${outputPath}`);
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
});

// Copy additional files
const additionalFiles = [
    { src: 'cookie-banner.js', dest: 'production/cookie-banner.js' },
    { src: '.htaccess', dest: 'production/.htaccess' }
];

additionalFiles.forEach(({ src, dest }) => {
    try {
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
            console.log(`✅ Copied: ${dest}`);
        }
    } catch (error) {
        console.error(`❌ Error copying ${src}:`, error.message);
    }
});

console.log('\n🎉 Production files ready!');
console.log('\n📋 Upload these files to Hostinger public_html/:');
console.log('   • production/index.html → public_html/index.html');
console.log('   • production/gallery.html → public_html/gallery.html');
console.log('   • production/contact.html → public_html/contact.html');
console.log('   • production/privacy.html → public_html/privacy.html');
console.log('   • production/cookie-banner.js → public_html/cookie-banner.js');
console.log('   • production/.htaccess → public_html/.htaccess');
console.log('\n🎯 Also upload these folders:');
console.log('   • css/ → public_html/css/');
console.log('   • js/ → public_html/js/');
console.log('   • images/ → public_html/images/'); 