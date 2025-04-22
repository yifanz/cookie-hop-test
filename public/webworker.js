onmessage = (event) => {
    fetch('/read')
        .then(response => response.text())
        .then(data => postMessage(data));
};