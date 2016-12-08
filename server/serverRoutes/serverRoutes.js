Router.route('/hooks', {
    where: 'server',
    action: function() {
    	console.log(this.request.body.payload)
    	var parseIt = JSON.parse(this.request.body.payload)
    	console.log(parseIt.actions[0].name)
        this.response.writeHead(200, {'Content-Type': 'application/json'});
        this.response.write("Done");
        this.response.write("\n");
        this.response.end('Success!\n');
    }
});