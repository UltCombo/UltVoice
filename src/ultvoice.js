(function() {
	var prefixes = 'webkit moz ms o'.split(' '),
		speechRec = window.SpeechRecognition;
	for (var i = 0; !speechRec && i < prefixes.length; i++) {
		speechRec = window[prefixes[i] + 'SpeechRecognition'];
	}
	if (!speechRec) {
		console.log('browser does not support the SpeechRecognition API. Exiting.');
		expose(null);
		return;
	}

	var listener,
		ultvoice = {
		start: function() {
			listener = new speechRec();
			listener.continuous = true;
			listener.onresult = function(ev) {
				var res = ev.results[ev.results.length-1];

				if (ultvoice.debug) console.log('results', res);

				[].forEach.call(res, function(recAlternative) {
					var words = recAlternative.transcript.trim().split(' ');
					words.forEach(function(word, wordIndex) {
						ultvoice.actions.forEach(function(action) {
							function checkTriggerWord(trigger) {
								if (word === trigger) {
									action.callback.apply(null, words.slice(wordIndex + 1));
								}
							}
							var trigger = action.trigger;
							if (Array.isArray(trigger)) {
								trigger.forEach(checkTriggerWord);
							} else {
								checkTriggerWord(trigger);
							}
						});
					});
				});

			};
			listener.start();
		},
		stop: function() {
			listener.stop();
		},
		abort: function() {
			listener.abort();
		},
		actions: [],
		debug: false
	};
	expose(ultvoice);

	function expose(value) {
		if (typeof define === "function" && define.amd) {
			define("ultvoice", [], function() { return value; });
		} else {
			window.ultvoice = value;
		}
	}
}());
