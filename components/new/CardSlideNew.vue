<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="display-1">ACTIVITY</div>
      </v-card-title>
      <v-card-text>
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <div class="display-1">ACTIVITY</div>
          </v-carousel-item>
        </v-carousel>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://kinkao.co/wp-content/uploads/2020/10/3-%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B8%A3%E0%B8%B4%E0%B8%A1%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%81%E0%B8%99%E0%B9%88%E0%B8%99%E0%B9%81%E0%B8%9F%E0%B9%89%E0%B8%99%E0%B9%83%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%81%E0%B8%A3-1-1-1024x683.jpg",
        },
        {
          src: "https://kinkao.co/wp-content/uploads/2020/10/3-%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B8%A3%E0%B8%B4%E0%B8%A1%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%81%E0%B8%99%E0%B9%88%E0%B8%99%E0%B9%81%E0%B8%9F%E0%B9%89%E0%B8%99%E0%B9%83%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%81%E0%B8%A3-2-1-980x653.jpg",
        },
        {
          src: "https://kinkao.co/wp-content/uploads/2020/10/3-%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B8%A3%E0%B8%B4%E0%B8%A1%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%81%E0%B8%99%E0%B9%88%E0%B8%99%E0%B9%81%E0%B8%9F%E0%B9%89%E0%B8%99%E0%B9%83%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%81%E0%B8%A3-3-1024x683.jpg",
        },
        {
          src: "https://kinkao.co/wp-content/uploads/2020/10/3-%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B8%A3%E0%B8%B4%E0%B8%A1%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%81%E0%B8%99%E0%B9%88%E0%B8%99%E0%B9%81%E0%B8%9F%E0%B9%89%E0%B8%99%E0%B9%83%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%81%E0%B8%A3-4-1024x689.jpg",
        },
        {
          src: "https://flexmini.com/wp-content/uploads/2022/12/%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B8%A1%E0%B9%80%E0%B8%A7%E0%B8%B4%E0%B8%A3%E0%B9%8C%E0%B8%84.jpg",
        },
      ],
    };
  },
};
</script>
