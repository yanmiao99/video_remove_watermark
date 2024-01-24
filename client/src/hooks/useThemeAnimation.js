// 用于切换主题的动画
// 样式文件 : styles/index.scss

import { useDark } from "@vueuse/core";
import { commonStore } from "@/store/common";

const store = commonStore()

export function useThemeAnimation() {

const isDark = useDark({
  selector: "html",
  storageKey: "vueuse-color-scheme",  // 用于存储的key
  valueDark: "dark",
  valueLight: "light",
});

const toggleDark = () => {
  isDark.value = !isDark.value
  store.setDarkMode(isDark.value === true ? 'dark' : 'light')
};

const toggleTheme = (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  // 兼容性处理
  if (!document.startViewTransition) {
    toggleDark();
    return;
  }
  const transition = document.startViewTransition(async () => {
    toggleDark();
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: "ease-in",
        pseudoElement: isDark.value
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    );
  });
};

  return {
    toggleTheme,
    isDark
  };
}
