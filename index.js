//Import dependencies
var util = require('nutty-util');

//Command wrapper
var command = function(name, detail)
{
  //Initialize the command name
  this._name = (typeof name === 'string') ? name : '';

  //Initialize the command detail
  this._detail = (typeof detail === 'string') ? detail : '';

  //Initialize the callback function
  this._callback = null;

  //Initialize the command options
  this._options = [];

  //Return this
  return this;
};

//Add a new command option
command.prototype.option = function(opt)
{
  //Check for undefined option
  if(typeof opt !== 'object'){ return this; }

  //Check the option name
  if(typeof opt.name !== 'string'){ throw new Error('Undefined option name'); }

  //Check the option detail
  if(typeof opt.detail !== 'string'){ opt.detail = ''; }

  //Check type
  if(typeof opt.type !== 'string'){ opt.type = 'string'; }

  //Save the option
  this._options.push(opt);

  //Return this
  return this;
};

//Add the command callback
command.prototype.callback = function(fn)
{
  //Check the callback function
  if(typeof fn !== 'function'){ return this; }

  //Save the function
  this._callback = fn;

  //Return this
  return this;
};

//Build the command
command.prototype.build = function()
{
  //Save this
  var self = this;

  //Return the middleware function
  return function(args, next)
  {
    //Check for undefined callback
    if(typeof self._callback !== 'function'){ return next(); }

    //Check the first argument
    if(args.arguments[0] !== self._name){ return next(); }

    //Read all the options
    for(var i = 0; i < self._options.length; i++)
    {
      //Get the command options
      var option = self._options[i];

      //Chek if is not used
      if(typeof args.options[option.name] === 'undefined')
      {
        //Set the default value
        if(typeof option.default !== 'undefined'){ args.options[option.name] = option.default; }

        //Continue
        continue;
      }

      //Check for boolean
      if(option.type === 'boolean'){ args.options[option.name] = util.parse.bool(args.options[option.name]); }

      //Check for integer
      else if(option.type === 'integer'){ args.options[option.name] = util.parse.int(args.options[option.name]); }

      //Check for number
      else if(option.type === 'number'){ args.options[option.name] = util.parse.number(args.options[option.name]); }
    }

    //Do the callback
    return self._callback(args);
  };
};

//Exports to node
module.exports = command;
