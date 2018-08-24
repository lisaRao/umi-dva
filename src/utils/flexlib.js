/**
 * 返回设备的宽度和相对于375尺寸的缩放比例
 */
export const viewSize = (() => {
  let docEl = document.documentElement;
  let views = {};
  views.w = Math.min(docEl.clientWidth || window.innerWidth, 750); // 设计稿是750px
  views.ratio = views.w / 375; // 相对于375的缩放比例
  return views;
})();

/**
 * 
 */
export const viewInit = ((doc, win) => {
  let resizeEvt = "onorientationchange" in win ? "orientationchange" : "resize";
  let Timer = null;
  let pageWidth = viewSize.w;
  let setFontSize = () => {
      let viewTask = setInterval(() => {
          if (pageWidth > 0) {
              let fontSize = (pageWidth / 750) * 100;
              doc.documentElement.style.fontSize = fontSize + "px";
              clearInterval(viewTask);
          } else {
              pageWidth = Math.min(doc.documentElement.clientWidth || window.innerWidth, 750);
          }
      }, 10);
  };
  doc.addEventListener("DOMContendLoaded", setFontSize, false);
  //转屏
  win.addEventListener(resizeEvt, function () {
      clearTimeout(Timer);
      Timer = setTimeout(setFontSize, 300);
  }, false);
  setFontSize();
})(document, window);