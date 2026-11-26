// 하위 페이지 왼쪽 메뉴(원본 #side_menu를 읽어 새 디자인으로). 하위 항목이 있는 항목은 여닫기 버튼.
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { SideItem } from './readSubpage';

const MENU_ID = 'bmgj-side-list';

interface SideMenuProps { title: string; items: SideItem[]; }

export function SideMenu({ title, items }: SideMenuProps) {
  // 좁은 화면(1,023px 이하)에서는 메뉴가 본문 위로 올라가므로 접어 둔다. 넓은 화면에서는 이 값과 상관없이 펼침.
  const [open, setOpen] = useState(false);
  if (items.length === 0) return null;
  return (
    <nav className="bmgj-side" aria-labelledby="bmgj-side-title" tabIndex={-1} data-open={open ? 'true' : 'false'}>
      <p id="bmgj-side-title" className="bmgj-side-title">{title}</p>
      <button
        type="button"
        className="bmgj-side-toggle"
        aria-expanded={open}
        aria-controls={MENU_ID}
        onClick={() => setOpen((v) => !v)}
      >
        {title} 메뉴 {open ? '접기' : '펼치기'}
        <ChevronDown size={18} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <ul id={MENU_ID} className="bmgj-side-list">
        {items.map((item, i) => <SideNode key={`${item.label}-${i}`} item={item} depth={0} />)}
      </ul>
    </nav>
  );
}

function NewTab() {
  return (
    <>
      <span className="bmgj-newtab" aria-hidden="true">{' '}↗</span>
      <span className="bmgj-sr-only">(새 탭)</span>
    </>
  );
}

function SideNode({ item, depth }: { item: SideItem; depth: number }) {
  const [open, setOpen] = useState(item.active);
  const cls = `bmgj-side-item bmgj-side-item--d${Math.min(depth, 2)}${item.active ? ' is-active' : ''}`;

  if (item.children.length > 0) {
    return (
      <li className={cls}>
        <button type="button" className="bmgj-side-link bmgj-side-parent" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span>{item.label}</span>
          <ChevronDown className="bmgj-side-chevron" size={16} strokeWidth={1.75} aria-hidden="true" />
        </button>
        {open && (
          <ul className="bmgj-side-sub">
            {item.children.map((child, i) => <SideNode key={`${child.label}-${i}`} item={child} depth={depth + 1} />)}
          </ul>
        )}
      </li>
    );
  }

  if (!item.href) return <li className={cls}><span className="bmgj-side-link">{item.label}</span></li>;
  return (
    <li className={cls}>
      <a
        className={`bmgj-side-link${item.current ? ' is-current' : ''}`}
        href={item.href}
        aria-current={item.current ? 'page' : undefined}
        {...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {item.label}
        {item.newTab && <NewTab />}
      </a>
    </li>
  );
}
