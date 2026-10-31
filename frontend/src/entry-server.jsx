import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export { ROUTES, NOT_FOUND_ROUTE, headHtml, sitemapXml, robotsTxt } from './site';

export function render(path) {
  return renderToString(
    <React.StrictMode>
      <App initialPath={path} />
    </React.StrictMode>
  );
}
