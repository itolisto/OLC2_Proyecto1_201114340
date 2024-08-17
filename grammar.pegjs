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

// No terminales