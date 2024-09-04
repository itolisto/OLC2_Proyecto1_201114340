// No terminales

Start
  = Statement*
  
Statement
  = Block
  / IfStatement
  / Assignment

// ======================================================================

Block
  = _ "{" _ Statement* _ "}" _

// ======================================================================

IfStatement
  = "if" _ "(" _ Expression _ ")" _ Block _ ElseIfStatement* _ ElseStatement?

ElseIfStatement
  = "else if" _ "(" _ Expression _ ")" _ Block

ElseStatement
  = "else" _ Block

// ======================================================================

Assignment
  = _ PrimitiveTypes _ Identifier _ ";"
  / _ PrimitiveTypes _ Identifier _ "=" _ Expression _ ";"
  / _ "var" _ Identifier _ AssignationOperator _ Expression _ ";"
  / _ Identifier _ AssignationOperator _ Expression _ ";"

// ======================================================================

Expression
  = LogicalTernaryExpr

LogicalTernaryExpr
  = condition:LogicalOrExpr _ "?" _ expr1:Expression _ ":" _ expr2:Expression
  / condition:LogicalOrExpr

LogicalOrExpr
  = left:LogicalAndExpr _ "||" _ right:LogicalAndExpr { return { type: "LogicalOr", left: left, right: right }; }
  / left:LogicalAndExpr

LogicalAndExpr
  = left:EqualityExpr _ "&&" _ right:EqualityExpr { return { type: "LogicalAnd", left: left, right: right }; }
  / left:EqualityExpr

EqualityExpr
  = left:RelationalExpr _ ("==" / "!=") _ right:RelationalExpr { return { type: "Equality", operator: text(), left: left, right: right }; }
  / left:RelationalExpr

RelationalExpr
  = left:AdditiveExpr _ ("<=" / ">=" / "<" / ">") _ right:AdditiveExpr { return { type: "Relational", operator: text(), left: left, right: right }; }
  / left:AdditiveExpr

AdditiveExpr
  = left:MultiplicativeExpr _ ("+" / "-") _ right:MultiplicativeExpr { return { type: "Additive", operator: text(), left: left, right: right }; }
  / left:MultiplicativeExpr

MultiplicativeExpr
  = left:UnaryExpr ( _ ("*" / "/" / "%") _ right:UnaryExpr { return { type: "Multiplicative", operator: text(), left: left, right: right }; })*

UnaryExpr
  = ("!" / "-") expr:Primary { return { type: "Unary", operator: text(), expression: expr }; }
  / Primary

Primary 
  = NumberValue
  / Identifier
  / Literal
  / "(" _ LogicalTernaryExpr _ ")"

Literal
  = StringValue
  / CharValue
  / BooleanValue
  / NumberValue

// Terminales

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

NumberValue
  = float:Float { return float; }
  / integer:Integer { return integer; }

Integer
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

Float
  = digits:[0-9]+"."decimals:[0-9]+ { return parseFloat(digits.join("") + "." + decimals.join(""), 10); }

FirstLevelOperation
  = "+" { return "+"; }
  / "-" { return "-"; }

SecondLevelOperation
  = "*" { return "*"; }
  / "/" { return "/"; }

ThirdLevelOperation
  = "%" { return "%"; }

AssignationOperator
  = "=" { return "="; }
  / "+=" { return "+="; }
  / "-=" { return "-="; }

ComparationOperator
  = "==" { return "=="; }
  / "!=" { return "!="; }
  / ">" { return ">"; }
  / "<" { return "<"; }
  / ">=" { return ">="; }
  / "<=" { return "<="; }

LogicalOperator
  = "&&" { return "&&"; }
  / "||" { return "||"; }
  / "!" { return "!"; }

// Palabras reservadas

PrimitiveTypes
  = "int" { return "int"; }
  / "float" { return "float"; }
  / "string" { return "string"; }
  / "bool" { return "bool"; }
  / "char" { return "char"; }

NonPrimitiveTypes
  = "Array" { return ""; }
  / "Struct" { return ""; }

ReservedKeywords
  = "null"