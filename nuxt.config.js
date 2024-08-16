import colors from "vuetify/es5/util/colors";

export default {
  serverMiddleware: [
    "~/api/auth.js",
    "~/api/room.js",
    "~/api/program.js",
    "~/api/department.js",
    "~/api/device.js",
    "~/api/drink.js",
    "~/api/food.js",
    "~/api/position.js",
    "~/api/role.js",
    "~/api/status.js",
    "~/api/user.js",
    "~/api/meetingType.js",
    "~/api/booking.js",
    "~/api/contentType.js",
    "~/api/contentStatus.js",
    "~/api/reward.js",
    "~/api/rewardImg.js",
    "~/api/uploads.js",
    "~/api/uploads-content.js",
    "~/api/uploads-reward.js",
    "~/api/content.js",
    "~/api/admin/content.js",
    "~/api/admin/user.js",
    "~/api/admin/point.js",
    "~/api/contentImg.js",
    "~/api/contentCoverImg.js",
    "~/api/point.js",
  ],

  components: true,

  head: {
    titleTemplate: "%s - NER",
    title: "NER",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "favicon.ico" }],
  },

  css: ["~assets/global.scss"],

  plugins: [],

  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/moment", "@nuxtjs/pwa"],

  moment: {
    defaultLocale: "th",
    locales: ["th"],
    defaultTimezone: "Asia/Bangkok",
  },

  modules: ["@nuxtjs/axios", "@nuxtjs/auth", "nuxt-sweetalert2"],

  axios: {
    baseUrl: "/",
  },

  router: {
    middleware: ["auth"],
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: "data.token",
          global: true,
          required: true,
          type: "Bearer",
        },

        endpoints: {
          login: { url: "/api/auth/login", method: "post" },
          user: false,
          logout: false,
        },
      },
    },

    redirect: {
      login: "/login",
      logout: "/",
      callback: "/login",
      home: "/",
    },
  },

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: "#3470B8",
          secondary: "#FFFFFF",
          success: "#1DAE4B",
          error: "#b71c1c",
        },
      },
    },
  },

  // mode: "universal",

  build: {},

  server: {
    port: 9390, // default: 3000
    host: "0.0.0.0", // default: localhost
  },
};
