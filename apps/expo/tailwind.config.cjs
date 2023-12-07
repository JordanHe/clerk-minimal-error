/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@acme/tailwind-config")],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "montserrat-regular": ["Montserrat-Regular", "sans-serif"],
        "montserrat-bold": ["Montserrat-Bold", "sans-serif"],
        "montserrat-italic": ["Montserrat-Italic", "sans-serif"],
        "montserrat-light": ["Montserrat-Light", "sans-serif"],
        "montserrat-thin": ["Montserrat-Thin", "sans-serif"],
        "montserrat-black": ["Montserrat-Black", "sans-serif"],
      },

      colors: {
        "primary-050": "#E0E8F9",
        "primary-100": "#BED0F7",
        "primary-200": "#98AEEB",
        "primary-300": "#7B93DB",
        "primary-400": "#647ACB",
        "primary-500": "#4C63B6",
        "primary-600": "#4055A8",
        "primary-700": "#35469C",
        "primary-800": "#2D3A8C",
        "primary-900": "#19216C",

        "neutral-050": "#F5F7FA",
        "neutral-100": "#E4E7EB",
        "neutral-200": "#CBD2D9",
        "neutral-300": "#9AA5B1",
        "neutral-400": "#7B8794",
        "neutral-500": "#616E7C",
        "neutral-600": "#52606D",
        "neutral-700": "#3E4C59",
        "neutral-800": "#323F4B",
        "neutral-900": "#1F2933",

        "supporting-050": "#E3F8FF",
        "supporting-100": "#B3ECFF",
        "supporting-200": "#81DEFD",
        "supporting-300": "#5ED0FA",
        "supporting-400": "#40C3F7",
        "supporting-500": "#2BB0ED",
        "supporting-600": "#1992D4",
        "supporting-700": "#127FBF",
        "supporting-800": "#0B69A3",
        "supporting-900": "#035388",

        "error-050": "#FFE3E3",
        "error-100": "#FFBDBD",
        "error-200": "#FF9B9B",
        "error-300": "#F86A6A",
        "error-400": "#EF4E4E",
        "error-500": "#E12D39",
        "error-600": "#CF1124",
        "error-700": "#AB091E",
        "error-800": "#8A041A",
        "error-900": "#610316",

        "warning-050": "#FFFBEA",
        "warning-100": "#FFF3C4",
        "warning-200": "#FCE588",
        "warning-300": "#FADB5F",
        "warning-400": "#F7C948",
        "warning-500": "#F0B429",
        "warning-600": "#DE911D",
        "warning-700": "#CB6E17",
        "warning-800": "#B44D12",
        "warning-900": "#8D2B0B",

        "success-050": "#EFFCF6",
        "success-100": "#C6F7E2",
        "success-200": "#8EEDC7",
        "success-300": "#65D6AD",
        "success-400": "#3EBD93",
        "success-500": "#27AB83",
        "success-600": "#199473",
        "success-700": "#147D64",
        "success-800": "#0C6B58",
        "success-900": "#014D40",

        peach: "#FE6F64",
        "ice-lavender": "#EBF1FF",
        "ice-lavender-300": "#D9E2F7",
        "off-black": "#1C1C1C",
        "off-black-300": "#313131",

        "purple-enhanced": "#9DABFF",
        "purple-base": "#B5BBDF",
        "purple-light": "#E2E6FF",
        "purple-dark": "#535564",

        "pink-enhanced": "#FF7ABA",
        "pink-base": "#EE97C1",
        "pink-light": "#FFCCE5",
        "pink-dark": "#824D67",

        "green-enhanced": "#ACFF68",
        "green-base": "#ABD589",
        "green-light": "#E4FFCE",
        "green-dark": "#536941",

        "apple-health": "#FF3252",
        "apple-activity": "#FF3F15",
      },
    },
  },
};
