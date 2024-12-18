var test = require('tape');
var fs = require('fs');
var json2proto = require('./');
var protobuf = require('protocol-buffers-schema');

test('jsonschema', function (t) {
	var schema = fs.readFileSync('./test-data/test.jsonschema').toString();
	var result = json2proto(JSON.parse(schema));

	if (!fs.existsSync('./test-data/out')){
		fs.mkdirSync('./test-data/out');
	}
	fs.writeFileSync('./test-data/out/test.generated.proto', result);

	var test = fs.readFileSync('./test-data/test.proto').toString();

	t.deepEquals(protobuf.parse(result), protobuf.parse(test));
	t.end();
});
