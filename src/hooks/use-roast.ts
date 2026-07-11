"use client";

import { useState, useCallback } from 'react';
import { RoastResult } from '@/lib/types';

export type RoastStage = 'idle' | 'uploading' | 'parsing' | 'roasting' | 'done' | 'error';

interface UseRoastReturn {
  stage: RoastStage;
  result: RoastResult | null;
  error: string | null;
  submitResume: (file: File) => Promise<void>;
  reset: () => void;
}

export function useRoast(): UseRoastReturn {
  const [stage, setStage] = useState<RoastStage>('idle');
  const [result, setResult] = useState<RoastResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitResume = useCallback(async (file: File) => {
    try {
      setError(null);
      setResult(null);
      setStage('uploading');

      const formData = new FormData();
      formData.append('resume', file);

      setStage('parsing');

      // Small delay to show parsing state
      await new Promise(r => setTimeout(r, 800));
      setStage('roasting');

      const response = await fetch('/api/roast', {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get('content-type');
      let data: any = null;

      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonErr) {
          console.error('[useRoast] Failed to parse JSON response:', jsonErr);
        }
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
          `Server returned an error (status ${response.status}). The roast might have timed out or failed on the server.`
        );
      }

      if (!data || !data.roast) {
        throw new Error('Received an invalid or empty response from the server.');
      }

      setResult(data.roast);
      setStage('done');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      setStage('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStage('idle');
    setResult(null);
    setError(null);
  }, []);

  return { stage, result, error, submitResume, reset };
}
