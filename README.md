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
nutty.set('name', 'my-app');

//Get the new test command
var command_test = new command('test', 'Test the CLI');

//Add the options
command_test.option({ name: 'msg', detail: 'Print a message', type: 'string', default: 'No message' });
command_test.option({ name: 'upperCase', detail: 'Print the message in upper case', type: 'boolean', default: false });

//Add the callback function
command_test.callback(function(args, opt)
{
  //Check the upperCase option
  //opt.upperCase will be a boolean because the option type is set to boolean
  if(opt.upperCase === true)
  {
    //Get the message in upper case
    opt.msg = opt.msg.toUpperCase();
  }

  //Print the test message
  console.log('Message: ' + opt.msg);
});

//Add the test command
nutty.use(command_test.build());

//No command provided
nutty.use(function(args, opt, next){ return nutty.display.error('No command provided'); });

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
my-app test --msg "My test message" --upperCase yes
Message: MY TEST MESSAGE
```


## API

### cmd = new command(name, description)

Generate a new command object. The constructor accepts two arguments:

- `name`: a string with the command name.
- `description`: a string with the command description.

### cmd.option(obj)

Add a new option parser for this command. The object must have the following keys:

- `name`: a string with the option name (**mandatory**).
- `detail`: a string with the option detail.
- `type`: a string with the option type. It can be: `string`, `boolean`, `number` or `integer`. If not used, the default option type is `string`.
- `default`: the option default value.

### cmd.callback(fn)

The function that will be invoked if the user runs this command. This function will be called with the following values:

#### arguments
An array with the arguments that didn't have an option associated with them. This is the same list that is passed to the nutty's middlewares, but without the first argument (because is used associated with the command).

#### options

An object with all the options with the format `key = value`.

It is the same object passed to the nutty's middlewares, but with the difference that all the options that matches with the options provided in `cmd.option` will be parsed and converted to the provided type.

Example:

```javascript
cmd.opt({ name: 'myOpt', type: 'number' });

//Callback
cmd.callback(function(args, opt)
{
  //Check the type of the opt.myOpt variable
  var type = typeof opt.myOpt; // --> number

  // ...
});
```

### cmd.build()

Build the command middleware to be used with the `nutty.use` method.

## License

[MIT LICENSE](./LICENSE) &copy; Josemi Juanes.
