/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import twAnimate from "tailwindcss-animate";

const generateColorClass = (variable) => {
  return (props) => {
    const { opacityValue } = props;
    return opacityValue
      ? `hsla(var(--hsl-clr-${variable}), ${opacityValue})`
      : `hsl(var(--hsl-clr-${variable}))`;
  };
};

// module.exports = {
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  options: {
    safelist: ["self-end", "sm:self-center", "rounded-t-3xl"],
  },
  theme: {
    container: {
      padding: {
        DEFAULT: "16px",
      },
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: ["22px"],
      "2xl": ["26px"],
      "3xl": ["32px", "1"],
      "4xl": ["48px", "1"],
      "6xl": ["65px", "1"],
      "8xl": ["96px", "1"],
    },
    extend: {
      fontFamily: {
        krona: ["Krona One", "sans-serif"],
        major: ["Major", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        warning: generateColorClass("warning"),
        secondary: generateColorClass("secondary"),
        primary: generateColorClass("primary"),
        danger: generateColorClass("danger"),
        success: generateColorClass("success"),
        dark: generateColorClass("dark"),
        "dark-l": generateColorClass("dark-l"),
        light: generateColorClass("light"),
        "light-l": generateColorClass("light-l"),
        "dark-variant": generateColorClass("dark-variant"),
        "dark-xxx": generateColorClass("dark-xxx"),
        muted: generateColorClass("muted"),
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
        bs: "0.25em 0.25em 0.75em hsla(0, 0%, 0%, 0.25), 0.125em 0.125em 0.25em hsla(0, 0%, 0%, 0.15)",
        "bs-2":
          "0 0 0.75em hsla(0, 0%, 0%, 0.25), 0 0 0.25em hsla(0, 0%, 0%, 0.15)",
        "bs-pri":
          "0.25em 0.25em 1.5em hsla(0, 0%, 0%, 0.3), 0em 0em 0.5em hsla(0, 0%, 0%, 0.35)",
        "bs-sec": "0.3rem 0.1rem 2rem hsla(0, 0%, 0%, 0.3)",
      },
      backgroundImage: {
        gridArea: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E")`,
      },
      screens: {
        wide: "1440px",
        xs: "370px",
      },
      backgroundColor: {},
      keyframes: {
        inOpacity: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
      animation: {
        inOpacity: "inOpacity 300ms ease-in-out 150ms forwards",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  plugins: [
    plugin(({ addBase, theme, addUtilities }) => {
      // CODE:
      addBase({
        /* Details Illustration */
        button: {
          backgroundColor: "transparent",
        },
      });

      // CODE:
      const customUtilities = {};
      const colors = theme("colors");
      // Buttons
      for (const color in colors) {
        let color1;
        if (typeof colors[color] === "object") {
          color1 = colors[color]["600"];
        } else if (typeof colors[color] === "function") {
          color1 = colors[color](color);
        } else {
          continue;
        }
        customUtilities[`.btn-${color}`] = {
          backgroundColor: color1,
          borderColor: color1,
          // color: colors["light"]("light"),
        };
      }

      // Details
      for (const color in colors) {
        if (typeof colors[color] === "function") {
          const color2 = colors[color](color);
          customUtilities[`.detail-${color}`] = {
            backgroundColor: `hsla(var(--hsl-clr-${color}), ${0.15})`,
            color: color2,
          };
        }
      }

      addUtilities({
        ...customUtilities,
        ".flex-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },

        ".detail": {
          padding: "5px 10px",
          fontSize: "smaller",
          borderRadius: "5px",
        },
        ".section-p": {
          paddingBlock: "60px",
          overflow: "hidden",
        },
      });
    }),
    twAnimate,
  ],
};
// filter: drop-shadow(0 0 2em #61dafbaa);
