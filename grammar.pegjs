// No terminales

Start
  = Block

Block
  = "{" _ Sentence _ "}" _ Block _
  / Variable _ Block _
  / _

Sentence
  = Additive _ Sentence _
  / Variable _ Sentence _
  / _

Additive
  = Multiplicative _ FirstLevelOperation _ Additive
  / Multiplicative

Multiplicative
  = Primary _ SecondLevelOperation _ Multiplicative
  / Primary

Primary 
  = Number
  / "(" _ Additive _ ")"

Variable
  = _ PrimitiveTypes _ Identifier _ ";"
  / _ PrimitiveTypes _ Identifier _ "=" _ Expression _ ";"
  / _ "var" _ Identifier _ "=" _ Expression _ ";"

Expression
  = [a-zA-Z_0-9.-]+ // Temporal

// Terminales

// Palabras reservadas

PrimitiveTypes
  = "int"
  / "float"
  / "string"
  / "boolean"
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
  = [a-zA-Z_][a-zA-Z_0-9]*

StringValue
  = "\"".?"\""

Number
  = Float
  / Integer

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