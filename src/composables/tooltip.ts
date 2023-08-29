// import { ref, onMounted, onBeforeUnmount } from "vue";
// import { positions } from "@/constants/positions";
// import { useClickOutside } from "@/composables/clickOutside";
//
// const scrollHandlers: Record<string, () => void> = {};
// export function useTooltip(content, positionClass, useClick, el, scrollClassName) {
//   const tooltip: any = ref(null);
//
//   const updateTooltipPosition = () => {
//     if (tooltip.value) {
//       const rect = el.getBoundingClientRect();
//       const scrollY = window.scrollY || window.pageYOffset;
//       const gap = 25; // Gap value in pixels
//
//       let top, left;
//       switch (positionClass) {
//         case positions.TopLeft:
//           top = rect.top + scrollY - tooltip.clientHeight - gap;
//           left = rect.left + window.scrollX;
//           break;
//         case positions.TopCenter:
//           top = rect.top + scrollY - tooltip.clientHeight - gap;
//           left =
//             rect.left +
//             window.scrollX +
//             rect.width / 2 -
//             tooltip.clientWidth / 2;
//           break;
//         case positions.TopRight:
//           top = rect.top + scrollY - tooltip.clientHeight - gap;
//           left = rect.right - tooltip.clientWidth + window.scrollX;
//           break;
//         case positions.BottomLeft:
//           top = rect.bottom + scrollY + gap;
//           left = rect.left + window.scrollX;
//           break;
//         case positions.BottomCenter:
//           top = rect.bottom + scrollY + gap;
//           left =
//             rect.left +
//             window.scrollX +
//             rect.width / 2 -
//             tooltip.clientWidth / 2;
//           break;
//         case positions.BottomRight:
//           top = rect.bottom + scrollY + gap;
//           left = rect.right - tooltip.clientWidth + window.scrollX;
//           break;
//         case positions.LeftTop:
//           top = rect.top + scrollY;
//           left = rect.left + window.scrollX - tooltip.clientWidth - gap;
//           break;
//         case positions.LeftCenter:
//           top =
//             rect.top + scrollY + rect.height / 2 - tooltip.clientHeight / 2;
//           left = rect.left + window.scrollX - tooltip.clientWidth - gap;
//           break;
//         case positions.LeftBottom:
//           top = rect.bottom + scrollY - tooltip.clientHeight - gap;
//           left = rect.left + window.scrollX - tooltip.clientWidth - gap;
//           break;
//         case positions.RightTop:
//           top = rect.top + scrollY;
//           left = rect.right + window.scrollX + gap;
//           break;
//         case positions.RightCenter:
//           top =
//             rect.top + scrollY + rect.height / 2 - tooltip.clientHeight / 2;
//           left = rect.right + window.scrollX + gap;
//           break;
//         case positions.RightBottom:
//           top = rect.bottom + scrollY - tooltip.clientHeight - gap;
//           left = rect.right + window.scrollX + gap;
//           break;
//         default:
//           top = rect.top + scrollY - tooltip.clientHeight - gap;
//           left =
//             rect.left +
//             window.scrollX +
//             rect.width / 2 -
//             tooltip.clientWidth / 2;
//           break;
//       }
//
//       tooltip.style.top = `${top}px`;
//       tooltip.style.left = `${left}px`;
//     }
//   };
//
//   const showTooltip = () => {
//     if (!tooltip.value) {
//       tooltip.value = document.createElement("div");
//       tooltip.value.className = "custom-tooltip";
//       tooltip.value.innerHTML = `
//         <div class="custom-tooltip--arrow ${positionClass}">
//           <div></div>
//         </div>
//         <div class="custom-tooltip--content">${content}</div>`;
//       document.body.appendChild(tooltip.value);
//       updateTooltipPosition();
//     }
//     tooltip.value.style.visibility = "visible";
//     useClickOutside(tooltip.value, () => {
//       if (tooltip.value.style.visibility === "visible") {
//         hideTooltip();
//       }
//     });
//   };
//
//   const hideTooltip = () => {
//     if (tooltip.value) {
//       tooltip.value.style.visibility = "hidden";
//     }
//   };
//
//   if (useClick) {
//     el.value.addEventListener("click", (event) => {
//       event.stopPropagation();
//       showTooltip();
//     });
//   } else {
//     el.value.addEventListener("mouseenter", () => {
//       showTooltip();
//     });
//
//     el.value.addEventListener("mouseleave", () => {
//       hideTooltip();
//     });
//   }
//
//   const scrollHandler = () => {
//     updateTooltipPosition();
//     if (tooltip) {
//       const tooltipRect = tooltip.getBoundingClientRect();
//       const contentBlock = el.closest(scrollClassName);
//       if (contentBlock) {
//         const contentRect = contentBlock.getBoundingClientRect();
//         if (
//           tooltipRect.bottom < contentRect.top ||
//           tooltipRect.top > contentRect.bottom
//         ) {
//           hideTooltip();
//         }
//       }
//     }
//   };
//
//   onMounted(() => {
//     const contentEl = el.value.closest(scrollClassName);
//     if (contentEl) {
//       contentEl.addEventListener("scroll", scrollHandler);
//       scrollHandlers[el.value.dataset.tooltipId!] = scrollHandler;
//     }
//   });
//
//   onBeforeUnmount(() => {
//     const options = binding.value || {};
//     const { scrollClassName } = options;
//     const tooltipEl = el.value.querySelector(".custom-tooltip");
//     if (tooltipEl) {
//       tooltipEl.remove();
//     }
//     const contentEl = el.value.closest(scrollClassName);
//     if (contentEl && scrollHandlers[el.value.dataset.tooltipId!]) {
//       contentEl.removeEventListener(
//         "scroll",
//         scrollHandlers[el.value.dataset.tooltipId!]
//       );
//     }
//   });
//
//   return {
//     tooltip,
//     showTooltip,
//     hideTooltip,
//   };
// }
