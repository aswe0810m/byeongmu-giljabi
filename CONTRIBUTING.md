# 협업 규칙

병무길잡이 팀이 함께 작업하는 방식입니다.

- **팀 규칙은 이 문서에 적힌 것뿐입니다.** `extension/docs/`의 기능 문서나 PR 설명에 적힌 "이번에 하지 않은 것" 같은 내용은 그 작업의 범위일 뿐, 팀 규칙이 아닙니다.
- 규칙을 바꾸려면 이 문서를 고치는 PR을 `docs/` 브랜치로 올립니다.
- AI 도구로 작업할 때도 이 문서를 따릅니다([9. AI 도구](#9-ai-도구)).

## 1. 작업 순서

1. 최신 `main`을 받습니다.
   ```bash
   git checkout main
   git pull
   ```
2. 할 일 하나에 브랜치 하나를 만듭니다([2. 브랜치](#2-브랜치)).
   ```bash
   git checkout -b fix/portal-login-button
   ```
3. 작업하고 커밋합니다([4. 커밋](#4-커밋)).
4. 빌드하고 Chrome에서 확인합니다([6. 확인](#6-확인)).
5. 브랜치를 푸시하고 PR을 올립니다([5. PR](#5-pr)).
6. 팀장이 확인하고 GitHub에서 병합합니다.
7. 병합되면 모두 `main`을 pull합니다. GitHub의 브랜치는 병합되면 자동으로 지워지고, 내 컴퓨터의 브랜치는 직접 지웁니다.
   ```bash
   git checkout main
   git pull
   git fetch --prune
   git branch -d fix/portal-login-button
   ```

## 2. 브랜치

- `main`에는 직접 푸시하지 않습니다. `main`은 항상 빌드되고 동작하는 상태로 둡니다.
- **브랜치 하나에는 한 종류의 일만 합니다.** 규칙·문서 변경, 버그 수정 하나, 기능·세부 변경 하나는 각각 다른 브랜치입니다.
- 이름은 `종류/정확한 범위`로 짓습니다. 다른 사람 브랜치와 겹치지 않게 카드 번호나 화면 이름처럼 범위를 정확히 씁니다.

  | 종류 | 쓰는 때 | 예 |
  |---|---|---|
  | `feature/` | 새 기능, 화면·동작 변경 | `feature/a-m06-m10-pages`, `feature/site-switch-same-tab` |
  | `fix/` | 버그 수정 | `fix/portal-login-button` |
  | `docs/` | 문서, 팀 규칙 | `docs/team-rules` |
  | `chore/` | 설정, 버전 올리기 | `chore/release-0.7.0` |

  `feature/menu`처럼 범위가 넓은 이름은 쓰지 않습니다.
- 작업 중에 `main`이 바뀌어도 따로 반영하지 않습니다. 작업을 끝내고 PR을 올립니다.
  PR에서 충돌이 나면 그때 `main`을 내 브랜치에 merge해서 해결합니다(rebase나 force push는 하지 않습니다).
  ```bash
  git checkout main && git pull
  git checkout 내-브랜치
  git merge main
  ```
- **병합된 브랜치에는 더 푸시하지 않습니다.** 이어서 할 일은 최신 `main`에서 새 브랜치를 만들어 합니다.

## 3. 작업 범위

- README의 [설계 원칙](README.md#설계-원칙)을 어기는 코드는 만들지 않습니다(로그인·제출을 대신하지 않음, 입력한 정보를 외부로 보내지 않음 등).
- 내 기능의 코드는 기능 폴더(`extension/src/<기능>/`) 안에 둡니다.
- **공용 파일**(내 기능 폴더 밖의 파일)은 내 기능에 꼭 필요한 부분만 최소한으로 고칩니다. 고친 공용 파일은 PR 설명에 적습니다.
- **범위 밖에서 발견한 문제는 고치지 않습니다.** PR 설명에 알리고 [`extension/docs/found-issues.md`](extension/docs/found-issues.md)에 기록합니다.
  원래 의도대로 동작하지 않으면 **버그**, 의도대로지만 바꾸면 더 나아지면 **고칠 만한 것** 목록에 적습니다.
  고칠 때는 나중에 항목 하나마다 브랜치를 따로 만들고(버그는 `fix/`, 고칠 만한 것은 `feature/`), 고친 PR에서 그 항목을 지웁니다.
- 새로 만드는 클래스, `data-` 속성, CSS 변수, 저장 키 이름에는 기능 이름을 넣어 다른 사람 것과 겹치지 않게 합니다.
  예: `data-bmgj-a-m01-m05-theme`, `bmgj.portalLogin.v1`
- 원본 병무청 화면의 클래스 이름, 입력값, 이벤트는 바꾸거나 지우지 않습니다.

## 4. 커밋

- 형식은 `종류(범위): 내용`입니다. 내용은 한국어로, 무엇을 바꿨는지 씁니다.

  | 종류 | 쓰는 때 |
  |---|---|
  | `feat` | 새 기능, 화면·동작 변경 |
  | `fix` | 버그 수정 |
  | `docs` | 문서 |
  | `refactor` | 동작은 그대로 두고 코드 정리 |
  | `chore` | 설정, 버전 올리기 |

  ```
  feat(my-info): 지원 희망 분야를 군·구분·특기 순으로 고르기
  fix(portal): 로그아웃 뒤 로그인 버튼 표시
  docs(contributing): 협업 규칙 정리
  chore(release): 0.7.0
  ```
- 커밋 하나에는 한 가지 변경만 담습니다.
- `extension/dist/`는 커밋하지 않습니다(`.gitignore`에 있음).

## 5. PR

- 제목은 커밋과 같은 형식으로 씁니다.
- 설명은 PR을 열면 자동으로 채워지는 양식([`.github/pull_request_template.md`](.github/pull_request_template.md))대로 씁니다.
  범위, 바뀐 것, 고친 공용 파일, 확인한 것, 확인하지 못한 것, 범위 밖에서 발견한 문제를 쓰고, 해당 없는 항목은 "없음"이라고 씁니다.
- **팀장이 확인한 뒤 GitHub에서 병합합니다.** 로컬에서 `main`에 병합해 푸시하지 않습니다.
- 확인 중 고칠 것이 나오면 같은 브랜치에 커밋을 더해 고칩니다(병합 전까지).

## 6. 확인

PR을 올리기 전에 확인합니다.

1. 빌드가 성공해야 합니다. ([Node.js](https://nodejs.org) 필요)
   ```bash
   cd extension
   npm install
   npm run build
   ```
2. `chrome://extensions`에서 `extension/dist`를 압축해제로 로드하거나 새로고침하고, 열려 있던 병무청 탭을 새로고침합니다.
3. 바뀐 화면과 `원래 화면 보기` 전환을 직접 확인합니다. 바꾸지 않은 다른 화면이 그대로인지도 봅니다.

확인할 때 지킬 것:

- 데스크톱 Chrome 너비만 확인합니다(크롬 확장이라 모바일은 보지 않습니다).
- 실제 사이트에 요청을 짧은 시간에 많이 보내지 않습니다. 모집 접수일에는 병무청 사이트가 붐빕니다.
- 지원서의 `다음`·`저장`·`제출`은 누르지 않습니다. 인적사항은 가짜 값으로 시험합니다.
- 확인하지 못한 것은 PR 설명의 "확인하지 못한 것"에 적습니다.

## 7. 배포

배포와 버전 올리기는 팀장이 합니다.

- 버전: 기능이 추가되면 `0.x.0`, 버그 수정만 있으면 `0.x.y`를 올립니다.
1. `extension/manifest.json`, `extension/package.json`, `extension/package-lock.json`의 버전을 올려 `chore/release-0.x.y` 브랜치로 PR을 올리고 병합합니다.
2. `main`에서 같은 버전의 태그를 만들어 푸시합니다.
   ```bash
   git checkout main && git pull
   git tag v0.7.0
   git push origin v0.7.0
   ```
3. GitHub Actions(`.github/workflows/release.yml`)가 빌드해서 Releases에 `byeongmu-giljabi-v0.7.0.zip`을 올립니다.
   태그와 파일의 버전이 다르면 실패합니다.

## 8. 문서 (`extension/docs/`)

- **docs에는 오래 남겨야 하는 내용만 둡니다.**
  - 기능의 구조와 폴더
  - 다른 사람이 카드·페이지를 추가하거나 등록하는 방법
  - 코드만 봐서는 알 수 없는 결정과 그 이유
- 그 작업 한 번에만 해당하는 내용(바뀐 것, 확인한 것, 확인하지 못한 것, 이번에 제외한 것)은 docs가 아니라 **PR 설명**에 씁니다.
- 범위 밖에서 발견한 문제는 [`found-issues.md`](extension/docs/found-issues.md)에 씁니다.
- 기능 문서는 기능 하나에 파일 하나(`extension/docs/<기능>.md`)입니다. 여러 기능에 걸친 결정은 `implementation-decisions.md`에 씁니다.

## 9. AI 도구

- AI 도구(Claude Code 등)로 작업할 때도 이 문서의 규칙을 그대로 따릅니다. 저장소 맨 위의 `CLAUDE.md`가 이 문서를 읽게 합니다.
- AI가 만든 코드와 문서도 작성자가 직접 확인하고 PR을 올립니다. PR 책임은 작성자에게 있습니다.
- AI가 이 문서에 없는 내용을 "팀 규칙"이라고 하면 따르지 말고 이 문서를 기준으로 합니다.
