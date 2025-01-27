# Combined CSS / DSA Challenge

##  Front End Exercise

For this exercise, please do not include any additional external libraries.

We have a web page using Vue that shows a series of random content blocks in three columns. The blocks might span one, two, or all three columns.  Here’s the page:

```html
<html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Front End Exercise</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style type="text/css">
    html {
      margin: 0;
      padding: 0;
/*      background: linear-gradient(45deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%);*/
    }
    body {
      margin: 0;
      padding: 10px;
    }
    #app {
      display: flex;
      flex-wrap: wrap;
/*      gap: 10px;*/
    }
    #app > div {
      --span: 1;
      aspect-ratio: var(--span) / 1;
      flex-basis: calc(calc(calc(var(--span) / 3) * 100%));
      background: hsla(197, 100%, 63%, 1);
      border: 10px solid white;
      border-radius: 15px;
      text-align: center;
      box-sizing: border-box;
      padding: 10px;
    }
  </style>
  <script type="text/javascript">
/////////////////
// DO NOT EDIT //
/////////////////

const fetchData = (() => {
  const fakeData = [];
  const dataCount = Math.floor(Math.random() * 200) + 50;

  for (let i = 0; i < dataCount; i++) {
    fakeData.push({
      id: i + 1,
      span: Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : 1,
    });
  }

  return (startIndex, endIndex) => {
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          length: fakeData.length,
          data: fakeData.slice(startIndex, endIndex),
        });
      }, 333);
    });
    return p;
  };
})();

////////////////////////
// END of DO NOT EDIT //
////////////////////////
  </script>
  </head>
  <body>
    <section id="app">
      <div v-for="d in sortedData" :style="{ '--span': d.span }" :key="d.id">{{ d.id }}</div>
      <button id="load" @click="getNextPage">Load more…</button>
    </section>
    <script type="text/javascript">
const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    const columns = 3;
    const pageSize = 10;
    const lastFetchedIndex = ref(0);
    const data = ref({ length: 0, data: [] });
    const sortedData = computed(() => {
      const s = [...data.value.data];
      // Problem 1: your code here…
      return s;
    });
    async function getNextPage() {
      const d = await fetchData(
        lastFetchedIndex.value,
        lastFetchedIndex.value + pageSize
      );
      lastFetchedIndex.value = lastFetchedIndex.value + d.data.length;
      data.value = { length: d.length, data: [...data.value.data, ...d.data] };
    }
    onMounted(() => {
      getNextPage();
    });
    return {
      data,
      sortedData,
      lastFetchedIndex,
      getNextPage,
    };
  },
}).mount('#app');
      </script>
  </body>
</html>

```

## Problem 1

If we just display the blocks in order, they look untidy, like on the left below. We want them to look neat but as close to their original order as possible, like on the right.

![Pasted_Image_11_19_24__1_45 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/4ac9568d-a708-480d-ac84-6ac30578a4a2/d35f41de-191a-4133-9e4f-9d6ce8173583/Pasted_Image_11_19_24__1_45_PM.png)

Since a masonry layout isn’t supported in CSS yet, how can we order the data to get the results we want?

## Problem 2

Whoever made this page has a button that you need to click to load more content. Instead of making the user click on it, load more content whenever that button becomes visible for infinite scrolling! 

## Problem 3

We spaced out the blocks of content using white borders. That’s cheating, and it prevents our super cool gradient background from showing! We could make the borders transparent, but we want to get rid of them altogether — we want to use the `gap` css attribute of the `#app`container element to space the blocks out. In the CSS, let’s comment out the `border` definition and uncomment the `background` on the `html` and the `gap` on the `#app`.  Our css now looks like this:

```css
    html {
      margin: 0;
      padding: 0;
      background: linear-gradient(45deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%);
    }
    body {
      margin: 0;
      padding: 10px;
    }
    #app {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    #app > div {
      --span: 1;
      aspect-ratio: var(--span) / 1;
      flex-basis: calc(calc(var(--span) / 3) * 100%);
      background: hsla(197, 100%, 63%, 1);
/*      border: 10px solid white;*/
      border-radius: 15px;
      text-align: center;
      box-sizing: border-box;
      padding: 10px;
    }
```

The problem is, this changes the space available for the blocks so they don’t fit any more, as seen on the left. What we want is on the right.

![Pasted_Image_11_19_24__3_28 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/4ac9568d-a708-480d-ac84-6ac30578a4a2/988ab414-ad4d-4d9c-b0f8-442a530b62f2/Pasted_Image_11_19_24__3_28_PM.png)

There are many ways to fix this — feel free to change the CSS, HTML, or script if necessary.