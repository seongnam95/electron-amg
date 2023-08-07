from fastapi.responses import JSONResponse


class NotFoundValue(Exception):
    def __init__(self, status_code: int, msg: str):
        self.status_code = status_code
        self.msg = msg

    def make_response(self):
        content = {"success": False, "msg": self.msg}
        return JSONResponse(status_code=self.status_code, content=content)


class InvalidCodeError(Exception):
    def __init__(self, code_type: str):
        super().__init__(f"Invalid {code_type} code.")
