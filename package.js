Package.describe({
    name: 'sebl29:meteor-simple-schema-functions',
    version: '0.0.2',
    summary: 'Convenience and helper functions for aldeed:simpl-schema / aldeed:collection2',
    documentation: null,
});

Package.onUse(function (api) {

    api.versionsFrom('1.11.1');

    api.use([
        'aldeed:collection2@3.2.1',
        'ecmascript',
    ]);
    api.use([
        'tmeasday:check-npm-versions@0.3.2',
    ], 'client');

    api.mainModule('client.js', 'client');
});
