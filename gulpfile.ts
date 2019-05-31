const {task, src, series, dest} = require('gulp');
const change = require('gulp-change');
const rename = require('gulp-rename');

task('default', series( moveProjectToAppScript, moveHtml) );

const project = 'google-docs';
const files = {
  html: [
    `index.html`,
  ],
  js : [
    'es2015-polyfills.js',
    'main.js',
    'polyfills.js',
    'runtime.js',
    'styles.js',
    'vendor.js',
  ]
};

const scripts = [
  `<?!= include('polyfills.js');?>`,
  `<?!= include('es2015-polyfills.js');?>`,
  `<?!= include('runtime.js');?>`,
  `<?!= include('vendor.js');?>`,
  `<?!= include('styles.js');?>`,
  `<?!= include('main.js');?>`
];

function moveProjectToAppScript() {
  return src(files.js.map(f => `dist/${project}/${f}`))
    .pipe(change(surroundTags))
    .pipe(rename( (path) => {
      path.extname += '.html';
    }))
    .pipe(dest('app_script'));
}

function moveHtml() {
  return src(files.html.map(f => `dist/${project}/${f}`))
    .pipe(change((content) => content.replace(/\<script .*\>\<\/script\>/g, '') + '\n' + scripts.join('\n')))
    .pipe(dest('app_script'));
}

function surroundTags(content) {
  if (this.fname.indexOf('.css') > -1) {
    return '<style>\n' + content + '\n</style>';
  } else if (this.fname.indexOf('.svg') > -1) {
    return '<div class="visuallyhidden">\n' + content + '\n</div>';
  }
  return '<script>\n' + content + '\n</script>';
}
