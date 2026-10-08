import { ConsoleMessage, LogLevel } from '../types';

export interface RunResult {
  logs: ConsoleMessage[];
  executionTimeMs: number;
  returnValue?: any;
  error?: string;
}

export function executeJavaScript(code: string): Promise<RunResult> {
  return new Promise((resolve) => {
    const logs: ConsoleMessage[] = [];
    const startTime = performance.now();

    const pushLog = (type: LogLevel, ...args: any[]) => {
      logs.push({
        id: Math.random().toString(36).substring(2, 9),
        type,
        content: args.map(arg => {
          if (arg === undefined) return 'undefined';
          if (arg === null) return 'null';
          if (typeof arg === 'function') return arg.toString();
          if (arg instanceof Error) return `${arg.name}: ${arg.message}`;
          if (typeof arg === 'object') {
            try {
              return JSON.parse(JSON.stringify(arg));
            } catch {
              return String(arg);
            }
          }
          return arg;
        }),
        timestamp: Date.now(),
      });
    };

    // Custom console wrapper
    const customConsole = {
      log: (...args: any[]) => pushLog('log', ...args),
      info: (...args: any[]) => pushLog('info', ...args),
      warn: (...args: any[]) => pushLog('warn', ...args),
      error: (...args: any[]) => pushLog('error', ...args),
      table: (...args: any[]) => pushLog('table', ...args),
      clear: () => { logs.length = 0; },
      dir: (...args: any[]) => pushLog('log', ...args),
      assert: (condition: boolean, ...args: any[]) => {
        if (!condition) pushLog('error', 'Assertion failed:', ...args);
      },
    };

    try {
      // Create a scoped sandboxed execution
      // We pass customConsole as console
      const runnerFn = new Function('console', `
        "use strict";
        try {
          ${code}
        } catch (err) {
          console.error(err);
          throw err;
        }
      `);

      const res = runnerFn(customConsole);
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

      resolve({
        logs,
        executionTimeMs,
        returnValue: res,
      });
    } catch (err: any) {
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
      resolve({
        logs,
        executionTimeMs,
        error: err?.message || String(err),
      });
    }
  });
}
