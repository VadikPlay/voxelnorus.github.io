import { SqlQueryResult } from '../types';

interface TableSchema {
  name: string;
  columns: string[];
  rows: Record<string, any>[];
}

class InMemorySqlEngine {
  private tables: Map<string, TableSchema> = new Map();

  constructor() {
    this.seedDefaultDatabase();
  }

  public reset() {
    this.tables.clear();
    this.seedDefaultDatabase();
  }

  public seedDefaultDatabase() {
    this.tables.set('users', {
      name: 'users',
      columns: ['id', 'name', 'email', 'role', 'created_at'],
      rows: [
        { id: 1, name: 'Алексей Смирнов', email: 'alex@example.com', role: 'admin', created_at: '2026-01-15' },
        { id: 2, name: 'Елена Кузнецова', email: 'elena@example.com', role: 'developer', created_at: '2026-02-01' },
        { id: 3, name: 'Дмитрий Попов', email: 'dmitry@example.com', role: 'developer', created_at: '2026-02-14' },
        { id: 4, name: 'Анна Васильева', email: 'anna@example.com', role: 'designer', created_at: '2026-03-05' },
        { id: 5, name: 'Иван Морозов', email: 'ivan@example.com', role: 'manager', created_at: '2026-03-12' },
      ],
    });

    this.tables.set('projects', {
      name: 'projects',
      columns: ['id', 'user_id', 'title', 'budget', 'status'],
      rows: [
        { id: 101, user_id: 1, title: 'Релиз CodeForge v2.0', budget: 450000, status: 'completed' },
        { id: 102, user_id: 2, title: 'Оптимизация компилятора', budget: 280000, status: 'in_progress' },
        { id: 103, user_id: 3, title: 'Аналитический модуль', budget: 320000, status: 'in_progress' },
        { id: 104, user_id: 4, title: 'Редизайн дизайн-системы', budget: 190000, status: 'review' },
        { id: 105, user_id: 2, title: 'CI/CD Автоматизация', budget: 150000, status: 'completed' },
      ],
    });
  }

  public execute(sqlQuery: string): SqlQueryResult {
    const startTime = performance.now();
    const cleanSql = sqlQuery.trim();

    if (!cleanSql) {
      return {
        columns: [],
        rows: [],
        executionTimeMs: 0,
      };
    }

    try {
      // Split multiple statements by semicolon
      const statements = cleanSql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      let lastResult: SqlQueryResult = {
        columns: [],
        rows: [],
        executionTimeMs: 0,
      };

      for (const statement of statements) {
        lastResult = this.executeSingleStatement(statement);
      }

      lastResult.executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
      return lastResult;
    } catch (err: any) {
      return {
        columns: [],
        rows: [],
        executionTimeMs: Math.round((performance.now() - startTime) * 100) / 100,
        error: err?.message || String(err),
      };
    }
  }

  private executeSingleStatement(statement: string): SqlQueryResult {
    const upper = statement.toUpperCase();

    // 1. CREATE TABLE
    if (upper.startsWith('CREATE TABLE')) {
      return this.handleCreateTable(statement);
    }

    // 2. INSERT INTO
    if (upper.startsWith('INSERT INTO')) {
      return this.handleInsert(statement);
    }

    // 3. SELECT
    if (upper.startsWith('SELECT')) {
      return this.handleSelect(statement);
    }

    // 4. UPDATE
    if (upper.startsWith('UPDATE')) {
      return this.handleUpdate(statement);
    }

    // 5. DELETE
    if (upper.startsWith('DELETE FROM')) {
      return this.handleDelete(statement);
    }

    // 6. DROP TABLE
    if (upper.startsWith('DROP TABLE')) {
      return this.handleDropTable(statement);
    }

    throw new Error(`Неподдерживаемая SQL-команда: "${statement.slice(0, 30)}..."`);
  }

  private handleCreateTable(sql: string): SqlQueryResult {
    const match = sql.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)\s*\(([\s\S]*)\)/i);
    if (!match) throw new Error('Синтаксическая ошибка в CREATE TABLE');

    const tableName = match[1].toLowerCase();
    const colDefs = match[2].split(',').map(c => c.trim()).filter(Boolean);
    const columns: string[] = [];

    for (const def of colDefs) {
      const parts = def.split(/\s+/);
      if (parts[0]) columns.push(parts[0].replace(/[`"]/g, ''));
    }

    this.tables.set(tableName, {
      name: tableName,
      columns,
      rows: [],
    });

    return {
      columns: ['Результат'],
      rows: [[`Таблица "${tableName}" успешно создана`]],
      affectedRows: 0,
      executionTimeMs: 0,
    };
  }

  private handleInsert(sql: string): SqlQueryResult {
    const match = sql.match(/INSERT\s+INTO\s+([a-zA-Z0-9_]+)(?:\s*\(([\s\S]*?)\))?\s*VALUES\s*([\s\S]+)/i);
    if (!match) throw new Error('Синтаксическая ошибка в INSERT INTO');

    const tableName = match[1].toLowerCase();
    const table = this.tables.get(tableName);
    if (!table) throw new Error(`Таблица "${tableName}" не найдена`);

    let columns = table.columns;
    if (match[2]) {
      columns = match[2].split(',').map(c => c.trim().replace(/[`"]/g, ''));
    }

    const valuesStr = match[3];
    // match rows like (val1, val2), (val3, val4)
    const rowMatches = valuesStr.match(/\(([\s\S]*?)\)/g);
    if (!rowMatches) throw new Error('Не указаны значения VALUES');

    let insertedCount = 0;
    for (const rowStr of rowMatches) {
      const rawValues = rowStr
        .slice(1, -1)
        .split(',')
        .map(v => {
          const trimmed = v.trim();
          if (trimmed.startsWith("'") && trimmed.endsWith("'")) return trimmed.slice(1, -1);
          if (trimmed.startsWith('"') && trimmed.endsWith('"')) return trimmed.slice(1, -1);
          if (trimmed.toUpperCase() === 'NULL') return null;
          if (!isNaN(Number(trimmed))) return Number(trimmed);
          return trimmed;
        });

      const rowObj: Record<string, any> = {};
      columns.forEach((col, idx) => {
        rowObj[col] = rawValues[idx] !== undefined ? rawValues[idx] : null;
      });

      table.rows.push(rowObj);
      insertedCount++;
    }

    return {
      columns: ['Результат'],
      rows: [[`Добавлено записей: ${insertedCount}`]],
      affectedRows: insertedCount,
      executionTimeMs: 0,
    };
  }

  private handleSelect(sql: string): SqlQueryResult {
    // Basic regex parser for SELECT ... FROM table [JOIN table2 ON ...] [WHERE ...] [ORDER BY ...] [LIMIT ...]
    const fromMatch = sql.match(/SELECT\s+([\s\S]+?)\s+FROM\s+([a-zA-Z0-9_]+)([\s\S]*)/i);
    if (!fromMatch) throw new Error('Синтаксическая ошибка в SELECT операторе');

    const selectClause = fromMatch[1].trim();
    const mainTable = fromMatch[2].toLowerCase();
    const rest = fromMatch[3].trim();

    const table = this.tables.get(mainTable);
    if (!table) throw new Error(`Таблица "${mainTable}" не найдена`);

    let currentRows = [...table.rows];

    // Check for JOIN
    const joinMatch = rest.match(/JOIN\s+([a-zA-Z0-9_]+)\s+ON\s+([a-zA-Z0-9_.]+)\s*=\s*([a-zA-Z0-9_.]+)/i);
    if (joinMatch) {
      const joinTableName = joinMatch[1].toLowerCase();
      const joinTable = this.tables.get(joinTableName);
      if (joinTable) {
        const leftKey = joinMatch[2].split('.').pop()!;
        const rightKey = joinMatch[3].split('.').pop()!;

        const joined: Record<string, any>[] = [];
        for (const leftRow of currentRows) {
          for (const rightRow of joinTable.rows) {
            if (leftRow[leftKey] == rightRow[rightKey]) {
              joined.push({ ...leftRow, ...rightRow });
            }
          }
        }
        currentRows = joined;
      }
    }

    // Check WHERE
    const whereMatch = rest.match(/WHERE\s+([^ORDER|GROUP|LIMIT]+)/i);
    if (whereMatch) {
      const condition = whereMatch[1].trim();
      currentRows = currentRows.filter(row => this.evaluateCondition(row, condition));
    }

    // Check ORDER BY
    const orderMatch = rest.match(/ORDER\s+BY\s+([a-zA-Z0-9_]+)(?:\s+(ASC|DESC))?/i);
    if (orderMatch) {
      const orderCol = orderMatch[1];
      const isDesc = orderMatch[2]?.toUpperCase() === 'DESC';
      currentRows.sort((a, b) => {
        const valA = a[orderCol];
        const valB = b[orderCol];
        if (valA < valB) return isDesc ? 1 : -1;
        if (valA > valB) return isDesc ? -1 : 1;
        return 0;
      });
    }

    // Check LIMIT
    const limitMatch = rest.match(/LIMIT\s+(\d+)/i);
    if (limitMatch) {
      currentRows = currentRows.slice(0, parseInt(limitMatch[1], 10));
    }

    // Determine output columns
    let outColumns: string[] = [];
    let outRows: (string | number | null)[][] = [];

    if (selectClause === '*') {
      outColumns = currentRows.length > 0 ? Object.keys(currentRows[0]) : table.columns;
      outRows = currentRows.map(row => outColumns.map(col => row[col] ?? null));
    } else if (selectClause.toUpperCase().includes('COUNT(')) {
      outColumns = ['count'];
      outRows = [[currentRows.length]];
    } else {
      outColumns = selectClause.split(',').map(c => c.trim().replace(/[`"]/g, ''));
      outRows = currentRows.map(row => outColumns.map(col => row[col] ?? null));
    }

    return {
      columns: outColumns,
      rows: outRows,
      executionTimeMs: 0,
    };
  }

  private evaluateCondition(row: Record<string, any>, condition: string): boolean {
    const equalsMatch = condition.match(/([a-zA-Z0-9_]+)\s*(=|!=|>|<|>=|<=)\s*(.+)/);
    if (!equalsMatch) return true;

    const col = equalsMatch[1].trim();
    const op = equalsMatch[2].trim();
    let valStr = equalsMatch[3].trim().replace(/['"]/g, '');

    const actual = row[col];
    const compare = !isNaN(Number(valStr)) ? Number(valStr) : valStr;

    switch (op) {
      case '=': return String(actual).toLowerCase() === String(compare).toLowerCase();
      case '!=': return String(actual).toLowerCase() !== String(compare).toLowerCase();
      case '>': return Number(actual) > Number(compare);
      case '<': return Number(actual) < Number(compare);
      case '>=': return Number(actual) >= Number(compare);
      case '<=': return Number(actual) <= Number(compare);
      default: return true;
    }
  }

  private handleUpdate(sql: string): SqlQueryResult {
    const match = sql.match(/UPDATE\s+([a-zA-Z0-9_]+)\s+SET\s+([a-zA-Z0-9_]+)\s*=\s*(.+?)(?:\s+WHERE\s+(.+))?$/i);
    if (!match) throw new Error('Синтаксическая ошибка в UPDATE');

    const tableName = match[1].toLowerCase();
    const table = this.tables.get(tableName);
    if (!table) throw new Error(`Таблица "${tableName}" не найдена`);

    const col = match[2];
    const rawVal = match[3].trim().replace(/['"]/g, '');
    const newVal = !isNaN(Number(rawVal)) ? Number(rawVal) : rawVal;
    const whereCond = match[4];

    let affected = 0;
    for (const row of table.rows) {
      if (!whereCond || this.evaluateCondition(row, whereCond)) {
        row[col] = newVal;
        affected++;
      }
    }

    return {
      columns: ['Результат'],
      rows: [[`Обновлено записей: ${affected}`]],
      affectedRows: affected,
      executionTimeMs: 0,
    };
  }

  private handleDelete(sql: string): SqlQueryResult {
    const match = sql.match(/DELETE\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+(.+))?$/i);
    if (!match) throw new Error('Синтаксическая ошибка в DELETE');

    const tableName = match[1].toLowerCase();
    const table = this.tables.get(tableName);
    if (!table) throw new Error(`Таблица "${tableName}" не найдена`);

    const whereCond = match[2];
    const initialCount = table.rows.length;

    if (whereCond) {
      table.rows = table.rows.filter(row => !this.evaluateCondition(row, whereCond));
    } else {
      table.rows = [];
    }

    const affected = initialCount - table.rows.length;
    return {
      columns: ['Результат'],
      rows: [[`Удалено записей: ${affected}`]],
      affectedRows: affected,
      executionTimeMs: 0,
    };
  }

  private handleDropTable(sql: string): SqlQueryResult {
    const match = sql.match(/DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_]+)/i);
    if (!match) throw new Error('Синтаксическая ошибка в DROP TABLE');

    const tableName = match[1].toLowerCase();
    this.tables.delete(tableName);

    return {
      columns: ['Результат'],
      rows: [[`Таблица "${tableName}" удалена`]],
      executionTimeMs: 0,
    };
  }
}

export const sqlEngine = new InMemorySqlEngine();
