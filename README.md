# nutty-command

[![npm](https://img.shields.io/npm/v/nutty-command.svg?style=flat-square)](https://www.npmjs.com/package/nutty-command)
[![npm](https://img.shields.io/npm/dt/nutty-command.svg?style=flat-square)](https://www.npmjs.com/package/nutty-command)

> A command middleware for nutty

## Installation

```
npm install --save nutty-command
```

## Usage

```javascript
//Import dependencies
var nutty = require('nutty');
var command = require('nutty-command');

//Initialize the cli
nutty.set('name', 'test');

//Get the new test command
var command_test = new command('test', 'Test the CLI');

//Add the options
command_test.option({ name: 'msg', detail: 'Print a message', type: 'string', default: 'No message' });

//Add the callback function
command_test.callback(function(args, opt)
{
  //Print the test message
  nutty.display.info('Message: ' + opt.msg);
});

//Add the test command
nutty.use(command_test.build());

//No command provided
nutty.use(function(args, opt, next){ return nutty.display.error('No command provided'); });

//Run the CLI
nutty.run();
```
