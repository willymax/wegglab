<template>
  <div class="share-network-list">
    <ShareNetwork
      v-for="network in networks"
      :key="network.network"
      :network="network.network"
      :url="sharing.url"
      :title="sharing.title"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
      :twitter-user="sharing.twitterUser"
      class="m-2"
    >
      <i :class="network.icon"></i>
    </ShareNetwork>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sharing: {
        url: 'https://news.vuejs.org/issues/180',
        title:
          'Say hi to Vite! A brand new, extremely fast development setup for Vue.',
        description:
          'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
        quote: "The hot reload is so fast it's near instant. - Evan You",
        hashtags: 'vuejs,vite,javascript',
        twitterUser: 'youyuxi',
      },
      networks: [
        {
          network: 'email',
          name: 'Email',
          icon: 'far fah fa-lg fa-envelope',
          color: '#333333',
        },
        {
          network: 'facebook',
          name: 'Facebook',
          icon: 'fab fah fa-lg fa-facebook-f',
          color: '#1877f2',
        },
        {
          network: 'reddit',
          name: 'Reddit',
          icon: 'fab fah fa-lg fa-reddit-alien',
          color: '#ff4500',
        },
        {
          network: 'skype',
          name: 'Skype',
          icon: 'fab fah fa-lg fa-skype',
          color: '#00aff0',
        },
        {
          network: 'sms',
          name: 'SMS',
          icon: 'far fah fa-lg fa-comment-dots',
          color: '#333333',
        },
        {
          network: 'messenger',
          name: 'Messenger',
          icon: 'fab fah fa-lg fa-facebook-messenger',
          color: '#0084ff',
        },
        {
          network: 'twitter',
          name: 'Twitter',
          icon: 'fab fah fa-lg fa-twitter',
          color: '#1da1f2',
        },
        {
          network: 'whatsapp',
          name: 'Whatsapp',
          icon: 'fab fah fa-lg fa-whatsapp',
          color: '#25d366',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
