import { pathForPage } from '../site';

// A real <a href> so crawlers and "open in new tab" work, with in-app navigation on a plain click.
export default function PageLink({ page, hash, onNavigate, onClick, children, ...rest }) {
  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page, hash);
    }
  };
  return (
    <a href={pathForPage(page, hash)} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
