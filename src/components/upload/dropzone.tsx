"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { validateFile } from "@/lib/validators/file-validator";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function Dropzone({ onFileSelect, disabled }: DropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
    onFileSelect(file);
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [disabled, handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  }, [disabled]);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      <AnimatePresence mode="wait">
        {selectedFile ? (
          <motion.div
            key="preview"
            className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{selectedFile.name}</p>
                <p className="text-gray-400 text-sm">
                  {(selectedFile.size / 1024).toFixed(1)} KB • Ready to roast
                </p>
              </div>
              {!disabled && (
                <button
                  onClick={clearFile}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            className={cn(
              "relative p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300",
              isDragOver
                ? "border-orange-500 bg-orange-500/5 scale-[1.02]"
                : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.03]",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={!disabled ? { scale: 1.01 } : {}}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300",
                  isDragOver ? "bg-orange-500/20" : "bg-white/5"
                )}
                animate={isDragOver ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: isDragOver ? Infinity : 0 }}
              >
                <Upload className={cn(
                  "w-8 h-8 transition-colors duration-300",
                  isDragOver ? "text-orange-400" : "text-gray-400"
                )} />
              </motion.div>
              <p className="text-white font-medium mb-1">
                {isDragOver ? "Drop it like it's hot 🔥" : "Drop your resume here"}
              </p>
              <p className="text-gray-500 text-sm mb-4">or click to browse</p>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span className="px-2 py-1 rounded bg-white/5">PDF</span>
                <span className="px-2 py-1 rounded bg-white/5">DOCX</span>
                <span>Max 5MB</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
