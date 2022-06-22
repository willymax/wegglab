<template>
  <div>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/profile/">Profile</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/profile/password/">Change Password</NuxtLink>
        </li>
        <!-- <li>
          <NuxtLink to="/payments/">Payments</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/profile/subscription/">Subscription</NuxtLink>
        </li> -->
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'ProfileNavBar',
}
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
