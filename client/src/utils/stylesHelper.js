import { createTheme } from "@material-ui/core/styles";

export const DEFAULT_MATERIAL_THEME = createTheme({
  overrides: {
    MuiPickersCalendarHeader: {
      switchHeader: {
        color: "#425664",
        textTransform: "uppercase",
      },
      dayLabel: {
        textTransform: "uppercase",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#425664",
      },
      daySelected: {
        backgroundColor: "#C6AD8F",
        "&:hover": {
          backgroundColor: "#C6AD8F",
        },
      },
      current: {
        color: "#C6AD8F",
      },
    },
  },
});
