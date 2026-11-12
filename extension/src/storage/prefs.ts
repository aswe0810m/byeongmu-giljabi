import type { GroupId } from '../catalog/cards';

export type ViewMode = 'improved' | 'original';

export interface Prefs {
  schemaVersion: 1;
  group: GroupId | null;
  viewMode: ViewMode;
}

export const PREFS_KEY = 'bmgj.prefs';

export const DEFAULT_PREFS: Prefs = { schemaVersion: 1, group: null, viewMode: 'improved' };

/** 형식에 맞지 않으면 기본값을 돌려준다(명세 6절). */
export function normalizePrefs(value: unknown): Prefs {
  if (typeof value !== 'object' || value === null) return { ...DEFAULT_PREFS };
  const v = value as Record<string, unknown>;
  const groupOk = v.group === 'A' || v.group === 'B' || v.group === null;
  const modeOk = v.viewMode === 'improved' || v.viewMode === 'original';
  if (v.schemaVersion !== 1 || !groupOk || !modeOk) return { ...DEFAULT_PREFS };
  return { schemaVersion: 1, group: v.group as GroupId | null, viewMode: v.viewMode as ViewMode };
}

export async function loadPrefs(): Promise<Prefs> {
  try {
    const result = await chrome.storage.local.get(PREFS_KEY);
    return normalizePrefs(result[PREFS_KEY]);
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

/** 한 값만 바꾸고 나머지는 저장된 값을 유지한다. 성공하면 true. */
async function updatePrefs(patch: Partial<Pick<Prefs, 'group' | 'viewMode'>>): Promise<boolean> {
  try {
    const current = await loadPrefs();
    const next: Prefs = { ...current, ...patch, schemaVersion: 1 };
    await chrome.storage.local.set({ [PREFS_KEY]: next });
    return true;
  } catch {
    return false;
  }
}

export const saveGroup = (group: GroupId) => updatePrefs({ group });
export const saveViewMode = (viewMode: ViewMode) => updatePrefs({ viewMode });

export async function clearPrefs(): Promise<boolean> {
  try {
    await chrome.storage.local.remove(PREFS_KEY);
    return true;
  } catch {
    return false;
  }
}

/** 다른 탭에서 바뀐 설정을 받는다. 해제 함수를 돌려준다. */
export function subscribePrefs(onChange: (prefs: Prefs) => void): () => void {
  const listener = (changes: Record<string, chrome.storage.StorageChange>, area: string) => {
    if (area !== 'local' || !(PREFS_KEY in changes)) return;
    onChange(normalizePrefs(changes[PREFS_KEY].newValue));
  };
  chrome.storage.onChanged.addListener(listener);
  return () => chrome.storage.onChanged.removeListener(listener);
}
