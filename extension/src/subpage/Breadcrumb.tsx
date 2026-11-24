// 하위 페이지 경로(원본 #breadcrumb를 읽어 새 디자인으로). 마지막 칸은 지금 페이지.
import { ChevronRight } from 'lucide-react';
import type { Crumb } from './readSubpage';

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length === 0) return null;
  return (
    <nav className="bmgj-crumbs" aria-label="현재 경로">
      <ol>
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={`${crumb.href}-${i}`}>
              {i > 0 && <ChevronRight className="bmgj-crumb-sep" size={14} strokeWidth={1.75} aria-hidden="true" />}
              {last ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <a href={crumb.href}>{crumb.label}</a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
