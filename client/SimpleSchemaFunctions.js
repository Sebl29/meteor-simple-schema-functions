
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
            if (current && current.type && current.type.singleType && current.type.singleType._schema) {
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
        if (!collection || !collection._c2) {
            dbg(`getSchema: no collection._c2 available!`);
            return null;
        }
        return collection._c2._simpleSchema._schema;
    }
}
