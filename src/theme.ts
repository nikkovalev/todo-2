import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
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
        green: {
          bg: "green.500",
          _hover: {
            bg: "green.600",
          },
        },
        blue: {
          bg: "blue.500",
          _hover: {
            bg: "blue.600",
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
