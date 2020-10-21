import _ from "lodash";

function dbg(...params) {
    // console.error.apply(this, params);
}

// TODO: This function should be part of the Collection2 package (or maybe the SimpleSchema package)
// Get the schema of a specific field from a collection with an applied SimpleSchema; Works with nested Schemas
// TODO: Even very complex nested Schema structures should work flawlessly (attach schema + subschema + array_objects in subschema + subschema in subschema)
// TODO: getFieldSchemaWithAncestors
export class SimpleSchemaFunctions {

    static getFieldLabel(collection, fieldName) {
        return SimpleSchemaFunctions.getFieldSchema(collection, fieldName).label;
    }

    static getFieldSchema(collection, fieldName, getParent = false) {
        if (!collection || !collection._c2) {
            dbg(`getFieldSchema: no collection._c2 available!`);
            return null;
        }
        if (!fieldName) {
            dbg(`getFieldSchema: no fieldName given!`);
            return null;
        }
        if (typeof fieldName.split !== 'function') {
            dbg(`getFieldSchema: fieldName is invalid / no string!`);
            return null;
        }
        const baseSchema = SimpleSchemaFunctions.getSchema(collection);
        let currentParentSchema = baseSchema;
        let current = baseSchema;
        const split = fieldName.split('.');
        for (let i = 0; i < split.length; i++) {
            current = current[split[i]];
            if (i + 2 === split.length && split[i + 1] === '$') {
                return currentParentSchema[`${split[i]}.$`];
            }
            if (_.get(current, "type.singleType._schema")) {
                if ((!getParent && i + 1 === split.length) || (getParent && i + 2 === split.length)) {
                    return current;
                }
                currentParentSchema = current = current.type.singleType._schema;
            } else {
                return current;
            }
        }
        return null;
    }

    // TODO: This function should be part of the Collection2 package (or maybe the SimpleSchema package)
    // TODO: Write test to verify that _c2, _c2._simpleSchema and _c2._simpleSchema._schema all exist and are of the correct type
    static getSchema(collection) {
        if (!collection || !collection._c2 || !collection._c2._simpleSchemas) {
            dbg(`getSchema: no collection._c2._simpleSchemas available!`);
            return null;
        }
        if (collection._c2._simpleSchemas.length !== 1) {
            console.warn(`SimpleSchemaFunctions#getSchema: collection._c2._simpleSchemas.length=`, collection._c2._simpleSchemas.length);
        }
        // return collection._c2._simpleSchema._schema; // object hierarchy has changed; 2020-10
        const _schema = _.get(collection, "_c2._simpleSchemas[0].schema._schema");
        if (!_schema) {
            console.warn(`SimpleSchemaFunctions#getSchema: _schema is empty!`);
        }
        return _schema;
    }
}
