import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Leajlak",
  version: packageJson.version,
  copyright: `© ${currentYear}, Leajlak.`,
  meta: {
    title: "Leajlak - Smart Delivery Management Software",
    description:
      "Leajlak is a modern delivery management platform for businesses to assign, track, and optimize orders in real time. Improve delivery speed, reduce operational overhead, and manage captains effortlessly.",
  },
};
