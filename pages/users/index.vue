<template>
  <div class="container mt-5">
    <base-table
      :resource="resource"
      :params="params"
      table-title="User List"
      :hide-actions="true"
    >
      <template #customColumns>
        <el-table-column
          label="Id"
          min-width="220px"
          prop="id"
          sortable="custom"
        >
          <template slot-scope="scope">
            <nuxt-link
              :to="`/users/${scope.row._id}`"
              class="underline cursor-pointer"
              >{{ scope.row._id }}</nuxt-link
            >
          </template>
        </el-table-column>

        <el-table-column
          label="First Name"
          min-width="150px"
          prop="first_name"
          sortable="custom"
        />
        <el-table-column
          label="Last Name"
          min-width="150px"
          prop="last_name"
          sortable="custom"
        />
        <el-table-column
          label="Role"
          min-width="150px"
          prop="role"
          sortable="custom"
        />
        <el-table-column
          label="Email"
          min-width="150px"
          prop="email"
          sortable="custom"
        />
        <el-table-column
          label="Account Status"
          min-width="150px"
          prop="accountStatus"
          sortable="custom"
        />
        <el-table-column
          label="Paypal Email"
          min-width="150px"
          prop="paypalEmail"
          sortable="custom"
        />
        <el-table-column
          label="Total Earning"
          min-width="150px"
          prop="earning.cancelled"
          sortable="custom"
        />
        <el-table-column
          label="Pending Clearance"
          min-width="150px"
          prop="earning.pendingClearance"
          sortable="custom"
        />
        <el-table-column
          label="Cleared"
          min-width="150px"
          prop="earning.cleared"
          sortable="custom"
        />
        <el-table-column
          label="Withdrawn"
          min-width="150px"
          prop="earning.withdrawn"
          sortable="custom"
        />
        <el-table-column
          label="Used For Purchase"
          min-width="150px"
          prop="earning.usedForPurchase"
          sortable="custom"
        />
        <el-table-column
          label="Cancelled"
          min-width="150px"
          prop="earning.cancelled"
          sortable="custom"
        />
        <el-table-column
          label="Created At"
          prop="createdAt"
          min-width="140px"
          sortable="custom"
        />
        <el-table-column
          min-width="180px"
          align="center"
          fixed="right"
          label="Operations"
        >
          <template slot-scope="scope">
            <div class="table-actions">
              <el-tooltip content="Edit" placement="top">
                <a
                  type="text"
                  class="table-action"
                  data-toggle="tooltip"
                  style="cursor: pointer"
                  @click="onProFeature"
                >
                  <i class="fas fa-user-edit"></i>
                </a>
              </el-tooltip>

              <el-tooltip content="Delete" placement="top">
                <a
                  type="text"
                  class="table-action table-action-delete"
                  data-toggle="tooltip"
                  style="cursor: pointer"
                  @click="onProFeature"
                >
                  <i class="fas fa-trash"></i>
                </a>
              </el-tooltip>

              <el-tooltip content="Pay Expert" placement="top">
                <base-button @click="initiatePayment(scope.row, scope.$index)"
                  >Pay Expert</base-button
                >
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </template>
    </base-table>
    <app-modal :show.sync="showPayDialog">
      <p>
        Pay Expert: {{ selectedUser.first_name }} {{ selectedUser.last_name }}
      </p>
      <p>Total Amount Cleared: {{ selectedUser.earning.cleared }}</p>
      <p>PayPal Email: {{ selectedUser.paypalEmail }}</p>
      <base-input
        v-model="amountToPay"
        alternative
        class="mb-3"
        placeholder="Amount"
        name="Amout"
        label="Enter the Amout"
      ></base-input>
      <template #footer>
        <base-button width="md:w-64 w-full" @click="payExpert()"
          >Pay Expert</base-button
        >
      </template>
    </app-modal>
  </div>
</template>
<script>
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Tooltip,
  Select,
  Option,
  Button,
} from 'element-ui'
import { BasePagination } from '@/components/core-components'
import BaseTable from '~/components/tables/BaseTable.vue'
import BaseInput from '~/components/core-components/Inputs/BaseInput.vue'

export default {
  components: {
    BasePagination,
    [Tooltip.name]: Tooltip,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
    BaseTable,
    BaseInput,
  },
  layout: 'ResponsiveDashboard',

  data() {
    return {
      showPayDialog: false,
      amountToPay: null,
      selectedRowIndex: -1,
      selectedRows: [],
      selectedUser: {
        earning: {},
      },
      users: [],
      sort: 'createdAt',

      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
      },

      total: 1,
    }
  },
  computed: {
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1)
    },

    to() {
      let highBound = this.from + this.pagination.perPage
      if (this.total < highBound) {
        highBound = this.total
      }
      return highBound
    },
    resource() {
      return 'users'
    },
    params() {
      return {
        role: this.$route.query.type || null,
      }
    },
  },
  watch: {
    'pagination.currentPage'(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getItems()
      }
    },
    'pagination.perPage'(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getItems()
      }
    },
  },
  mounted() {
    this.getItems()
  },

  methods: {
    initiatePayment(user, index) {
      this.selectedUser = user
      this.selectedRowIndex = index
      this.showPayDialog = true
      //
    },
    async payExpert(user) {
      const response = await this.$axios.post('payments/payExpert', {
        userId: this.selectedUser._id,
        amount: this.amountToPay,
      })

      this.showPayDialog = false
      this.$notify({
        type: 'success',
        text: 'Withdrawal sent. Make payment via Paypal.',
      })
    },
    getItems() {
      const that = this
      this.$axios
        .get(`users`, {
          params: {
            perPage: this.pagination.perPage,
            page: this.pagination.currentPage,
          },
        })
        .then((response) => {
          // handle success
          that.users = response.data.data
          that.pagination.currentPage = response.data.paginator.currentPage
          that.pagination.perPage = parseInt(response.data.paginator.perPage)
          that.total = response.data.paginator.totalCount
        })
        .catch((error) => {
          // handle error
          this.$toast.error(error.message)
        })
        .then(function () {
          // always executed
        })
    },
    onProFeature() {
      this.$notify({
        type: 'danger',
        message: 'This is a PRO feature.',
      })
    },
    sortChange({ prop, order }) {
      if (order === 'descending') {
        this.sort = `-${prop}`
      } else {
        this.sort = `${prop}`
      }
      this.getItems()
    },
  },
}
</script>
<style>
#pro-feature {
  color: #5e72e4;
  font-weight: bold;
}
#pro-feature:hover {
  color: #233dd2;
}
</style>
