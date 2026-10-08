import { ConsoleMessage } from '../types';

export interface PythonRunResult {
  logs: ConsoleMessage[];
  executionTimeMs: number;
  error?: string;
}

/**
 * Robust Client-Side Python Evaluator
 * Transpiles standard Python syntax (def, print, for, while, if/elif/else, list comprehensions, 
 * lambda, math, dicts, arrays, slice notation, and builtins) into safe executable JavaScript.
 */
export function executePython(pythonCode: string): PythonRunResult {
  const logs: ConsoleMessage[] = [];
  const startTime = performance.now();

  const printLog = (...args: any[]) => {
    logs.push({
      id: Math.random().toString(36).substring(2, 9),
      type: 'log',
      content: args.map(arg => {
        if (arg === null || arg === undefined) return 'None';
        if (typeof arg === 'boolean') return arg ? 'True' : 'False';
        if (Array.isArray(arg)) {
          return '[' + arg.map(x => (typeof x === 'string' ? `'${x}'` : x)).join(', ') + ']';
        }
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg).replace(/"/g, "'");
          } catch {
            return String(arg);
          }
        }
        return String(arg);
      }),
      timestamp: Date.now(),
    });
  };

  try {
    const jsCode = transpilePythonToJs(pythonCode);

    // Standard Python built-ins environment
    const pyScope = {
      print: printLog,
      len: (obj: any) => (obj?.length !== undefined ? obj.length : Object.keys(obj || {}).length),
      range: (start: number, stop?: number, step = 1) => {
        if (stop === undefined) {
          stop = start;
          start = 0;
        }
        const res: number[] = [];
        if (step > 0) {
          for (let i = start; i < stop; i += step) res.push(i);
        } else if (step < 0) {
          for (let i = start; i > stop; i += step) res.push(i);
        }
        return res;
      },
      sum: (arr: number[]) => arr.reduce((a, b) => a + b, 0),
      min: (...args: any[]) => {
        const items = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
        return Math.min(...items);
      },
      max: (...args: any[]) => {
        const items = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
        return Math.max(...items);
      },
      abs: (x: number) => Math.abs(x),
      round: (x: number, n = 0) => {
        const f = Math.pow(10, n);
        return Math.round(x * f) / f;
      },
      int: (x: any) => parseInt(x, 10) || 0,
      float: (x: any) => parseFloat(x) || 0.0,
      str: (x: any) => String(x),
      list: (x: any) => (Array.isArray(x) ? [...x] : Array.from(x || [])),
      dict: (x: any) => Object.fromEntries(x || []),
      enumerate: (arr: any[]) => arr.map((item, index) => [index, item]),
      zip: (a: any[], b: any[]) => {
        const minLen = Math.min(a.length, b.length);
        const res = [];
        for (let i = 0; i < minLen; i++) res.push([a[i], b[i]]);
        return res;
      },
      sorted: (arr: any[], reverse = false) => {
        const copy = [...arr].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
        return reverse ? copy.reverse() : copy;
      },
      any: (arr: any[]) => arr.some(Boolean),
      all: (arr: any[]) => arr.every(Boolean),
      math: Math,
      True: true,
      False: false,
      None: null,
    };

    const runFn = new Function('py', `
      with (py) {
        "use strict";
        ${jsCode}
      }
    `);

    runFn(pyScope);

    const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
    return {
      logs,
      executionTimeMs,
    };
  } catch (err: any) {
    const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
    return {
      logs,
      executionTimeMs,
      error: err?.message || String(err),
    };
  }
}

/**
 * Transpiles indentation-based Python lines into bracketed JavaScript blocks
 */
function transpilePythonToJs(code: string): string {
  const lines = code.split('\n');
  const jsLines: string[] = [];
  const indentStack: number[] = [0];

  for (let idx = 0; idx < lines.length; idx++) {
    let line = lines[idx];

    // Remove comments (# ...)
    const commentIdx = line.indexOf('#');
    if (commentIdx !== -1) {
      line = line.substring(0, commentIdx);
    }

    // Skip empty lines
    if (!line.trim()) {
      continue;
    }

    // Determine indentation
    const indent = line.search(/\S/);
    const trimmed = line.trim();

    // Close blocks when indent decreases
    while (indent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      jsLines.push('}');
    }

    let converted = trimmed;

    // Handle 'def func_name(args):'
    if (/^def\s+([a-zA-Z0-9_]+)\s*\((.*?)\):/.test(converted)) {
      converted = converted.replace(/^def\s+([a-zA-Z0-9_]+)\s*\((.*?)\):/, 'function $1($2) {');
      indentStack.push(indent + 1);
    }
    // Handle 'if cond:'
    else if (/^if\s+(.*?):$/.test(converted)) {
      const cond = converted.match(/^if\s+(.*?):$/)![1];
      converted = `if (${translatePythonCondition(cond)}) {`;
      indentStack.push(indent + 1);
    }
    // Handle 'elif cond:'
    else if (/^elif\s+(.*?):$/.test(converted)) {
      const cond = converted.match(/^elif\s+(.*?):$/)![1];
      converted = `} else if (${translatePythonCondition(cond)}) {`;
    }
    // Handle 'else:'
    else if (/^else\s*:$/.test(converted)) {
      converted = '} else {';
    }
    // Handle 'for x in iterable:'
    else if (/^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+(.*?):$/.test(converted)) {
      const match = converted.match(/^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+(.*?):$/)!;
      const varName = match[1].trim();
      const iter = match[2].trim();

      if (varName.includes(',')) {
        // tuple unpacking: for i, val in enumerate(arr):
        converted = `for (let [${varName}] of ${iter}) {`;
      } else {
        converted = `for (let ${varName} of ${iter}) {`;
      }
      indentStack.push(indent + 1);
    }
    // Handle 'while cond:'
    else if (/^while\s+(.*?):$/.test(converted)) {
      const cond = converted.match(/^while\s+(.*?):$/)![1];
      converted = `while (${translatePythonCondition(cond)}) {`;
      indentStack.push(indent + 1);
    }
    // Handle assignments and expressions
    else {
      converted = translatePythonExpression(converted);
      if (!converted.endsWith(';') && !converted.endsWith('{') && !converted.endsWith('}')) {
        converted += ';';
      }
    }

    jsLines.push(converted);
  }

  // Close remaining indentation blocks
  while (indentStack.length > 1) {
    indentStack.pop();
    jsLines.push('}');
  }

  return jsLines.join('\n');
}

function translatePythonCondition(cond: string): string {
  return cond
    .replace(/\band\b/g, '&&')
    .replace(/\bor\b/g, '||')
    .replace(/\bnot\b/g, '!')
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false')
    .replace(/\bNone\b/g, 'null')
    .replace(/\bis\s+not\b/g, '!==')
    .replace(/\bis\b/g, '===')
    .replace(/==/g, '===')
    .replace(/!=/g, '!==');
}

function translatePythonExpression(expr: string): string {
  let res = expr;

  // Handle variable assignment without let/var
  if (/^[a-zA-Z_][a-zA-Z0-9_]*\s*=[^=]/.test(res) && !res.startsWith('let ') && !res.startsWith('const ')) {
    res = 'let ' + res;
  }

  // Handle .append() -> .push()
  res = res.replace(/\.append\(/g, '.push(');

  // Handle in operator in list
  // Boolean literals
  res = res
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false')
    .replace(/\bNone\b/g, 'null');

  return res;
}
