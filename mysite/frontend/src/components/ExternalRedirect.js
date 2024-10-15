// ExternalRedirect.js
import React, { useEffect } from 'react';

const ExternalRedirect = ({ url }) => {
  useEffect(() => {
    window.location.href = url;  // 외부 URL로 리디렉션
  }, [url]);

  return null; // 리디렉션 중이므로 렌더링할 내용은 없음
};

export default ExternalRedirect;
