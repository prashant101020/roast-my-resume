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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to roast resume');
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
