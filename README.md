This is a web app developed using JavaScript, jQuery, CSS, and HTML.

The html2canvas functionality (saving your image) takes more time depending on how many characters have been typed on the screen. It renders the DOM to a canvas element which is then downloaded via '.toDataURL()'. There is no way to speed up this process in the browser. A solution would be to create a standalone app outside the browser.
