import React from 'react';
import { useAnalysisHistory } from '@/hooks/useAnalysisHistory';
import { formatDate } from '@/utils/date';
import { sanitizeHTML } from '@/utils/sanitize';

export function AnalysisHistory() {
  const { analysisHistory, isLoading } = useAnalysisHistory();

  if (isLoading) {
    return <div className="p-4">Loading analysis history...</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {analysisHistory.map((analysis, index) => (
        <div key={index} className="analysis-item bg-white/5 backdrop-blur-lg rounded-xl p-4">
          <h4 className="text-lg font-medium mb-2">{sanitizeHTML(analysis.upload_file_name)}</h4>
          <div className="analysis-details text-sm text-gray-400 space-y-1">
            {analysis.video_duration && <p>Duration: {analysis.video_duration}</p>}
            {analysis.video_format && <p>Format: {analysis.video_format}</p>}
          </div>
          <div className="analysis-content mt-3 text-gray-200">
            {sanitizeHTML(analysis.analysis)}
          </div>
          <div className="analysis-timestamp mt-2 text-xs text-gray-500">
            {formatDate(analysis.TIMESTAMP)}
          </div>
        </div>
      ))}
    </div>
  );
}