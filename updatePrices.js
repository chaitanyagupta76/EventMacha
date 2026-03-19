const fs = require('fs');
const path = require('path');
const dirs = ['en', 'hi', 'kn', 'ta', 'te'];
dirs.forEach(lang => {
    const file = path.join(__dirname, 'src/i18n/locales', lang, 'translation.json');
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let data = JSON.parse(content);
        if (data.pricing && data.pricing.plans) {
            if (data.pricing.plans.pro) {
                data.pricing.plans.pro.price = '₹2,000';
            }
            if (data.pricing.plans.proPlus) {
                data.pricing.plans.proPlus.price = '₹5,000';
            }
        }
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    }
});
console.log("Updated prices in translations");
