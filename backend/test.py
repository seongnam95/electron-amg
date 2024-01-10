import requests
from datetime import date

login_url = "http://ajwsmk.ajpark.kr/login"
main_url = "http://ajwsmk.ajpark.kr/main/index.cs"
login_payload = {"j_username": "ws1023", "j_password": "ws1023"}

# 세션 생성
session = requests.Session()

# 로그인 요청
response = session.post(login_url, data=login_payload)

# 로그인 후 쿠키 설정
session.cookies.set("userInputId", "ws1023")
session.cookies.set("userInputPw", "ws1023")

# 로그인 상태 확인
response = session.get(main_url)
login_success = response.status_code == 200

# 로그인 성공 시 차량 조회
today = date.today().strftime("%Y-%m-%d")
if login_success:
    url = "http://ajwsmk.ajpark.kr/discount/carSearch.cs?userID=ws1023&contextPath="
    data = {"carNumber": "1550", "from": today, "fromHH": "00"}
    response = session.post(url=url, data=data)
    print(response.text)
