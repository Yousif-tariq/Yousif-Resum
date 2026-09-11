from django.db.backends.sqlite3.base import DatabaseWrapper as SQLiteDatabaseWrapper
from django.db.backends.sqlite3.features import DatabaseFeatures as SQLiteDatabaseFeatures
from django.db.backends.sqlite3.operations import DatabaseOperations as SQLiteDatabaseOperations
from django.db.backends.sqlite3.schema import DatabaseSchemaEditor as SQLiteDatabaseSchemaEditor
from django.db.backends.sqlite3.introspection import DatabaseIntrospection as SQLiteDatabaseIntrospection
from django.db.backends.sqlite3.creation import DatabaseCreation as SQLiteDatabaseCreation
from django.db.backends.sqlite3.client import DatabaseClient as SQLiteDatabaseClient
from django.core.exceptions import ImproperlyConfigured
from . import driver as Database

class DatabaseFeatures(SQLiteDatabaseFeatures):
    supports_transactions = True
    can_rollback_ddl = False

class DatabaseOperations(SQLiteDatabaseOperations):
    pass

class DatabaseSchemaEditor(SQLiteDatabaseSchemaEditor):
    pass

class DatabaseIntrospection(SQLiteDatabaseIntrospection):
    pass

class DatabaseCreation(SQLiteDatabaseCreation):
    pass

class DatabaseClient(SQLiteDatabaseClient):
    pass


class DatabaseWrapper(SQLiteDatabaseWrapper):
    vendor = 'sqlite'
    display_name = 'Turso (libSQL)'
    
    Database = Database
    SchemaEditorClass = DatabaseSchemaEditor
    features_class = DatabaseFeatures
    ops_class = DatabaseOperations
    introspection_class = DatabaseIntrospection
    creation_class = DatabaseCreation
    client_class = DatabaseClient

    def get_connection_params(self):
        settings_dict = self.settings_dict
        if not settings_dict["NAME"]:
            raise ImproperlyConfigured(
                "settings.DATABASES is improperly configured. "
                "Please supply the NAME value (Turso database URL)."
            )
        
        options = settings_dict.get("OPTIONS", {})
        auth_token = options.get("auth_token", "")
        
        return {
            "database": settings_dict["NAME"],
            "auth_token": auth_token,
        }

    def get_new_connection(self, conn_params):
        conn = Database.connect(**conn_params)
        return conn

    def create_cursor(self, name=None):
        return self.connection.cursor()

    def _set_autocommit(self, autocommit):
        pass

    def check_constraints(self, table_names=None):
        pass

    def is_usable(self):
        if self.connection is None:
            return False
        try:
            cur = self.connection.cursor()
            cur.execute("SELECT 1;")
            return True
        except Exception:
            return False
