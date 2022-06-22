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
