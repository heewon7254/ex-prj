// const fontSizes = [12, 14, 16, 18, 20];
const screenRatios = [0.8, 0.9, 1, 1.15, 1.25];
export const applyFontSize = index => {
  // const px = fontSizes[index] || 16;
  // document.documentElement.style.setProperty("--ds-font-size-base", `${px}px`);
  // fontsize 수정 말고 body zoom 으로 변경
  document.body.style.zoom = screenRatios[index] || 1;
};
