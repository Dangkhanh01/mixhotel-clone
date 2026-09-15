import fs from 'fs';

let css = fs.readFileSync('src/app/mixhotel-luxury.css', 'utf8');

// Replace or add clean gold-rectangle definition
const cleanGoldRectangle = `
/* Cleaned and robust gold-rectangle styling */
.gold-rectangle {
  position: relative;
  width: 100%;
  padding-top: 66.67% !important; /* 3:2 ratio */
  overflow: hidden !important;
  border-radius: 12px;
  border: 1px solid rgba(200, 137, 34, 0.35);
  background: #140e0a;
  box-sizing: border-box;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.gold-rectangle:hover {
  transform: translateY(-4px);
  border-color: #e5a73e;
  box-shadow: 0 10px 25px rgba(200, 137, 34, 0.3);
}

.gold-rectangle a {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100% !important;
  height: 100% !important;
  display: block;
}

.gold-rectangle img {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  transition: transform 0.6s ease;
}

.gold-rectangle:hover img {
  transform: scale(1.08);
}
`;

css += '\n\n' + cleanGoldRectangle;
fs.writeFileSync('src/app/mixhotel-luxury.css', css);
console.log('Appended clean gold-rectangle styling to mixhotel-luxury.css!');
