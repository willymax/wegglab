<template>
  <div class="md:grid grid-cols-3 gap-2">
    <div class="col-span-2">
      <h2>Plan Name</h2>
      <p>The learning tool to take your review to the next level</p>
      <h2>PayPal</h2>
      <p>
        We'll now send you on to PayPal so that you can complete your purchase.
        After the transaction has gone through, the system will automatically
        redirect you back to Wegglab so you can enjoy your new upgrade. This
        step is highly important so we ask you to please not skip or interrupt
        it.
      </p>
      <label class="inline-flex items-start">
        <input
          type="checkbox"
          class="
            text-indigo-500
            w-14
            h-14
            mr-2
            focus:ring-indigo-400 focus:ring-opacity-25
            border border-gray-300
            rounded
          "
        />
        <span class="ml-2"
          >I authorize Wegglab to charge me automatically every year, until I
          cancel my subscription. I acknowledge that refunds are made according
          to the Terms of Use. The subscription can be canceled at any time from
          the Account and Billing section in the Profile settings. I have read,
          and agree to, TradingView's Terms of Use and Privacy Policy.</span
        >
      </label>
    </div>
    <div>
      <div class="bg-gray-200 p-2">
        <div class="flex flex-row">
          <p class="flex-1">PRO Plan</p>
          <base-label class="text-right"> $215.40 USD</base-label>
        </div>
        <hr class="h-0.5 bg-black" />
        <div class="flex flex-row">
          <div class="flex-1">
            <h2 class="text-2xl">Total</h2>
            <p>Billed every month</p>
          </div>
          <h2 class="text-2xl text-gray-700 leading-7 sm:text-3xl sm:truncate">
            $215.40 USD
          </h2>
        </div>
        <div class="bg-green-200 p-4">
          <p>
            Next payment on
            {{ subscriptionExpiresOn() }}
          </p>
        </div>
        <div class="m-2">
          <paypal-button plan-id="P-3M2534737G635851KMGHHR2A"></paypal-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseLabel from '../core-components/BaseLabel.vue'
import PaypalButton from './PaypalButton.vue'
export default {
  components: { BaseLabel, PaypalButton },
  methods: {
    subscriptionExpiresOn() {
      const date = new Date()
      const newDate = new Date(date.setMonth(date.getMonth() + 1))
      return newDate.toDateString()
    },
  },
}
</script>

<style lang="scss" scoped></style>
