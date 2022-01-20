export const actions = {
  async forgotPassword({ commit }, data) {
    await this.$axios.post('auth/send-password-reset', { ...data })
  },
  async createNewPassword({ commit }, data) {
    await this.$axios.post('password-reset', { data })

    const loginData = {
      data: {
        type: 'token',
        attributes: {
          email: data.attributes.email,
          password: data.attributes.password,
        },
      },
    }

    this.$auth.loginWith('local', { data: loginData })
  },
}
