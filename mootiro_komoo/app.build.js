({
    findNestedDependencies: true,

    appDir: '',
    baseUrl: '.build',
    dir: '.build/min',

    paths: {
        'jquery': 'empty:',
        'underscore': 'empty:',
        'backbone': 'empty:',
        'reForm': 'empty:',
        'async': '../static/lib/requirejs/async',
        'goog': '../static/lib/requirejs/goog',
        'propertyParser': '../static/lib/requirejs/propertyParser',
        'text': '../static/lib/requirejs/text',
        'templates': '../static/templates',
        'infobox': 'empty:',
        'markerclusterer': 'empty:'
    },

    modules: [
        // Common dependencies used by the entire project
        {
            name: 'common',
            include: [
                'i18n',
                'app',
                'googlemaps',
                'analytics',
                'facebook-jssdk',
                'map/controls',
                'map/maptypes',
                'map/providers',
                'map/maps',
                'map.jquery',
                'project/box',
                'project/model',
                'community/model'
            ],
            exclude: [
                'utils'
            ]
        }
    ],

    excludeShallow: [
    ]
})
