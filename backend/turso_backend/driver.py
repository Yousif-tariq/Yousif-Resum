import re
import datetime
from decimal import Decimal
import libsql_client

# DB-API 2.0 Compliant Types and Exceptions
apilevel = "2.0"
threadsafety = 1
paramstyle = "format"  # or 'qmark'

class Error(Exception):
    pass

class DatabaseError(Error):
    pass

class OperationalError(DatabaseError):
    pass

class IntegrityError(DatabaseError):
    pass

class ProgrammingError(DatabaseError):
    pass

class NotSupportedError(DatabaseError):
    pass


def adapt_params(params):
    if params is None:
        return []
    if isinstance(params, tuple):
        params = list(params)
    if not isinstance(params, (list, tuple, dict)):
        params = [params]
    
    if isinstance(params, list):
        adapted = []
        for p in params:
            if isinstance(p, (datetime.datetime, datetime.date, datetime.time)):
                adapted.append(str(p))
            elif isinstance(p, Decimal):
                adapted.append(float(p))
            elif isinstance(p, bool):
                adapted.append(1 if p else 0)
            elif isinstance(p, bytes):
                adapted.append(p)
            else:
                adapted.append(p)
        return adapted
    elif isinstance(params, dict):
        adapted = {}
        for k, v in params.items():
            if isinstance(v, (datetime.datetime, datetime.date, datetime.time)):
                adapted[k] = str(v)
            elif isinstance(v, Decimal):
                adapted[k] = float(v)
            elif isinstance(v, bool):
                adapted[k] = 1 if v else 0
            else:
                adapted[k] = v
        return adapted
    return params


class TursoCursor:
    def __init__(self, connection):
        self.connection = connection
        self.description = None
        self.rowcount = -1
        self.lastrowid = None
        self._rows = []
        self._index = 0
        self.arraysize = 1
        self.closed = False

    def close(self):
        self.closed = True
        self._rows = []

    def execute(self, query, params=None):
        if self.closed:
            raise OperationalError("Cursor is closed")

        clean_query = query.strip().rstrip(';')
        
        # Convert %s placeholders to ? if necessary
        # SQLite / libSQL expects '?' placeholders
        # Django sqlite backend uses '?' but in case format strings with %s arrive:
        # Avoid replacing % inside string literals by checking
        if '%s' in clean_query:
            clean_query = re.sub(r'%s', '?', clean_query)

        adapted_params = adapt_params(params)

        try:
            res = self.connection.client.execute(clean_query, adapted_params)
            
            if res.columns:
                self.description = tuple(
                    (col_name, None, None, None, None, None, None)
                    for col_name in res.columns
                )
                self._rows = [list(row) for row in res.rows]
                self._index = 0
                self.rowcount = len(self._rows)
            else:
                self.description = None
                self._rows = []
                self._index = 0
                self.rowcount = res.rows_affected if hasattr(res, 'rows_affected') else 0

            self.lastrowid = getattr(res, 'last_insert_rowid', None)
            return self
        except Exception as e:
            err_str = str(e).lower()
            if 'unique' in err_str or 'constraint' in err_str:
                raise IntegrityError(str(e)) from e
            elif 'syntax' in err_str:
                raise ProgrammingError(str(e)) from e
            else:
                raise OperationalError(str(e)) from e

    def executemany(self, query, param_seq):
        for params in param_seq:
            self.execute(query, params)
        return self

    def executescript(self, script):
        for statement in script.split(';'):
            stmt = statement.strip()
            if stmt:
                self.execute(stmt)
        return self

    def fetchone(self):
        if self._index < len(self._rows):
            row = self._rows[self._index]
            self._index += 1
            return tuple(row)
        return None

    def fetchmany(self, size=None):
        if size is None:
            size = self.arraysize
        end = min(self._index + size, len(self._rows))
        rows = [tuple(r) for r in self._rows[self._index:end]]
        self._index = end
        return rows

    def fetchall(self):
        rows = [tuple(r) for r in self._rows[self._index:]]
        self._index = len(self._rows)
        return rows

    def __iter__(self):
        return self

    def __next__(self):
        row = self.fetchone()
        if row is None:
            raise StopIteration
        return row


class TursoConnection:
    def __init__(self, url, auth_token, **kwargs):
        # Format url cleanly (https:// required for HTTP pipeline)
        if url.startswith('libsql://'):
            self.url = f"https://{url[9:]}"
        elif url.startswith('wss://'):
            self.url = f"https://{url[6:]}"
        elif not url.startswith('http'):
            self.url = f"https://{url}"
        else:
            self.url = url
            
        self.auth_token = auth_token
        self.client = libsql_client.create_client_sync(self.url, auth_token=self.auth_token)
        self.closed = False
        self.isolation_level = None
        self.autocommit = True
        self.in_transaction = False

    def cursor(self, factory=None):
        if self.closed:
            raise OperationalError("Connection is closed")
        return TursoCursor(self)

    def commit(self):
        # HTTP client is stateless and auto-commits transactions
        pass

    def rollback(self):
        pass

    def close(self):
        if not self.closed:
            self.client.close()
            self.closed = True

    def create_function(self, name, num_params, func, *args, **kwargs):
        # No-op for cloud sqlite functions
        pass

    def set_trace_callback(self, callback):
        pass


def connect(database, auth_token=None, **kwargs):
    token = auth_token or kwargs.get('auth_token', '')
    return TursoConnection(database, auth_token=token, **kwargs)
