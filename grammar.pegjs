// No terminales

Start
  = File
  
File
  = Block File
  / Variable File
  / _

Block
  = _ "{" _ File _ "}" _

Variable
  = _ PrimitiveTypes _ Identifier _ ";"
  / _ PrimitiveTypes _ Identifier _ "=" _ Expression _ ";"
  / _ "var" _ Identifier _ "=" _ Expression _ ";"
  / _ Identifier _ "=" _ Expression _ ";"

Expression
  = Additive
  / StringValue
  / CharValue
  / BooleanValue
  / Number

Additive
  = Multiplicative _ FirstLevelOperation _ Additive
  / Multiplicative

Multiplicative
  = Module _ SecondLevelOperation _ Multiplicative
  / Module

Module
  = Primary _ ThirdLevelOperation _ Module
  / Primary

Primary 
  = Number
  / "(" _ Additive _ ")"

// Terminales

// Palabras reservadas

PrimitiveTypes
  = "int"
  / "float"
  / "string"
  / "bool"
  / "char"

NonPrimitiveTypes
  = "Array"
  / "Struct"

ReservedKeywords
  = "null"

// Otros

SingleLineComment "single line comment"
  = "//".*

MultiLineComment "multi line comment"
  = "/*"[.\n]*"*/"

_ "whitespace"
  = [ \t\n\r]*

Identifier
  = required:[a-zA-Z_]optional:[a-zA-Z_0-9]* { return required + optional.join("");  }

BooleanValue
  = "false" { return false; }
  / "true" { return true; }

StringValue
  = '"'content:(![\"].)+'"' { return content.flat().filter(item => item !== undefined).join(""); }

CharValue
  = "‘"char:[a-zA-Z0-9]"’" { return char; }

Number
  = float:Float { return float; }
  / integer:Integer { return integer; }

Integer
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

Float
  = digits:[0-9]+"."decimals:[0-9]+ { return parseFloat(digits.join("") + "." + decimals.join(""), 10); }

FirstLevelOperation
  = "+"
  / "-"

SecondLevelOperation
  = "*"
  / "/"

ThirdLevelOperation
  = "%"