Package.describe({
    name: 'sebl29:meteor-simple-schema-functions',
    version: '0.0.1',
    summary: 'Convenience and helper functions for aldeed:simpl-schema / aldeed:colleection2'
});

Package.onUse((api) => {
    api.versionsFrom("1.11");

    api.use([
        "ecmascript",
    ], 'client');

    api.mainModule('client.js', 'client');
});
