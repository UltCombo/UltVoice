require.config({
    paths: {
        'ultvoice': '../min/ultvoice.min'
    }
});

require(['ultvoice'], function(ultvoice) {
	console.log(ultvoice);
});
