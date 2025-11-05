---
categories:
- Compiler
createdAt: '2024-05-30'
description: '>[!CAUTION]'
tags:
- Compiler
title: HW2 Review
---

# HW2 Review


## Before you start the project:

>[!CAUTION]
> - **REMOVE** the `main` function in `lex` file
> - **REMOVE** the unwanted printing log from the `lex` file
> - **IMPORT** `y.tab.h` in the lex file
> ```c
> %{ import "y.tab.h" %}
> ``` 

## General Format for Yacc file

```c
%{
 C Declaration
%}
 yacc Declaration
%%
 Grammar Rules
%%
 Additional C code
```

## What's the function used to start yacc parser?

```c
yyparse();
```

## What are \$\$, \$1, \$2...
Given this grammar pattern:
```c
expression: 
 // Expressions involving addition, subtraction, OR, AND, and comparison operators
 expression PLUS term { check_expression(); }
```
- `$$`: expression (LHS)
- `$1`: expression (RHS)
- `$2`: PLUS
- `$3`: term


## What does the lex parser do in this yacc project?
- It acts as a lexical analyzer to parse the source code into tokens. The tokens are then return to the `yacc` parser to perform `syntactical` and `semantic` analysis

- To have the `yacc` parser read the token parsed, remember to `return` the `token`.

```c
%{
#include<stdio.h>
#include"y.tab.h"
%}

AND [Aa][Nn][Dd]

%%

{AND} { check_reserved_word(); return AND;}
```
- This way, when `lexer` parses the `AND` token, the `yacc` parser can use it.

## How to declare variables in yacc parser and use them in lexer

- First, you define the variables with the `%union` tag in `yacc` file

```c
%union {
 char* strval;
 enum { TYPE_STRING, TYPE_CHAR, TYPE_INT, TYPE_REAL, TYPE_BOOLEAN, TYPE_ARRAY } dtype;
 struct Node* nodeval;
}
```

## How do you handle variable declarations?

### Custom Data Structure to Store declared variables

> [!TIP]
> This data structure is not required to be `stack`. But I find `stack` is easier to implement for me. 

- Define and write a `stack` in `c`

```c
#ifndef STACK_H
#define STACK_H
#include <stdbool.h>
typedef struct Node Node;
typedef struct Stack Stack;
struct Node {
 char *data;
 int type;
 bool is_array;
 Node *next;
};

struct Stack {
 Node *head;
 void (*push)(Stack *self, const char *data);
 Node *(*pop)(Stack *self);
 Node *(*search)(Stack *self, const char *data);
};

extern void destroy_stack(Stack *self);
extern void init_stack(Stack **self);
extern Node *init_node(const char *data);

#endif
```

```c
#include "stack.h"
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// a helper function to ensure that calloc does not return NULL
static void *must_calloc(size_t nmemb, size_t size) {
 void *ptr = calloc(nmemb, size);
 if (ptr == NULL) {
 fprintf(stderr, "calloc failed\n");
 exit(EXIT_FAILURE);
 }
 return ptr;
}

Node *init_node(const char *data) {
 Node *newnode = (Node *)must_calloc(1, sizeof(Node));
 newnode->data = (char *)must_calloc(1, strlen(data));
 newnode->type = 0;
 newnode->is_array = false;
 memcpy(newnode->data, data, strlen(data));
 newnode->next = NULL;
 return newnode;
}

static void free_node(Node *node) {
 free(node->data);
 free(node);
}

static void push(Stack *self, const char *data) {
 Node *newnode = init_node(data);
 newnode->next = self->head;
 self->head = newnode;
}

static Node *pop(Stack *self) {
 if (self->head == NULL) {
 return NULL;
 }
 Node *tmp = self->head;
 self->head = self->head->next;
 return tmp;
}

static Node *search(Stack *self, const char *data) {
 Node *current = self->head;
 while (current!= NULL) {
 if (strcmp(current->data, data) == 0) {
 return current;
 }
 current = current->next;
 }
 return NULL;
}

void destroy_stack(Stack *stack) {
 while (stack->head!= NULL) {
 Node *tmp = stack->head;
 stack->head = stack->head->next;
 free_node(tmp);
 }
 free(stack);
}

void init_stack(Stack **self) {
 *self = (Stack *)must_calloc(1, sizeof(Stack));
 (*self)->head = NULL;
 (*self)->push = &push;
 (*self)->pop = &pop;
 (*self)->search = &search;
}
```

### Lexer

- In the `lex` file, when a data type is parsed, return its corresponding `enum` serial number defined in `yacc`'s `union` to indicate its data type.

```c
%%
 {DATA_TYPE} { check_data_type(); return DATA_TYPE;}
%%
 void check_data_type()
 {
 check_print_header();
 printf("%s", yytext);
 if(yytext[0] == 's' || yytext[0] == 'S') {
 yylval.dtype = 0;
 } else if(yytext[0] == 'c' || yytext[0] == 'C') {
 yylval.dtype = 1;
 } else if(yytext[0] == 'i' || yytext[0] == 'I') {
 yylval.dtype = 2;
 } else if(yytext[0] == 'r' || yytext[0] == 'R') {
 yylval.dtype = 3;
 } else if(yytext[0] == 'b' || yytext[0] == 'B') {
 yylval.dtype = 4;
 }
 char_count += yyleng;
 token_count++;
 cur_char += yyleng;
 }
```

### Yacc

- Store the parsed `token` in `stack` when yacc recognized the pattern as `declaration`

```c
%union {
 char* strval;
 enum { TYPE_STRING, TYPE_CHAR, TYPE_INT, TYPE_REAL, TYPE_BOOLEAN, TYPE_ARRAY } dtype;
 struct Node* nodeval;
}
%%
 
declaration: identifier_list COLON type { store_identifiers(); destroy_stack(identifier_tmp_stack); init_stack(&identifier_tmp_stack);}
 | identifier_list COLON { yyerror("sytax error: data type missing"); }
 | error { yyerror(yymsg); }
;

identifier_list: IDENTIFIER { identifier_tmp_stack->push(identifier_tmp_stack, $1); }
 | identifier_list COMMA IDENTIFIER { identifier_tmp_stack->push(identifier_tmp_stack, $3);}
;

type: DATA_TYPE { 
 Node* tmp = identifier_tmp_stack->head;
 while(tmp!= NULL) {
 tmp->type = $1;
 tmp = tmp->next;
 }
 } 
 | array_type 
;
... 
```

> [!WARNING]
> 2 stacks are required here since you need to have a temporary one to store the identifiers on the current line. Should an error occur, you would not copy the ids from the temporary stack to your valid id stack. 

## If an error occurs, how to do error recovery 

- Add `error` grammar pattern as the last pattern and call the `yyerror` function
- Or create a specific grammar pattern and call the `yyerror` function

```c
declaration: identifier_list COLON type {
 store_identifiers();
 destroy_stack(identifier_tmp_stack);
 init_stack(&identifier_tmp_stack);
 }
 | identifier_list COLON { yyerror("sytax error: data type missing"); }
 | error { yyerror(yymsg); } // here is the error pattern
;
```

> [!NOTE]
> - If you want to use the default message, call the `yyerror` with `yymsg` as the argument.
> - If you want to use *customized* message, call the `yyerror` with your own message string.

## How to check if the operations are valid

- Basically `expressions` can be broken down into the following grammar patterns

```c
expression_list: 
 // A single expression in the write statement
 expression { destroy_stack(expression_stack); init_stack(&expression_stack); }
 // Multiple expressions in the write statement separated by commas
 | expression_list COMMA expression { destroy_stack(expression_stack); init_stack(&expression_stack); }
;

expression: 
 // Expressions involving addition, subtraction, OR, AND, and comparison operators
 expression PLUS term { check_expression(); }
 | expression MINUS term { check_expression(); }
 | expression OR term { check_expression(); }
 | expression AND term { check_expression(); }
 | expression EQUAL term { check_expression(); }
 | expression LESS_THAN term { check_expression(); }
 | expression GREATER_THAN term { check_expression(); }
 | expression LESS_THAN_EQUAL term { check_expression(); }
 | expression GREATER_THAN_EQUAL term { check_expression(); }
 | expression NOT_EQUAL term { check_expression(); }
 | NOT expression { check_expression(); }
 // Single term expression
 | term 
;

term: 
 // Term involving multiplication
 term MULTIPLY factor {
 if($3) {
 expression_stack->push(expression_stack, $3->data);
 expression_stack->head->type = $3->type;
 }
 } 
 // Term involving division
 | term DIVIDE factor {
 if($3) {
 expression_stack->push(expression_stack, $3->data);
 expression_stack->head->type = $3->type;
 }
 } 
 // Term involving modulus
 | term MOD factor {
 if($3) {
 expression_stack->push(expression_stack, $3->data);
 expression_stack->head->type = $3->type;
 }
 }
 // Single factor term
 | factor { 
 if($1) {
 expression_stack->push(expression_stack, $1->data);
 expression_stack->head->type = $1->type;
 }
 }
;

factor: 
 // Integer factor
 INTEGER { $$ = init_node($1); $$->type = TYPE_INT; } 
 // Digit factor
 | DIGIT { $$ = init_node($1); $$->type = TYPE_INT;}
 // Identifier factor, check if declared
 | IDENTIFIER { 
 check_identifier($1);
 $$ = identifier_stack->search(identifier_stack, $1);
 }
 // Array element factor, check if identifier is declared
 | IDENTIFIER LBRACKET expression RBRACKET { 
 check_identifier($1);
 $$ = identifier_stack->search(identifier_stack, $1);
 }
 // String factor
 | STRING { $$ = init_node($1); $$->type = TYPE_STRING; }
 // Real number factor
 | REAL_NUM { $$ = init_node($1); $$->type = TYPE_REAL; }
 // Boolean factor
 | BOOLEAN { $$ = init_node($1); $$->type = TYPE_BOOLEAN; }
 // Parenthesized expression
 | LPAREN expression RPAREN { $$ = $2; }
;
```

- Whenever an expression starts, you need to:
 1. Clean the old expression stack
 2. Create a new expression stack 
- When the pattern is matched to the operand level
 1. Assign the value of the pattern to be a new `node`
 2. Set the new `node`'s data type based on the operand pattern it matches
- Push the `factor`'s value to expression stack and set the head's data type to `head`'s data type
- Call `check_expression` whenever a grammar pattern needs `expression`
 - the `check_expression` function ensures each `factor` in the `expressio`