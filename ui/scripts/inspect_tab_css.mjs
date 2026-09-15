import fs from 'fs';

const css = fs.readFileSync('src/app/mixhotel-luxury.css', 'utf8');

// Find all CSS rules mentioning cateBranchTab or cateBranchCard
const rules = css.match(/[^{}]*cateBranch(Tab|Card)[^{]*\{[^}]*\}/g) || [];
rules.forEach(r => console.log(r.trim()));
