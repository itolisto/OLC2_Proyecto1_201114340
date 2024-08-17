// Terminales

// Palabras reservadas

Types
  = "int"
  / "float"
  / "string"
  / "boolean"
  / "char"

// Otros

SingleLineComment "single line comment"
  = "//".*

MultiLineComment "multi line comment"
  = "/*"[.\n]*"*/"

_ "whitespace"
  = [ \t\n\r]*

Identifier
  = [a-zA-Z_][a-zA-Z_0-9]+

// No terminales