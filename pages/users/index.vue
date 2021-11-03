<template>
  <div class="container mt-5">
    <div>
      <card
        class="no-border-card"
        body-classes="px-0 pb-1"
        footer-classes="pb-2"
      >
        <template slot="header">
          <div class="row">
            <div class="col-6">
              <h3 class="mb-0">Users List</h3>
            </div>
            <div class="col-6 text-right">
              <base-button type="primary" icon size="sm" @click="onProFeature">
                <span class="btn-inner--icon"
                  ><i class="fas fa-user-edit"></i
                ></span>
                <span class="btn-inner--text">Add User</span>
              </base-button>
            </div>
          </div>
        </template>
        <div>
          <div
            class="
              col-12
              d-flex
              justify-content-center justify-content-sm-between
              flex-wrap
              mb-4
            "
          >
            <el-select
              v-model="pagination.perPage"
              class="select-primary pagination-select"
              placeholder="Per page"
            >
              <el-option
                v-for="item in pagination.perPageOptions"
                :key="item"
                class="select-primary"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <el-table
            class="table-responsive align-items-center table-flush"
            header-row-class-name="thead-light"
            :data="users"
            @sort-change="sortChange"
          >
            <el-table-column
              label="Name"
              min-width="310px"
              prop="name"
              sortable="custom"
            />
            <el-table-column
              label="Email"
              min-width="310px"
              prop="email"
              sortable="custom"
            />
            <el-table-column
              label="Created At"
              prop="created_at"
              min-width="140px"
              sortable="custom"
            />
            <el-table-column min-width="180px" align="center">
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
              </div>
            </el-table-column>
          </el-table>
        </div>
        <div
          slot="footer"
          class="flex flex-row justify-center sm:justify-between flex-wrap"
        >
          <div class="">
            <p class="card-category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries

              <span v-if="selectedRows.length">
                &nbsp; &nbsp; {{ selectedRows.length }} rows selected
              </span>
            </p>
          </div>
          <base-pagination
            v-model="pagination.currentPage"
            class="pagination-no-border"
            :per-page="pagination.perPage"
            :total="total"
          />
        </div>
      </card>
    </div>
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
  },
  layout: 'DashboardLayout',

  data() {
    return {
      selectedRows: [],
      users: [],
      sort: 'created_at',

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

  created() {
    this.getItems()
  },
  mounted() {
    // this.getUsers()
  },

  methods: {
    getItems() {
      const that = this
      this.$axios
        .get('users', {
          params: {
            perPage: this.pagination.perPage,
            page: this.pagination.currentPage,
          },
        })
        .then(function (response) {
          // handle success
          that.users = response.data.data
          that.pagination.currentPage = response.data.paginator.current_page
          that.pagination.perPage = parseInt(response.data.paginator.per_page)
          that.total = response.data.paginator.total_count
        })
        .catch(function (error) {
          // handle error
          console.log(error)
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
