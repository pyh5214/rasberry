import { useState, useCallback } from 'react';
import { PoetOption, PoemGenerationState } from '../types';
import { generatePoem as generatePoemApi } from '../services/api';
import axios from 'axios';

interface UsePoemGenerationReturn extends PoemGenerationState {
  generatePoem: (image: Blob | File, poetOption: PoetOption) => Promise<void>;
  clearPoem: () => void;
}

export const usePoemGeneration = (): UsePoemGenerationReturn => {
  const [state, setState] = useState<PoemGenerationState>({
    poem: '',
    loading: false,
    error: null
  });

  const generatePoem = useCallback(async (image: Blob | File, poetOption: PoetOption) => {
    setState({ poem: '', loading: true, error: null });

    try {
      const poem = await generatePoemApi(image, poetOption);
      setState({ poem, loading: false, error: null });
    } catch (error) {
      let errorMessage = '시 생성 중 오류가 발생했습니다.';

      if (axios.isAxiosError(error)) {
        if (error.response) {
          const serverError = error.response.data as { error?: string; details?: string };
          errorMessage = serverError?.error || errorMessage;
          const details = serverError?.details;
          if (details) {
            errorMessage += `\n\n상세: ${details}`;
          }
        } else if (error.request) {
          errorMessage = '서버에 연결할 수 없습니다.\n백엔드 서버가 실행 중인지 확인해주세요.';
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = '요청 시간이 초과되었습니다.\n네트워크 연결을 확인하고 다시 시도해주세요.';
        }
      } else if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }

      setState({ poem: '', loading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  }, []);

  const clearPoem = useCallback(() => {
    setState({ poem: '', loading: false, error: null });
  }, []);

  return {
    ...state,
    generatePoem,
    clearPoem
  };
};
