# 백엔드 서버

## 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정
# .env 파일 생성 (backend/.env)
# PORT=5000
# API_KEY=your_openai_api_key_here

# 3. 서버 실행
npm start
```

서버는 `http://localhost:5000`에서 실행됩니다.

## 환경 변수

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```
PORT=5000
API_KEY=your_openai_api_key_here
```

## API 엔드포인트

### POST /generate-poem
이미지를 업로드하여 시를 생성합니다.

**요청:**
- `image`: 이미지 파일 (multipart/form-data)
- `option`: 시인 옵션 (A, B, C, D)

**응답:**
```json
{
  "poem": "생성된 시 내용"
}
```

### GET /health
서버 상태 확인

**응답:**
```json
{
  "status": "ok",
  "message": "서버가 정상적으로 실행 중입니다."
}
```

