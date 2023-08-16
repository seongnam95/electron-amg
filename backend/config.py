import json
from pathlib import Path
from typing import Optional

BASE_DIR = Path(__file__).resolve().parent


def get_secret(
    key: str,
    default_value: Optional[str] = None,
    json_path: str = str(BASE_DIR / "secrets.json"),
):
    with open(json_path) as f:
        secrets = json.loads(f.read())
    try:
        return secrets[key]
    except KeyError:
        if default_value:
            return default_value
        raise EnvironmentError(f"Set the {key} environment variable")


SQL_DB_URL = get_secret("SQL_DB_URL")
SALT_KEY = get_secret("SALT_KEY")
AUTH_SECRET_KEY = get_secret("AUTH_SECRET_KEY")
