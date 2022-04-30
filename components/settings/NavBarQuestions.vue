<template>
  <div>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/questions/setting">My Questions</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/questions/watching/">Watching</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/questions/answers/">My Answers</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
/* home route and active route will show in bold as it matches / and /about */
a.nuxt-link-active {
  font-weight: bold;
  border-bottom: 1px solid #000;
  padding-bottom: 3px;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
li {
  margin: 0 0.5rem;
  padding: 0.25rem;
}
nav {
  padding: 0 1rem;
}
a,
a:visited {
  text-decoration: none;
  color: inherit;
}
a:hover {
  color: #00c58e;
}
</style>
