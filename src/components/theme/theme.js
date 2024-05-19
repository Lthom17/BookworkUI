
import { createTheme } from "@mui/system";

export const customTheme = createTheme({
  components: {
    TextFieldStyled: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
      variants: [
        {
          props: {
            variant: "formInput",
          },
          style: { color: "#000", border: "none", width: 350},
        },
      ],
    },
  },
});
