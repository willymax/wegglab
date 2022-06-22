<template>
  <div
    class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
  >
    <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
      <h2
        class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto"
      >
        <span class="relative inline-block">
          <svg
            viewBox="0 0 52 24"
            fill="currentColor"
            class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
          >
            <defs>
              <pattern
                id="d0d83814-78b6-480f-9a5f-7f637616b267"
                x="0"
                y="0"
                width=".135"
                height=".30"
              >
                <circle cx="1" cy="1" r=".7"></circle>
              </pattern>
            </defs>
            <rect
              fill="url(#d0d83814-78b6-480f-9a5f-7f637616b267)"
              width="52"
              height="24"
            ></rect>
          </svg>
          <span class="relative">A</span>
        </span>
        Summary of your earnings
      </h2>
    </div>
    <div
      class="relative grid gap-4 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-6 sm:grid-cols-2"
    >
      <!-- <div
        class="absolute inset-0 flex items-center justify-center sm:hidden lg:flex"
      >
        <div class="w-px h-full bg-gray-300 lg:w-full lg:h-px"></div>
      </div> -->
      <div
        class="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2"
      >
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">Pending Clearance</p>
        </div>
        <p
          class="flex items-center justify-center w-2/3 h-10 font-bold rounded text-deep-purple-accent-400"
        >
          $ {{ earning.pendingClearance }}
        </p>
      </div>
      <div
        class="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2"
      >
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">Cleared</p>
        </div>
        <p
          class="flex items-center justify-center w-2/3 h-10 font-bold rounded text-deep-purple-accent-400"
        >
          $ {{ earning.cleared }}
        </p>
      </div>
      <div
        class="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2"
      >
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">Cancelled</p>
        </div>
        <p
          class="flex items-center justify-center w-2/3 h-10 font-bold rounded text-deep-purple-accent-400"
        >
          $ {{ earning.cancelled }}
        </p>
      </div>
      <div
        class="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2"
      >
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">Used for Purchases</p>
        </div>
        <p
          class="flex items-center justify-center w-2/3 h-10 font-bold rounded text-deep-purple-accent-400"
        >
          $ {{ earning.usedForPurchases }}
        </p>
      </div>
      <div
        class="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2"
      >
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">Withdrawn</p>
        </div>
        <p
          class="flex items-center justify-center w-2/3 h-10 font-bold rounded text-deep-purple-accent-400"
        >
          $ {{ earning.withdrawn }}
        </p>
      </div>
      <div
        class="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2"
      >
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">Total Earning</p>
        </div>
        <p
          class="flex items-center justify-center w-2/3 h-10 font-bold rounded text-deep-purple-accent-400"
        >
          $ {{ earning.totalEarning }}
        </p>
      </div>
    </div>
    <base-table resource="payments" table-title="Payments" :hide-actions="true">
      <template #customColumns>
        <el-table-column
          key="id"
          label="Id"
          min-width="100px"
          prop="_id"
        ></el-table-column>
        <el-table-column
          key="createdAt"
          label="Date"
          min-width="100px"
          prop="createdAt"
          :sortable="true"
        ></el-table-column>
        <el-table-column
          key="description"
          label="Description"
          min-width="200px"
          prop="description"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.description }}(</span>
            <span
              ><nuxt-link
                :to="`/questions/${scope.row.question._id}`"
                class="underline cursor-pointer"
                >question</nuxt-link
              ></span
            ><span>)</span>
          </template></el-table-column
        >
        <el-table-column
          key="amount"
          label="Amount"
          min-width="50px"
          align="right"
          prop="amount"
          ><template slot-scope="scope">
            <span>${{ scope.row.amount }}</span>
          </template></el-table-column
        >
      </template>
      <template #actions></template
    ></base-table>
  </div>
</template>

<script>
import { TableColumn } from 'element-ui'
import BaseTable from '~/components/tables/BaseTable.vue'
export default {
  components: { BaseTable, [TableColumn.name]: TableColumn },
  layout: 'ResponsiveDashboard',
  data() {
    return {
      earning: {
        cancelled: 0,
        pendingClearance: 0,
        cleared: 0,
        withdrawn: 0,
        usedForPurchase: 0,
        totalEarning: 0,
      },
    }
  },
  mounted() {
    this.loadEarnings()
  },
  methods: {
    loadEarnings() {
      //
      this.$axios
        .get(`earning-stats/user/${this.$auth.user.id}`)
        .then((response) => {
          this.earning = response.data
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
