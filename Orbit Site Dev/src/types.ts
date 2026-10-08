export type EditorMode = 'sandbox' | 'web' | 'python' | 'sql' | 'challenges';

export type Language = 'javascript' | 'typescript' | 'html' | 'css' | 'python' | 'sql' | 'json' | 'markdown';

export interface CodeFile {
  id: string;
  name: string;
  language: Language;
  content: string;
  isReadOnly?: boolean;
}

export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'table';

export interface ConsoleMessage {
  id: string;
  type: LogLevel;
  content: any[];
  timestamp: number;
}

export interface TestCase {
  id: string;
  input: string;
  expected: string;
  description: string;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Легкая' | 'Средняя' | 'Сложная';
  category: string;
  description: string;
  initialCode: string;
  testCases: TestCase[];
  solutionExplanation?: string;
}

export interface SqlQueryResult {
  columns: string[];
  rows: (string | number | null)[][];
  affectedRows?: number;
  executionTimeMs: number;
  error?: string;
}

export interface ProjectTemplate {
  id: string;
  title: string;
  description: string;
  mode: EditorMode;
  files: CodeFile[];
  activeFileId: string;
}

export interface EditorSettings {
  fontSize: number;
  theme: 'dark' | 'monokai' | 'nord' | 'dracula';
  tabSize: number;
  wordWrap: boolean;
  autoRunWeb: boolean;
  lineNumbers: boolean;
}
