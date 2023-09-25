from Cryptodome.Cipher import AES
from Cryptodome import Random
from Cryptodome.Protocol.KDF import PBKDF2

import base64
import config

BLOCK_SIZE = 16
pad = lambda s: s + (BLOCK_SIZE - len(s) % BLOCK_SIZE) * chr(
    BLOCK_SIZE - len(s) % BLOCK_SIZE
)
unpad = lambda s: s[: -ord(s[len(s) - 1 :])]
random = config.RANDOM


def get_private_key():
    salt = config.SALT_KEY
    kdf = PBKDF2(random, salt, 64, 1000)
    key = kdf[:32]
    return key


def encrypt(raw):
    private_key = get_private_key()
    raw = pad(raw).encode("utf-8")
    iv = Random.new().read(AES.block_size)
    cipher = AES.new(private_key, AES.MODE_CBC, iv)
    return base64.b64encode(iv + cipher.encrypt(raw))


def decrypt(enc):
    private_key = get_private_key()

    enc = base64.b64decode(enc)
    iv = enc[:16]
    cipher = AES.new(private_key, AES.MODE_CBC, iv)
    return unpad(cipher.decrypt(enc[16:])).decode("utf-8")


def verify(raw, enc_raw):
    return bool(raw == decrypt(enc_raw))
