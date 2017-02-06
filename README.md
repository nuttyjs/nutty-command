# nutty-command

[![npm](https://img.shields.io/npm/v/nutty-command.svg?style=flat-square)](https://www.npmjs.com/package/nutty-command)
[![npm](https://img.shields.io/npm/dt/nutty-command.svg?style=flat-square)](https://www.npmjs.com/package/nutty-command)
[![npm](https://img.shields.io/npm/l/nutty-command.svg?style=flat-square)](https://github.com/nuttyjs/nutty-command)

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
nutty.set('name', 'my-app');

//Get the new test command
var command_test = new command('test', 'Test the CLI');

//Add the options
command_test.option({ name: 'msg', detail: 'Print a message', default: 'No message' });
command_test.option({ name: 'upperCase', detail: 'Print the message in upper case', default: false });

//Add the callback function
command_test.callback(function(args, body)
{
  //Check the upperCase option
  if(args.options.upperCase !== false)
  {
    //Get the message in upper case
    args.options.msg = args.options.msg.toUpperCase();
  }

  //Print the test message
  console.log('Message: ' + args.options.msg);
});

//Add the test command
nutty.use(command_test.build());

//No command provided
nutty.use(function(args, body, next){ return nutty.display.error('No command provided'); });

//Run the CLI
nutty.run();
```

In this example, when the user execute the `test` command of the CLI app, the provided callback fill be invoked:

```
my-app test
Message: No message
```

The user can add the `msg` option:

```
my-app test --msg "This is my message"
Message: This is my message
```

//Add with the upper case option
```
my-app test --msg "My test message" --upperCase
Message: MY TEST MESSAGE
```


## API

### cmd = new command(name, description)

Generate a new command object. The constructor accepts two arguments:

- `name`: a string with the command name. If the first argument of the CLI matches this string, then the callback function provided will be invoked.
- `description`: a string with the command description.

Example:

```javascript
var cmd = new command('test', 'Test the CLI');
```

### cmd.option(obj)

Add a new option parser for this command. The object must have the following keys:

- `name`: a string with the option name (**mandatory**).
- `detail`: a string with the option detail.
- `default`: the option default value.

Example:

```javascript
//Add an option
cmd.opt({ name: 'option', detail: 'My option', default: '' });
```

### cmd.callback(fn)

The function that will be invoked if the user runs this command. This function will be called with the same arguments described [here](https://github.com/nuttyjs/nutty#nuttyusefn), but without the `next` function.

Example:

```javascript
//Callback
cmd.callback(function(args, body)
{
  //Do your magic here
});
```

### cmd.build()

Generate the middleware to be used with the `nutty.use` method.

## License

[MIT LICENSE](./LICENSE) &copy; Josemi Juanes.
