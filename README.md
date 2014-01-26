bootstrap.pophover.js
=====================

This extension allows users to hover over the popover and interact with its contents (e.g. buttons).

Usage
-----
The component can be used almost in the same way as the built-in popover component:
```javascript
$('#example').pophover({
    placement: 'bottom',
    content: '<a class="alert btn btn-default">Click me</a>'
});

$(document).on('click', '.alert', function() {
    alert('You clicked a button in a popover.');
});
```

See a demo on [JSFiddle](http://jsfiddle.net/XnHLQ/).

License
-------
MIT
