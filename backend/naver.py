import requests
from bs4 import BeautifulSoup
import json

keyword = "면목동"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Whale/3.24.223.18 Safari/537.36",
}
headers = {
    "Accept-Encoding": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Content-Type": "text/html; charset=utf-8",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7Cache-Controlmax-age=0",
    "Cookie": "NNB=FLQGQQIZUMTWK; NSCS=1; landHomeFlashUseYn=Y; ASID=798284c80000018b363fa3d60000004c; nhn.realestate.article.rlet_type_cd=A01; NaverSuggestUse=unuse%26use; _ga=GA1.1.229218125.1700199836; _fwb=214N3zbIosqstGdsHYkZBbS.1701670529814; _ga_451MFZ9CFM=GS1.1.1701935621.2.0.1701935627.0.0.0; nx_ssl=2; nhn.realestate.article.trade_type_cd="
    "; SHOW_FIN_BADGE=Y; _ga_RCM29786SD=GS1.1.1704854360.1.1.1704854376.0.0.0",
    "If-None-Match": '"qlzav9i7n01ms4"',
    "Sec-Ch-Ua": '"Whale";v="3", "Not-A.Brand";v="8", "Chromium";v="120"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "Windows",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Whale/3.24.223.18 Safari/537.36",
}
url = "https://fin.land.naver.com/articles/2401686949"
res = requests.get(url)
res.raise_for_status()


soup = (str)(BeautifulSoup(res.text, "lxml"))
print(soup)
