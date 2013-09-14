ultvoice.debug = true;

ultvoice.actions.push({
	trigger: ['open', 'abra'],
	callback: function(address) {
		location = 'http://' + address;
	}
}, {
	trigger: ['write', 'escreva'],
	callback: function() {
		document.body.innerHTML = '<h1>' + [].join.call(arguments, ' ') + '</h1>';
	}
});




ultvoice.start();
