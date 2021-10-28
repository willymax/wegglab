const extendRoutes = (routes, resolve) => {
  routes.push(
    {
      name: 'shop-page',
      path: '/sklepy/:id',
      component: 'pages/shop-page.vue',
    },
    {
      name: 'shops',
      path: '/sklepy',
      component: 'pages/shops-list-page.vue',
    },
    {
      name: 'categories',
      path: '/kategorie',
      component: 'pages/category-list-page.vue',
    },
    {
      name: 'category-page',
      path: '/kategorie/:id',
      component: 'pages/category-page.vue',
    },
    {
      name: 'rules',
      path: '/regulamin',
      component: 'pages/rules-page.vue',
    },
    {
      name: 'privacy policy',
      path: '/polityka-prywatnosci',
      component: 'pages/privacy-policy-page.vue',
    },
    {
      name: 'new password',
      path: '/new-password',
      component: 'pages/new-password-page.vue',
    },
    {
      name: 'cookies policy',
      path: '/polityka-cookies',
      component: 'pages/cookies-page.vue',
    },
    {
      name: 'email-confirmed',
      path: '/email-confirmed',
      component: 'pages/email-confirmed-page.vue',
    }
  )
}

export default extendRoutes
