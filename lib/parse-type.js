//Parse a type
module.exports = function(value, type)
{
  //Check for integer value
  if(type === 'integer'){ return parseInt(value); }

  //Check for number value
  if(type === 'number'){ return Number(value); }

  //Check for boolean
  if(type === 'boolean')
  {
    //Parse the boolean and return
    return ( value === true || value === 'true' || value === '1' || value === 'yes' || value === 'y' ) ? true : false;
  }

  //Return the default value
  return value;
};
