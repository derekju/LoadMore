/*
The MIT License (MIT)

Copyright (c) 2013 Derek Ju

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

window.LoadMore = (function () {
	
	var
		_data,
		_start,
		_end,
		_viewportDifference
	;

	function _appendData($container, $subcontainer, start, end) {
		for (var i = start; i < end; i++) {
			if (i >= _data.length) {
				$container.off('scroll');
				break;
			}
			$subcontainer.append('<img src="' + _data[i] + '" />');
		}
	}

	return {
		bind: function (options, data, $container, $subcontainer) {
			// Check options
			_data = data;
			_start = 0;
			_end = options.hasOwnProperty('numToShow') ? parseInt(options.numToShow, 10) : 5;

			// Draw first few
			_appendData($container, $subcontainer, _start, _end);
			_viewportDifference = $subcontainer.innerHeight() - $container.innerHeight();

			if (_viewportDifference > 0) {
				$container.scroll(function () {
					var scrollValue = $(this).scrollTop();
					if (scrollValue > _viewportDifference - 100) {
						// Adjust start and end
						_start += options.numToShow;
						_end += options.numToShow;

						// Add new data to the DOM
						_appendData($container, $subcontainer, _start, _end);

						// Recalculate viewport difference
						_viewportDifference = $subcontainer.innerHeight() - $container.innerHeight();
					}
				});
			}			
		}
	};
})();