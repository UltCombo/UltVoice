UltVoice
========

Send voice commands through the [Speech Recognition API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html)

## Usage

Include the script (either minified or development version):
```html
<script src="path/to/ultvoice.min.js"></script>
```

This will expose a global `ultvoice` object which provides the API documented below.

Now, [push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) object(s) to ultvoice's `actions` array:

```js
ultvoice.actions.push({
	trigger: 'open',
	callback: function(address) {
		location = 'http://' + address;
	}
});
```

All you need to do now is simply call `ultvoice.start()` to start listening for voice input! Then just say "open google.com" and you will be redirected to Google. `=]`

Keep reading for the API details.

## Internationalization

The `action` objects' `trigger` property accepts either a string or array. This way, you can specify an array of triggers for multiple languages:

```js
ultvoice.actions.push({
	trigger: ['open', 'abra'],
	callback: function(address) {
		location = 'http://' + address;
	}
});
ultvoice.start();
```

And now saying either "open google dot com" or "abra google ponto com" (Portuguese) will redirect the page to `http://google.com`.

This feature can also be used implement synonyms (mutliple words in a given language to trigger the same callback).

## The action object

Each element of the `ultvoice.actions` array must be an UltVoice action object. Action objects are nothing but plain JS objects which contain `trigger` and `callback` properties.

- `trigger`: a word or array of words that will trigger the `callback` function once recognized.
- `callback`: a function which receives N arguments which correspond to each word recognized after the `trigger` word.


## Example with variable arguments length

```js
ultvoice.actions.push({
	trigger: ['write', 'escreva'],
	callback: function() {
		document.body.innerHTML = '<h1>' + [].join.call(arguments, ' ') + '</h1>';
	}
});
ultvoice.start();
```
Now, everything that you say after "write" (or in Portuguese "escreva") will be printed to the page.

## Testing for browser support

The `ultvoice` object will be `null` in case the browser does not support the Speech Recognition API.

```js
if (ultvoice) {
	//yay, do awesome speech recognition
} else {
	//browser does not support speech recognition, fallback or show error/warning message
}
```

## Removing actions from `ultvoice.actions`

`ultvoice.actions` is a plain array. You can easily iterate over it, check for some criteria and remove items using [`.splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), or assign to it a [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)ed copy of itself.

## Debug

Set `ultvoice.debug = true` to get debugging info (such as every recognized speech input) printed to the console.

## Native method wrappers

Call `.stop()` to gracefully stop receiving user input, or `.abort()` to terminate input and cancel any ongoing speech recognition.

## AMD module

In case you'd like to use UltVoice as an AMD module, simply require it. In case UltVoice was `required` (e.g. by RequireJS) it will return the object instead of exposing a global variable.

```js
require.config({
    paths: {
        'ultvoice': 'path/to/ultvoice.min'
    }
});

require(['ultvoice'], function(ultvoice) {
	//work with ultvoice as normal
});
```

## Compatibility

Only Chrome has support for the Speech Recognition API thus far.

## Stability

This library is currently in development, but I'll try to keep things stable in the master branch. Note that API function/property names may change so always check the changelog before updating.

## Todo

- `trigger` string with more than one word.

Feel free to open an issue if you have ideas for useful features, or submit a PR directly if you feel like. `=]`

## Changelog

- 0.1: First revision.
