const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const openaiApiKey = process.env.API_KEY;

app.post('/generate-poem', upload.single('image'), async (req, res) => {
    const file = req.file;
    const { option } = req.body;

    if (!file) {
        return res.status(400).send('이미지가 업로드되지 않았습니다.');
    }

    let systemContent = "";
    switch (option) {
        case 'A':
            systemContent = "너는 시인 서정주 야. 서정주 시인의 대표 작품 문체를 최대한 반영해줘.  그림을 보고 제목과 함께 시를 작성해줘. 200자 이내로. 다채롭고 서정적인 언어와 감각적인 표현을 사용하여 자연과 삶의 순환을 탐구하는 시를 써 주세요. 서정주의 '자화상'과 '화사'처럼 이미지 속 **[꽃, 나무, 물결, 계절의 변화]**을 감각적으로 묘사하며 인간 존재의 내면을 탐구하는 서정적인 시를 작성해 주세요.";
            break;
        case 'B':
            systemContent = "너는 시인 정지용 이야. 정지 시인의 대표 작품 문체를 최대한 반영해줘.  그림을 보고 제목과 함께 시를 작성해줘. 200자 이내로. 세밀한 묘사와 시각적 이미지를 통해 시적 공간을 확장하는 시를 써 주세요. 정지용의 '향수'와 '유리창'처럼 이미지 속 **[투명한 물체, 도시의 풍경, 자연의 디테일]**를 세심하게 묘사하며, 그 속에서 내면의 정서를 은은하게 담아 주세요.";
            break;
        case 'C':
            systemContent = "너는 시인 이상 이야. 이상 시인의 대표 작품 문체를 최대한 반영해줘. 그림을 보고 제목과 함께 시를 작성해줘. 200자 이내로. 실험적이고 독특한 형식으로 초현실적 이미지와 몽환적인 분위기를 표현하는 시를 작성해 주세요. 이상의 '오감도'와 같은 불안하고 고독한 분위기를 담아, 이미지 속 **[기이한 구조물, 꿈속 같은 풍경, 비현실적 색채]**에서 느껴지는 불안과 존재의 아이러니를 초현실적으로 풀어내 주세요.";
            break;
        case 'D':
            systemContent = "너는 시인 하상욱 이야. 하상욱 시인의 대표 작품 문체를 최대한 반영해줘. 그림을 보고 제목과 함께 시를 작성해줘. 200자 이내로. 짧고 직관적인 문장으로 현대인의 일상적인 고민과 소소한 감정을 유머러스하게 표현하는 시를 작성해 주세요. 하상욱의 '서울 시(詩)'와 같은 SNS 시대의 감수성을 담아, 이미지 속 **[도시 풍경, 일상의 소품, 사람들의 모습]**에서 느껴지는 외로움이나 연애에 대한 생각을 두세 줄로 공감할 수 있게 표현해 주세요. 내용에서 반전을 주는 제목을 마지막에 담아서 유머를 잔뜩 표현해줘.";
            break;
        default:
            systemContent = "너는 시인 서정주 야. 서정주 시인의 대표 작품 문체를 최대한 반영해줘.  그림을 보고 제목과 함께 시를 작성해줘. 200자 이내로. 다채롭고 서정적인 언어와 감각적인 표현을 사용하여 자연과 삶의 순환을 탐구하는 시를 써 주세요. 서정주의 '자화상'과 '화사'처럼 이미지 속 **[꽃, 나무, 물결, 계절의 변화]**을 감각적으로 묘사하며 인간 존재의 내면을 탐구하는 서정적인 시를 작성해 주세요.";
            break;
    }

    try {
        // 이미지를 읽어서 base64로 인코딩
        const imageBuffer = fs.readFileSync(file.path);
        const imageBase64 = imageBuffer.toString('base64');

        // OpenAI API에 이미지 전송 및 수학 문제 요청
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: systemContent},
                { role: 'user', content: [
                    // { type: 'text', text: "이 그림을 보고 받은 영감을 시로 작성해줘." },
                    { type: 'image_url', image_url: {
                        url: `data:image/png;base64,${imageBase64}`
                    }}
                ]}
            ],
            temperature: 0.5
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            }
        });

        const poem = response.data.choices[0].message.content.trim();
        res.json({ poem: poem });
    } catch (error) {
        console.error('Error processing math homework:', error);
        res.status(500).send('시 작성 중 오류가 발생했습니다.');
    } finally {
        fs.unlinkSync(file.path); // 임시 파일 삭제
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
