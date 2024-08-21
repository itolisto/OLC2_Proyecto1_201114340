// No terminales

Start
  = Block

Block
  = "{" _ Sentence _ "}"

Sentence
  = Additive

Additive
  = Multiplicative _ FirstLevelOperation _ Additive
  / Multiplicative

Multiplicative
  = Primary _ SecondLevelOperation _ Multiplicative
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
  = [a-zA-Z_][a-zA-Z_0-9]+

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