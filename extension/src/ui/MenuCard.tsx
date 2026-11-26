import type { LucideIcon } from 'lucide-react';
import {
  BookOpen, Bus, Calendar, ChartColumn, CircleHelp, Clock, FilePen, FileText, FileX,
  Headset, MapPin, Megaphone, Printer, Search, ShieldCheck, Store, Wallet,
} from 'lucide-react';
import type { HomeCard, IconKey, MenuLink } from '../catalog/cards';

export const ICONS: Record<IconKey, LucideIcon> = {
  megaphone: Megaphone,
  calendar: Calendar,
  'book-open': BookOpen,
  'shield-check': ShieldCheck,
  clock: Clock,
  'file-text': FileText,
  'file-pen': FilePen,
  search: Search,
  'map-pin': MapPin,
  'circle-help': CircleHelp,
  headset: Headset,
  store: Store,
  printer: Printer,
  wallet: Wallet,
  bus: Bus,
  chart: ChartColumn,
  'file-x': FileX,
};

interface MenuCardProps {
  card: HomeCard;
  expanded: boolean;
  onToggle: () => void;
  tag?: string; // 검색 결과의 `더보기` 꼬리표(3.7)
}

function linkTarget(link: MenuLink) {
  return link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}

function NewTabMark() {
  return (
    <>
      {/* 줄바꿈 없는 공백으로 ↗가 앞 글자와 떨어지지 않게 한다 */}
      <span className="bmgj-newtab" aria-hidden="true">{'\u00A0'}↗</span>
      <span className="bmgj-sr-only">(새 탭)</span>
    </>
  );
}

// 3.4 메뉴 카드. 링크 1개면 카드 전체가 <a>, 2개 이상이면 <button aria-expanded> + 펼침 목록.
export function MenuCard({ card, expanded, onToggle, tag }: MenuCardProps) {
  const Icon = ICONS[card.icon];
  const className = `bmgj-card${card.tone === 'solid' ? ' bmgj-card--highlight' : ''}`;
  const tile = (
    <span className={`bmgj-icon bmgj-icon--${card.tone}`} aria-hidden="true">
      <Icon size={20} strokeWidth={1.75} />
    </span>
  );
  const tagEl = tag ? <span className="bmgj-card-tag">{tag}</span> : null;

  if (card.links.length === 1) {
    const link = card.links[0];
    return (
      <div className="bmgj-card-cell">
        <a className={className} href={link.href} {...linkTarget(link)}>
          {tile}
          <span className="bmgj-card-title">
            {card.title}
            {link.newTab && <NewTabMark />}
          </span>
          <span className="bmgj-card-desc">{card.description}</span>
          {tagEl}
        </a>
      </div>
    );
  }

  const listId = `bmgj-links-${card.id}`;
  return (
    <div className="bmgj-card-cell">
      <button
        type="button"
        className={className}
        aria-expanded={expanded}
        aria-controls={listId}
        onClick={onToggle}
      >
        {tile}
        <span className="bmgj-card-title">{card.title}</span>
        <span className="bmgj-card-desc">{card.description}</span>
        {tagEl}
        <span className="bmgj-card-more">
          관련 메뉴 {card.links.length}개 <span aria-hidden="true">{expanded ? '▴' : '▾'}</span>
        </span>
      </button>
      <ul id={listId} className="bmgj-sublinks" hidden={!expanded}>
        {card.links.map((link) => (
          <li key={link.href + link.label}>
            <a className="bmgj-sublink" href={link.href} {...linkTarget(link)}>
              {link.label}
              {link.newTab && <NewTabMark />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
