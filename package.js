Package.describe({
    name: 'd3k4y:meteor-simple-schema-functions',
    version: '0.0.1',
    summary: 'Convenience and helper functions for aldeed:simpl-schema / aldeed:colleection2'
});

Package.onUse((api) => {
    api.versionsFrom("1.8.0.2");

    api.use([
        "ecmascript",
        "erasaur:meteor-lodash@4.0.0",
    ], 'client');

    api.mainModule('client.js', 'client');
});
