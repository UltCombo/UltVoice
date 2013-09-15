(function() {
	'use strict';
	var prefixes = 'webkit moz ms o'.split(' '),
		SpeechRec = window.SpeechRecognition;
	for (var i = 0; !SpeechRec && i < prefixes.length; i++) {
		SpeechRec = window[prefixes[i] + 'SpeechRecognition'];
	}
	if (!SpeechRec) {
		console.log('UltVoice: browser does not support the SpeechRecognition API. Exiting.');
		expose(null);
		return;
	}

	var listener = new SpeechRec(),
		listening = false;
	listener.continuous = true;
	listener.addEventListener('result', function(ev) {
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
	});
	listener.addEventListener('end', function(e) {
		if (ultvoice.debug) console.log('UltVoice: ended', e);
		if (listening) listener.start();
	});

	var ultvoice = {
		listener: listener,
		start: function() {
			listening = true;
			listener.start();
		},
		stop: function() {
			listening = false;
			listener.stop();
		},
		abort: function() {
			listening = false;
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
