import { DirectiveBinding } from "vue";
import { Positions } from "@/constants/positions";

const scrollHandlers: Record<string, () => void> = {};

let prevTooltip: HTMLDivElement | null = null;

enum events {
  click = "click",
  mouseover = "mouseenter",
  mouseleave = "mouseleave",
  scroll = "scroll",
}

const vTooltip = {
  mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
    const options = binding.value || {};
    const { scrollClassName, useClick, positionClass, tooltip } = options;

    const updateTooltipPosition = () => {
      if (tooltip) {
        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const gap = 25;
        const tenPercentHeight = (tooltip.clientHeight / 100) * 13;
        const tenPercentWidth = (tooltip.clientWidth / 100) * 8;

        let top, left;
        switch (positionClass) {
          case Positions.TopLeft:
            top = rect.top + scrollY - tooltip.clientHeight - gap;
            left = rect.left - tenPercentWidth + window.scrollX;
            break;
          case Positions.TopCenter:
            top = rect.top + scrollY - tooltip.clientHeight - gap;
            left =
              rect.left +
              window.scrollX +
              rect.width / 2 -
              tooltip.clientWidth / 2;
            break;
          case Positions.TopRight:
            top = rect.top + scrollY - tooltip.clientHeight - gap;
            left =
              rect.right -
              tooltip.clientWidth +
              tenPercentWidth +
              window.scrollX;
            break;
          case Positions.BottomLeft:
            top = rect.bottom + scrollY + gap;
            left = rect.left - tenPercentWidth + window.scrollX;
            break;
          case Positions.BottomCenter:
            top = rect.bottom + scrollY + gap;
            left =
              rect.left +
              window.scrollX +
              rect.width / 2 -
              tooltip.clientWidth / 2;
            break;
          case Positions.BottomRight:
            top = rect.bottom + scrollY + gap;
            left =
              rect.right -
              tooltip.clientWidth +
              tenPercentWidth +
              window.scrollX;
            break;
          case Positions.LeftTop:
            top = rect.top + scrollY - tenPercentHeight;
            left = rect.left + window.scrollX - tooltip.clientWidth - gap;
            break;
          case Positions.LeftCenter:
            top =
              rect.top + scrollY + rect.height / 2 - tooltip.clientHeight / 2;
            left = rect.left + window.scrollX - tooltip.clientWidth - gap;
            break;
          case Positions.LeftBottom:
            top =
              rect.bottom + scrollY - tooltip.clientHeight + tenPercentHeight;
            left = rect.left + window.scrollX - tooltip.clientWidth - gap;
            break;
          case Positions.RightTop:
            top = rect.top + scrollY - tenPercentHeight;
            left = rect.right + window.scrollX + gap;
            break;
          case Positions.RightCenter:
            top =
              rect.top + scrollY + rect.height / 2 - tooltip.clientHeight / 2;
            left = rect.right + window.scrollX + gap;
            break;
          case Positions.RightBottom:
            top =
              rect.bottom + scrollY - tooltip.clientHeight + tenPercentHeight;
            left = rect.right + window.scrollX + gap;
            break;
          default:
            top = rect.top + scrollY - tooltip.clientHeight - gap;
            left =
              rect.left +
              window.scrollX +
              rect.width / 2 -
              tooltip.clientWidth / 2;
            break;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
      }
    };

    const showTooltip = () => {
      if (tooltip) {
        updateTooltipPosition();
        if (tooltip.style.visibility === "visible") {
          hideTooltip();
        } else {
          tooltip.style.visibility = "visible";
          if (prevTooltip && prevTooltip !== tooltip) {
            prevTooltip!.style.visibility = "hidden";
            prevTooltip = null;
          }
        }
        prevTooltip = tooltip;
      }
    };

    const hideTooltip = () => {
      if (tooltip) {
        tooltip.style.visibility = "hidden";
      }
    };

    if (useClick) {
      el.addEventListener(events.click, (event) => {
        event.stopPropagation();
        if (prevTooltip && !tooltip) {
          prevTooltip!.style.visibility = "hidden";
          prevTooltip = null;
        }
        showTooltip();
      });
      document.body.addEventListener(events.click, (event) => {
        if (tooltip && !tooltip.contains(event.target as Node)) {
          hideTooltip();
        }
      });
    } else {
      el.addEventListener(events.mouseover, () => {
        showTooltip();
      });

      el.addEventListener(events.mouseleave, () => {
        hideTooltip();
      });
    }

    const scrollHandler = () => {
      if (tooltip && tooltip.style.visibility === "visible") {
        updateTooltipPosition();
        const tooltipRect = tooltip.getBoundingClientRect();
        const contentBlock = el.closest(scrollClassName);
        if (contentBlock) {
          const contentRect = contentBlock.getBoundingClientRect();
          if (
            tooltipRect.bottom - 20 < contentRect.top ||
            tooltipRect.top - 20 > contentRect.bottom
          ) {
            hideTooltip();
          }
        }
      }
    };

    const contentEl = el.closest(scrollClassName);
    if (contentEl) {
      contentEl.addEventListener(events.scroll, scrollHandler);
      scrollHandlers[el.dataset.tooltipId!] = scrollHandler;
    }
  },
  beforeUnmount(el: HTMLElement, binding: DirectiveBinding<any>) {
    const options = binding.value || {};
    const { scrollClassName } = options;
    const tooltip = el.querySelector(".custom-tooltip");
    if (tooltip) {
      tooltip.remove();
    }
    const contentEl = el.closest(scrollClassName);
    if (contentEl && scrollHandlers[el.dataset.tooltipId!]) {
      contentEl.removeEventListener(
        events.scroll,
        scrollHandlers[el.dataset.tooltipId!]
      );
    }
  },
};

export default vTooltip;
