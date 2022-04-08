import {PythonShell} from 'python-shell';

PythonShell.run('display.py', null, function (err) {
  if (err) throw err;
  console.log('finished');
});
