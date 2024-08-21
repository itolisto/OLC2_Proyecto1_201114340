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
  = [0-9]+

Float
  = [0-9]+"."[0-9]+

FirstLevelOperation
  = "+"
  / "-"

SecondLevelOperation
  = "*"
  / "/"