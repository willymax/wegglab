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
              <h3 class="mb-0">Items List</h3>
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
            v-if="paginated"
            class="
              col-12
              d-flex
              justify-content-center justify-content-sm-between
              flex-wrap
              mb-4
            "
          >
            <el-select
              v-model="tablePaginations.perPage"
              class="select-primary pagination-select"
              placeholder="Per page"
            >
              <el-option
                v-for="item in tablePaginations.perPageOptions"
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
            :data="items"
            @sort-change="sortChange"
          >
            <el-table-column
              v-for="(column, index) in columns"
              :key="column.prop"
              :label="column.label"
              :min-width="column.minWidth"
              :prop="column.prop"
              :sortable="column.sortable"
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
                <slot name="actions"></slot>
              </div>
            </el-table-column>
          </el-table>
        </div>
        <div
          v-if="paginated"
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
            v-model="tablePaginations.currentPage"
            class="pagination-no-border"
            :per-page="tablePaginations.perPage"
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
import { integer } from 'vee-validate/dist/rules'
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
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    paginated: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
    total: {
      type: integer,
      default: 1,
    },
    pagination: {
      type: Object,
      default() {
        return {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
        }
      },
    },
  },
  data() {
    return {
      selectedRows: [],
      sort: 'created_at',
      tablePaginations: { ...this.pagination },
    }
  },
  computed: {
    from() {
      return (
        this.tablePaginations.perPage * (this.tablePaginations.currentPage - 1)
      )
    },

    to() {
      let highBound = this.from + this.tablePaginations.perPage
      if (this.total < highBound) {
        highBound = this.total
      }
      return highBound
    },
  },
  watch: {
    pagination(newValue, oldValue) {
      this.tablePaginations = { ...this.newValue }
    },
    'tablePaginations.currentPage'(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getItems()
      }
    },
    'tablePaginations.perPage'(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getItems()
      }
    },
  },

  created() {
    this.getItems()
  },
  mounted() {
    // this.getitems()
  },

  methods: {
    getItems() {
      this.$emit('getItems', {
        perPage: this.tablePaginations.perPage,
        page: this.tablePaginations.currentPage,
      })
      // const that = this
      // this.$axios
      //   .get('items', {
      //     params: {
      //       perPage: this.tablePaginations.perPage,
      //       page: this.tablePaginations.currentPage,
      //     },
      //   })
      //   .then(function (response) {
      //     // handle success
      //     that.items = response.data.data
      //     that.tablePaginations.currentPage = response.data.paginator.current_page
      //     that.tablePaginations.perPage = parseInt(response.data.paginator.per_page)
      //     that.total = response.data.paginator.total_count
      //   })
      //   .catch(function (error) {
      //     // handle error
      //     console.log(error)
      //   })
      //   .then(function () {
      //     // always executed
      //   })
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
