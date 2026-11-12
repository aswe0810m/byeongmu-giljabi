// Vite의 `?inline` CSS 가져오기(문자열)를 위한 타입 선언.
declare module '*.css?inline' {
  const css: string;
  export default css;
}
