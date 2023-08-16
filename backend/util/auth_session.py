import secrets


def generate_session_id():
    return secrets.token_hex(16)


session_id = generate_session_id()
print(session_id)
