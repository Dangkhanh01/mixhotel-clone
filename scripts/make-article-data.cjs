const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, 'ui', 'src', 'data', 'khachSanTinhYeuArticle.ts');
const tsContent = fs.readFileSync(tsPath, 'utf8');

// Extract TOC
const tocStart = tsContent.indexOf('export const KHACH_SAN_TINH_YEU_TOC: TocItem[] = [');
const tocEnd = tsContent.indexOf('];', tocStart);
const tocJson = tsContent.substring(tocStart + 50, tocEnd + 1);
const tocItems = JSON.parse(tocJson);

// Extract HTML
const htmlStart = tsContent.indexOf('export const KHACH_SAN_TINH_YEU_CONTENT_HTML = `');
const htmlEnd = tsContent.lastIndexOf('`;');
let htmlContent = tsContent.substring(htmlStart + 49, htmlEnd);

// Replace /tassets/ and /storage/ with theme asset paths where needed
htmlContent = htmlContent.replace(/src="\/tassets\//g, 'src="<?php echo esc_url($theme_uri); ?>/assets/tassets/');
htmlContent = htmlContent.replace(/src="\/storage\//g, 'src="<?php echo esc_url($theme_uri); ?>/assets/storage/');
htmlContent = htmlContent.replace(/src="\/uploads\//g, 'src="<?php echo esc_url($theme_uri); ?>/assets/uploads/');

const phpContent = `<?php
$theme_uri = get_template_directory_uri();

$khach_san_tinh_yeu_toc = ` + JSON.stringify(tocItems, null, 4)
  .replace(/\{/g, '[')
  .replace(/\}/g, ']')
  .replace(/:/g, ' =>') + `;

ob_start();
?>
` + htmlContent + `
<?php
$khach_san_tinh_yeu_content_html = ob_get_clean();

return [
    'toc'  => $khach_san_tinh_yeu_toc,
    'html' => $khach_san_tinh_yeu_content_html,
];
`;

const outPath = path.join(__dirname, 'wp-content', 'themes', 'mixhotel-theme', 'inc-khach-san-tinh-yeu-article.php');
fs.writeFileSync(outPath, phpContent);
console.log('Successfully written inc-khach-san-tinh-yeu-article.php!');
