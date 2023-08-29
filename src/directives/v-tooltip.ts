import { DirectiveBinding } from "vue";

const scrollHandlers: Record<string, () => void> = {};

const TooltipDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
    const options = binding.value || {};
    const { content, scrollClassName, useClick } = options;

    if (!content) {
      console.error("Tooltip content is missing.");
      return;
    }

    let tooltip: HTMLDivElement | null = null;

    const updateTooltipPosition = () => {
      if (tooltip) {
        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        tooltip.style.top = `${rect.bottom + scrollY}px`;
        tooltip.style.left = `${rect.left + window.scrollX}px`;
      }
    };

    const showTooltip = () => {
      if (!tooltip) {
        tooltip = document.createElement("div");
        tooltip.className = "custom-tooltip";
        tooltip.textContent = content;
        document.body.appendChild(tooltip);
        updateTooltipPosition();
      }
      tooltip.style.visibility = "visible";
    };

    const hideTooltip = () => {
      if (tooltip) {
        tooltip.style.visibility = "hidden";
      }
    };

    const toggleTooltip = () => {
      if (tooltip && tooltip.style.visibility === "visible") {
        hideTooltip();
      } else {
        showTooltip();
      }
    };

    if (useClick) {
      el.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleTooltip();
      });

      document.body.addEventListener("click", (event) => {
        if (tooltip && !tooltip.contains(event.target as Node)) {
          hideTooltip();
        }
      });
    } else {
      el.addEventListener("mouseenter", () => {
        showTooltip();
      });

      el.addEventListener("mouseleave", () => {
        hideTooltip();
      });
    }

    const scrollHandler = () => {
      updateTooltipPosition();
      if (tooltip) {
        const tooltipRect = tooltip.getBoundingClientRect();
        const contentBlock = el.closest(scrollClassName);
        if (contentBlock) {
          const contentRect = contentBlock.getBoundingClientRect();
          if (
            tooltipRect.bottom < contentRect.top ||
            tooltipRect.top > contentRect.bottom
          ) {
            hideTooltip();
          }
        }
      }
    };

    const contentEl = el.closest(scrollClassName);
    if (contentEl) {
      contentEl.addEventListener("scroll", scrollHandler);
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
        "scroll",
        scrollHandlers[el.dataset.tooltipId!]
      );
    }
  },
};

export default TooltipDirective;
