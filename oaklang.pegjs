{
  import { NumberNode } from "oaklang.nodes.impl.js";

  const createNode = (type, props) => {
    const types = {
      'number': NumberNode
    }
    const node = new types[type](location(), props);
    return node;
  }
}

// No terminales

Start
  = stmnt:Statement* { return stmnt; }
  
Statement
  = block:Block { return block; }
  / stmnt:IfStatement { return stmnt; }
  / stmnt:SwitchStatement { return stmnt; }
  / stmnt:WhileStatement { return stmnt; }
  / stmnt:ForStatement { return stmnt; }
  / _ "break;" { return; }
  / _ "continue;" { return ; }
  / _ "return" _ expr:Expression _ ";" { return expr; }
  / assign:Assignment { return assign; }

// ======================================================================

Block
  = _ "{" _ stmnt:Statement* _ "}" _ { return stmnt; }

// ======================================================================

IfStatement
  = _ "if" _ "(" _ expr:Expression _ ")" _ block:Block _ elseIfStmnt:ElseIfStatement* _ elseStmnt:ElseStatement? { return expr + block + elseIfStmnt + elseStmnt; }

ElseIfStatement
  = _ "else if" _ "(" _ expr:Expression _ ")" _ block:Block { return expr + block; }

ElseStatement
  = _ "else" _ block:Block { return block; }

// ======================================================================

SwitchStatement
  = _ "switch" _ "(" _ expr:Expression _ ")" _ "{" _ clauses:SwitchClauses _ "}" _ { return expr + clauses; }

SwitchClauses
  = "case" _ expr:Expression ":" _ stmnt:Statement* _ ("break" ";")? _ clauses:SwitchClauses { return expr + stmnt + clauses; }
  / "default" ":" _ stmnt:Statement* _ { return stmnt; }

// ======================================================================

WhileStatement
  = _ "while" _ "(" _ expr:Expression _ ")" _ "{" _ stmnt:Statement* _ "}" _ { return expr + stmnt; }

// ======================================================================

ForStatement
  = _ "for" _ "(" _ condition:ForCondition _ ")" _ "{" _ stmnt:Statement* _ "}" _ { return condition + stmnt; }

ForCondition
  = type:PrimitiveTypes _ id:Identifier _ "=" _ expr:Expression _ ";" _ idOp:Identifier _ comparation:ComparationOperator _ compExpr:Expression _ ";" _ idVar:Identifier _ assign:AssignationAutomaticOperator _ { return type + id + expr + idOp + comparation + compExpr + idVar + assign; }
  / type:PrimitiveTypes _ id:Identifier _ ":" _ from:Identifier { return type + id + from; }

// ======================================================================

Assignment
  = _ type:PrimitiveTypes dimensions:ArrayDimension _ identifier:Identifier _ ";" _ { return type + dimensions + identifier; }
  / _ type:PrimitiveTypes dimensions:ArrayDimension _ identifier:Identifier _ "=" _ expression:Expression _ ";" _ { return type + dimensions + identifier + expression; }
  / _ "var" _ identifier:Identifier _ assignment:AssignationOperator _ expression:Expression _ ";" _ { return identifier + assignment + expression; }
  / _ identifier:Identifier dimensions:ArrayDimensionAccess _ assignment:AssignationOperator _ expression:Expression _ ";" _ { return identifier + dimensions + assignment + expression; }

ArrayDimension
  = dimensions:("[]")* { return dimensions.length; }

ArrayDimensionAccess
  = dimensions:("[" Integer "]")* { return dimensions.length; }

// ======================================================================

Expression
  = expr:LogicalTernaryExpr { return expr; }

LogicalTernaryExpr
  = condition:LogicalOrExpr _ "?" _ expr1:Expression _ ":" _ expr2:Expression { return condition + expr1 + expr2; }
  / condition:LogicalOrExpr { return condition; }

LogicalOrExpr
  = left:LogicalAndExpr _ "||" _ right:LogicalAndExpr { return { type: "LogicalOr", left: left, right: right }; }
  / left:LogicalAndExpr { return left; }

LogicalAndExpr
  = left:EqualityExpr _ "&&" _ right:EqualityExpr { return { type: "LogicalAnd", left: left, right: right }; }
  / left:EqualityExpr { return left; }

EqualityExpr
  = left:RelationalExpr _ ("==" / "!=") _ right:RelationalExpr { return { type: "Equality", operator: text(), left: left, right: right }; }
  / left:RelationalExpr { return left; }

RelationalExpr
  = left:AdditiveExpr _ ("<=" / ">=" / "<" / ">") _ right:AdditiveExpr { return { type: "Relational", operator: text(), left: left, right: right }; }
  / left:AdditiveExpr { return left; }

AdditiveExpr
  = left:MultiplicativeExpr _ ("+" / "-") _ right:MultiplicativeExpr { return { type: "Additive", operator: text(), left: left, right: right }; }
  / left:MultiplicativeExpr { return left; }

MultiplicativeExpr
  = left:UnaryExpr ( _ ("*" / "/" / "%") _ right:UnaryExpr { return { type: "Multiplicative", operator: text(), left: left, right: right }; })*

UnaryExpr
  = ("!" / "-") expr:Primary { return { type: "Unary", operator: text(), expression: expr }; }
  / primary:Primary { return primary; }

Primary 
  = "new" _ instanceOf:InstanceOf { return instanceOf; }
  / "null" { return null; }
  / value:NumberValue { return value; }
  / value:Identifier { return value; }
  / value:Literal { return value; }
  / "{" _ args:(Primary _ (",")?)+ _ "}" { return args.flatMap(x => x.flat()); }
  / "(" _ expr:LogicalTernaryExpr _ ")" { return expr; }

Literal
  = value:StringValue { return value; }
  / value:CharValue { return value; }
  / value:BooleanValue { return value; }
  / value:NumberValue { return value; }

InstanceOf
  = type:AnyType dimensions:ArrayDimensionAccess { return type + dimensions; }
  / type:AnyType "{"  "}" { return type; }

AnyType
  = identifier:Identifier { return identifier; }
  / type:PrimitiveTypes { return type; }

// Terminales

// Otros

SingleLineComment
  = "//".*

MultiLineComment
  = "/*"[.\n]*"*/"

_ "whitespace"
  = [ \t\n\r]* { return ""; }

Identifier
  = required:[a-zA-Z_]optional:[a-zA-Z_0-9]* { return required + optional.join("");  }

BooleanValue
  = "false" { return false; }
  / "true" { return true; }

StringValue
  = '"'content:(![\"].)+'"' { return content.flat().filter(item => item !== undefined).join(""); }

CharValue
  = "'"char:[a-zA-Z0-9]"'" { return char; }

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

AssignationAutomaticOperator
  = "++" { return "++"; }
  / "--" { return "--"; }

ComparationOperator
  = "==" { return "=="; }
  / "!=" { return "!="; }
  / ">=" { return ">="; }
  / "<=" { return "<="; }
  / ">" { return ">"; }
  / "<" { return "<"; }

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
