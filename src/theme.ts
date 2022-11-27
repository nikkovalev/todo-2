import { type ThemeConfig, extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
  } as ThemeConfig,
  components: {
    Button: {
      baseStyle: {
        textColor: "white",
      },
      variants: {
        red: {
          bg: "red.500",
          _hover: {
            bg: "red.600",
          },
        },
        red_o: {
          border: "1px solid #C53030",
          color: "#C53030",
          _hover: {
            color: "#ffffff",
            background: "#C53030",
          },
        },
        green: {
          bg: "green.500",
          _hover: {
            bg: "green.600",
          },
        },
        green_o: {
          border: "1px solid #38A169",
          color: "#38A169",
          _hover: {
            color: "#ffffff",
            background: "#38A169",
          },
        },
        blue: {
          bg: "blue.500",
          _hover: {
            bg: "blue.600",
          },
        },
        blue_o: {
          border: "1px solid #3182ce",
          color: "#3182ce",
          _hover: {
            color: "#ffffff",
            background: "#3182ce",
          },
        },
        yellow: {
          bg: "yellow.500",
          _hover: {
            bg: "yellow.600",
          },
        },
      },
    },
  },
});
