import React, { useEffect, useState } from 'react';

interface CanadaSVGProps {
  className?: string;
  onLoad?: () => void;
}

export function CanadaSVG({ className, onLoad }: CanadaSVGProps) {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    fetch('/canada-map.svg')
      .then(r => r.text())
      .then(text => {
        let cleaned = text
          .replace(/fill="[^"]*"/, 'fill="none"')
          .replace(/stroke="[^"]*"/, 'stroke="rgba(100,200,255,0.35)"')
          .replace(/stroke-width="[^"]*"/, 'stroke-width="0.5"')
          .replace(/width="1000"/, 'width="100%"')
          .replace(/height="1000"/, 'height="100%"')
          .replace(/viewbox=/i, 'viewBox=');

        cleaned = cleaned.replace(/<g id="points">[\s\S]*?<\/g>/, '');
        cleaned = cleaned.replace(/<g id="label_points">[\s\S]*?<\/g>/, '');

        cleaned = cleaned.replace(
          /<path\s/g,
          '<path fill="rgba(100,200,255,0.06)" '
        );

        const glowFilter = `<defs><filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter></defs>`;
        cleaned = cleaned.replace(/<g id="features">/, glowFilter + '<g id="features" filter="url(#mapGlow)">');

        setSvgContent(cleaned);
        onLoad?.();
      });
  }, []);

  return (
    <div
      className={className}
      style={{ lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
