# POEM - 이미지로 시 만들기

이미지를 분석하여 AI가 시를 생성하는 웹 애플리케이션입니다.

## 프로젝트 구조

```
rasberry/
├── backend/          # Express 백엔드 서버
│   ├── index.js      # 메인 서버 파일
│   ├── package.json  # 백엔드 의존성
│   └── uploads/      # 업로드된 이미지 임시 저장소
└── frontend/         # React 프론트엔드
    ├── src/          # 소스 코드
    ├── public/       # 정적 파일
    └── package.json  # 프론트엔드 의존성
```

## 사전 요구사항

- Node.js (v14 이상)
- npm 또는 yarn
- OpenAI API 키

## 설치 및 실행

### 1. 백엔드 설정 및 실행

```bash
# 백엔드 디렉토리로 이동
cd backend

# 의존성 설치
npm install

# 환경 변수 설정
# .env 파일을 생성하고 다음 내용을 추가하세요:
# PORT=5000
# API_KEY=your_openai_api_key_here

# 서버 실행
npm start
```

백엔드 서버는 `http://localhost:5000`에서 실행됩니다.

### 2. 프론트엔드 설정 및 실행

새 터미널 창에서:

```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

프론트엔드는 `http://localhost:3000`에서 실행됩니다.

## 환경 변수 설정

### 백엔드 (.env 파일)

`backend/.env` 파일을 생성하고 다음 내용을 추가하세요:

```
PORT=5000
API_KEY=your_openai_api_key_here
```

- `PORT`: 백엔드 서버 포트 (기본값: 5000)
- `API_KEY`: OpenAI API 키 (필수)

## 사용 방법

1. 웹 브라우저에서 `http://localhost:3000` 접속
2. 시인 선택 (서정주, 정지용, 이상, 하상욱)
3. 카메라 아이콘 클릭하여 사진 촬영
4. 촬영한 이미지로 AI가 시를 생성합니다

## 시인별 특징

- **서정주 (A)**: 다채롭고 서정적인 언어로 자연과 삶의 순환을 탐구
- **정지용 (B)**: 세밀한 묘사와 시각적 이미지로 시적 공간 확장
- **이상 (C)**: 실험적이고 초현실적인 형식으로 몽환적 분위기 표현
- **하상욱 (D)**: 짧고 직관적인 문장으로 현대인의 일상과 감정을 유머러스하게 표현

## 개발 스크립트

### 백엔드
- `npm start`: 서버 실행
- `npm run dev`: nodemon으로 개발 모드 실행 (nodemon 설치 필요)

### 프론트엔드
- `npm start`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm test`: 테스트 실행
- `npm run electron-dev`: Electron 앱 개발 모드 실행
- `npm run electron-pack`: Electron 앱 패키징

## 문제 해결

### 백엔드 서버가 시작되지 않는 경우
- `.env` 파일이 `backend/` 디렉토리에 있는지 확인
- `API_KEY`가 올바르게 설정되었는지 확인
- 포트 5000이 다른 프로세스에서 사용 중인지 확인

### 프론트엔드에서 백엔드에 연결되지 않는 경우
- 백엔드 서버가 실행 중인지 확인
- `App.js`의 API URL이 올바른지 확인 (기본값: `http://localhost:5000`)

### 카메라 접근 오류
- 브라우저에서 카메라 권한을 허용했는지 확인
- HTTPS 또는 localhost에서만 카메라 접근이 가능합니다

## 기술 스택

### 백엔드
- Express.js
- Multer (파일 업로드)
- OpenAI API
- CORS

### 프론트엔드
- React
- Material-UI
- Axios
- Electron (선택사항)

## 라이선스

ISC

