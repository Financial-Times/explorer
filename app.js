var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/explorer', function(req, res) {
	var data = fs.readFileSync('./demo/index.html', { encoding: 'utf8' });
	res.setHeader('Cache-Control', 'no-cache');
    res.send(data);
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
