//Import dependencies
var nutty = require('nutty');
var command = require('./index.js');

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
