fetch("/read")
  .then(response => response.text())
  .then(data => {
    console.log("Cookie response from script:" + data);
    document.getElementById("from-js").innerHTML = data;
  });

window.addEventListener('load', () => {
  console.log("Worker started");
  const worker = new Worker('/webworker.js');
  worker.onmessage = (event) => {
    console.log(`Cookie response from web worker: ${event.data}`);
    document.getElementById("from-worker").innerHTML = event.data;
  };
  worker.postMessage("get");
});