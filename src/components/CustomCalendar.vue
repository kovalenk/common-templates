<template lang="pug">
.common-calendar
  .calendar-input(@click="isOpen = !isOpen")
    input#calendar(
      v-model="calendar",
      name="calendar",
      :placeholder="placeholder",
      type="text"
    )
    i
      svg.w-6.h-6(
        xmlns="http://www.w3.org/2000/svg",
        fill="none",
        viewBox="0 0 24 24",
        stroke-width="1.5",
        stroke="currentColor"
      )
        path(
          stroke-linecap="round",
          stroke-linejoin="round",
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
        )
  .calendar-wrapper
    .calendar(v-if="isOpen")
      .calendar--preselect(v-if="isRange")
        button(@click="selectRange(Ranges.Week)") This week
        button(@click="selectRange(Ranges.LWeek)") Last week
        button(@click="selectRange(Ranges.Month)") Last month
        button(@click="selectRange(Ranges.LQuarter)") Last quarter
      .calendar--content
        .container
          .calendar--title
            .header
              i(@click="() => (currentDate = currentDate.add(-1, 'month'))")
                svg.w-6.h-6(
                  xmlns="http://www.w3.org/2000/svg",
                  fill="none",
                  viewBox="0 0 24 24",
                  stroke-width="1.5",
                  stroke="currentColor"
                )
                  path(
                    stroke-linecap="round",
                    stroke-linejoin="round",
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  )
              p {{ currentDate.format("MMMM YYYY") }}
              i.right(
                v-if="!isRange",
                @click="() => (currentDate = currentDate.add(1, 'month'))"
              )
                svg.w-6.h-6(
                  xmlns="http://www.w3.org/2000/svg",
                  fill="none",
                  viewBox="0 0 24 24",
                  stroke-width="1.5",
                  stroke="currentColor"
                )
                  path(
                    stroke-linecap="round",
                    stroke-linejoin="round",
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  )
            .header(v-if="isRange")
              p {{ currentDate.add(1, "month").format("MMMM YYYY") }}
              i.right(
                @click="() => (currentDate = currentDate.add(1, 'month'))"
              )
                svg.w-6.h-6(
                  xmlns="http://www.w3.org/2000/svg",
                  fill="none",
                  viewBox="0 0 24 24",
                  stroke-width="1.5",
                  stroke="currentColor"
                )
                  path(
                    stroke-linecap="round",
                    stroke-linejoin="round",
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  )
          .calendar--days
            .calendar--column(
              v-for="(item, index) in isRange ? [0, 1] : [0]",
              :key="index"
            )
              .week-days
                span(v-for="weekDay in days", :key="weekDay") {{ weekDay }}
              .days-grid
                span(
                  v-for="day in generateDays(currentDate.add(item, 'month').get('year'), currentDate.add(item, 'month').get('month'))",
                  @click="selectDay(day.date)",
                  :class="dayClass(day, currentDate.add(item, 'month').get('month'))"
                ) {{ day.date.format("DD") }}
      .calendar--footer
        .footer-inputs
          input#from(
            v-model="dateFrom",
            name="from",
            type="text",
            placeholder="Select range"
          )
          template(v-if="isRange")
            span.separator -
            input#to(
              v-model="dateTo",
              name="to",
              type="text",
              placeholder="Select range"
            )
        button.submit(@click="submit")
          i
          | Apply
</template>
<script setup lang="ts">
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { ref, defineProps, computed } from "vue";

dayjs.extend(isBetween);
dayjs.extend(quarterOfYear);

enum Ranges {
  Week = "week",
  LWeek = "last-week",
  Month = "month",
  LQuarter = "last-quarter",
}

const props = defineProps({
  isRange: {
    default: false,
  },
  placeholder: String,
});

const isOpen = ref(false);
const calendar = ref("");
const customSelect = ref(null);
const firstDate = ref(dayjs(0));
const secondDate = ref(dayjs(0));
const currentDate = ref(dayjs(new Date()));
const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const dateFrom = computed(() => {
  if (firstDate.value.unix()) {
    return firstDate.value.format("DD/MM/YYYY");
  }
  return "";
});
const dateTo = computed(() => {
  if (secondDate.value.unix()) {
    return secondDate.value.format("DD/MM/YYYY");
  }
  return "";
});

const generateDays = (year: number, month: number) => {
  const resArray = new Array(42) as { active: boolean; date: Dayjs }[];
  const date = dayjs(`${year}-${month + 1}-01`, "YY-MM-DD");

  const firstDay = date.day();
  const startIndex = firstDay - 1 > -1 ? firstDay - 1 : 6;

  for (let i = startIndex; i < date.daysInMonth() + startIndex; i++) {
    resArray[i] = {
      active: true,
      date: date.add(i - startIndex, "day"),
    };
  }

  const datePrev = date.add(-1, "month").endOf("month");
  const prevCount = resArray.findIndex((el) => el);

  for (let i = 0; i < prevCount; i++) {
    resArray[i] = {
      active: false,
      date: datePrev.add(-1 * (prevCount - i - 1), "day"),
    };
  }

  const dateNext = date.add(1, "month").startOf("month");
  const nextCount = resArray.findLastIndex((el) => el);

  for (let i = nextCount + 1; i < resArray.length; i++) {
    resArray[i] = {
      active: false,
      date: dateNext.add(i - nextCount - 1, "day"),
    };
  }

  return resArray;
};

const selectDay = (date: Dayjs) => {
  if (!firstDate.value.unix()) {
    firstDate.value = date;
  } else if (!secondDate.value.unix()) {
    if (date.isBefore(firstDate.value)) {
      secondDate.value = firstDate.value;
      firstDate.value = date;
    } else {
      secondDate.value = date;
    }
  } else {
    firstDate.value = dayjs(0);
    secondDate.value = dayjs(0);
    selectDay(date);
  }
};

const dayClass = (day: any, month: number) => {
  let rules = [];
  const currentDate = day.date;
  if (currentDate.month() === month) {
    if (day.date.isSame(secondDate.value, "day")) {
      return `active end-active`;
    } else if (day.date.isSame(firstDate.value, "day")) {
      return `active begin-active`;
    } else if (
      secondDate.value.unix() &&
      day.date.isBetween(firstDate.value, secondDate.value, "day", "[]")
    ) {
      return "range";
    }
  } else {
    rules.push("inactive");
  }
  return rules.join(" ");
};

const selectRange = (range: Ranges) => {
  switch (range) {
    case Ranges.Week:
      firstDate.value = dayjs().startOf("week");
      secondDate.value = dayjs().endOf("week");
      break;
    case Ranges.LWeek:
      firstDate.value = dayjs().subtract(1, "week").startOf("week");
      secondDate.value = dayjs().subtract(1, "week").endOf("week");
      break;
    case Ranges.Month:
      firstDate.value = dayjs().subtract(1, "month").startOf("month");
      secondDate.value = dayjs().subtract(1, "month").endOf("month");
      break;
    case Ranges.LQuarter:
      firstDate.value = dayjs().subtract(1, "quarter").startOf("quarter");
      secondDate.value = dayjs().subtract(1, "quarter").endOf("quarter");
      break;
    default:
      break;
  }
};

const submit = () => {
  calendar.value = `${dateFrom.value} ${dateTo.value}`;
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
.right {
  rotate: 180deg;
}
.common-calendar {
  position: relative;
  display: flex;
  flex-direction: column;

  color: black;
  font-size: 14px;
  font-weight: 400;

  .calendar-input {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    min-width: 170px;

    input {
      display: flex;
      width: 100%;
      margin: 0;
      font-weight: 700;
      pointer-events: none;
      border-radius: 8px;
      height: 48px;
      font-size: 16px;
      padding: 8px 48px 8px 8px;
    }
    i {
      position: absolute;
      top: 4px;
      right: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
  }
  .calendar-wrapper {
    position: relative;
    width: 100%;
    height: 0;

    .calendar {
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: white;
      border: 1px solid black;
      border-radius: 8px;
      padding: 16px;
      position: absolute;
      top: 5px;
      right: 0;

      &--preselect {
        display: flex;
        justify-content: center;
        gap: 8px;
        width: 100%;
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 120px;
          height: 40px;
          border-radius: 8px;
          border: 1px black solid;
        }
      }

      &--content {
        display: flex;
        gap: 20px;
        justify-content: space-between;

        .container {
          display: flex;
          flex-direction: column;
        }
      }
      &--title {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        width: 100%;

        .header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 20px;
          font-weight: 700;

          i {
            min-width: 40px;
            max-width: 40px;
            height: 40px;

            svg {
              width: 40px;
              height: 40px;
            }
          }

          p {
            width: 100%;
            text-align: center;
          }
        }
      }
      &--days {
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 20px;
      }
      &--column {
        display: flex;
        flex-direction: column;
        align-items: center;
        .week-days {
          display: flex;

          span {
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #b1afae;
            font-weight: 600;
          }
        }
        .days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-template-rows: repeat(6, 1fr);
          grid-column-gap: 0;
          grid-row-gap: 0;

          span {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            font-size: 16px;
            font-weight: 600;

            &:hover {
              background: #ecebeb;
            }

            &.inactive {
              color: #b1afae;
              pointer-events: none;
              background: transparent;
            }
            &.active {
              background: black;
              color: white;
              border-radius: 8px;

              &.begin-active {
                border-radius: 8px 0 0 8px;
              }
              &.end-active {
                border-radius: 0 8px 8px 0;
              }
            }
            &.range {
              background: #b1afae;
            }
          }
        }
      }
      &--footer {
        display: flex;
        gap: 12px;
        width: 100%;
        height: 48px;
        .footer-inputs {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 16px;
          font-weight: 700;

          input {
            height: 100%;
            padding: 8px;
            border-radius: 8px;
            border: 1px solid black;
          }
        }
        .submit {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          background: black;
          color: white;
          font-size: 18px;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          max-width: 100px;
        }
      }
    }
  }
}
</style>
