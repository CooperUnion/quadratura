import { PythonShell } from 'python-shell';

let display = new PythonShell('test-buttons.py', {pythonOptions: ['-u']})

display.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log("message received", message);
    // process.exit(0)
})
display.on('stderr', function (stderr) {
    console.log('stderr...', stderr)
    // handle stderr (a line of text from stderr)
});
display.on('pythonError', function (pythonError) {
    console.log('pythonError...', pythonError)
    // handle stderr (a line of text from stderr)
});



console.log("starting...")
while (true) {
    //
}
