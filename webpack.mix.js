const mix = require ('laravel-mix');

// mix.combine(['resources/js/addtask.js', 'resources/js/modal.js'], 'public/javascripts/laravel.js')
//mix.minify('resources/js/addtask.js');
mix.combine(['resources/js/addtask.js', 'resources/js/modal.js'], 'public/javascripts/laravel.js')
    .sass('resources/css/laravel1.scss', 'resources/css/tmp')
    .sass('resources/css/laravel2.scss', 'resources/css/tmp')
    .styles(['resources/css/tmp/laravel1.css', 'resources/css/tmp/laravel2.css'], 'public/stylesheets/my.css');
