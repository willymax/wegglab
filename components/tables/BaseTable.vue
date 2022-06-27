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
              <h3 class="mb-0">{{ tableTitle }}</h3>
            </div>
            <div v-if="showAddButton" class="col-6 text-right">
              <base-button type="primary" icon size="sm" @click="onProFeature">
                <span class="btn-inner--icon"
                  ><i class="fas fa-user-edit"></i
                ></span>
                <span class="btn-inner--text">Add Item</span>
              </base-button>
            </div>
          </div>
        </template>
        <div>
          <div
            v-if="paginated"
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap mb-4"
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
              v-for="column in columns"
              :key="column.prop"
              :label="column.label"
              :min-width="column.minWidth"
              :prop="column.prop"
              :sortable="column.sortable"
            >
              <!-- <template v-if="column.prop === '_id'" #default="table">
                <router-link
                  class="cursor-pointer"
                  :to="{ name: 'questions', params: { id: table.row._id } }"
                  tag="span"
                >
                  {{ table.row._id }}
                </router-link>
              </template> -->
            </el-table-column>
            <slot name="customColumns"></slot>
            <el-table-column
              v-if="!hideActions"
              min-width="180px"
              align="center"
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
                      @click="trashClicked(scope.$index, scope.row)"
                    >
                      <i class="fas fa-trash"></i>
                    </a>
                  </el-tooltip>
                  <slot name="actions"></slot>
                </div>
              </template>
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
    <app-modal
      v-if="showDeleteDialog"
      :show.sync="showDeleteDialog"
      :show-close="true"
    >
      <template #default>
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <!-- Heroicon name: outline/exclamation -->
              <svg
                class="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                id="modal-title"
                class="text-lg leading-6 font-medium text-gray-900"
              >
                Deactivate account
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Are you sure you want to delete this plan?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Delete
          </button>
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
        <!-- This example requires Tailwind CSS v2.0+ -->
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
import { integer } from 'vee-validate/dist/rules'
import BasePagination from '../core-components/BasePagination.vue'

export default {
  components: {
    [Tooltip.name]: Tooltip,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
    BasePagination,
  },
  layout: 'ResponsiveDashboard',
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    paginated: {
      type: Boolean,
      default: true,
    },
    showAddButton: {
      type: Boolean,
      default: false,
    },
    hideActions: {
      type: Boolean,
      default: false,
    },
    resource: {
      type: String,
      default: 'student',
    },

    tableTitle: {
      type: String,
      default: 'Items List',
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
      showDeleteDialog: false,
      selectedRows: [],
      sort: 'createdAt',
      tablePaginations: { ...this.pagination },
      selectedItem: null,
      items: [],
      total: 0,
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
    tablePaginations(newValue, oldValue) {
      //
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
    trashClicked(index, row) {
      this.selectedItem = row
      this.showDeleteDialog = true
    },
    getItems() {
      // this.$emit('getItems', {
      //   perPage: this.tablePaginations.perPage,
      //   page: this.tablePaginations.currentPage,
      // })
      const that = this
      this.$axios
        .get(`${this.resource}`, {
          params: {
            perPage: this.tablePaginations.perPage,
            page: this.tablePaginations.currentPage,
          },
        })
        .then(function (response) {
          // handle success
          that.items = response.data.data
          that.tablePaginations.currentPage = parseInt(
            response.data.paginator.currentPage
          )
          that.tablePaginations.perPage = parseInt(
            response.data.paginator.perPage
          )
          that.total = parseInt(response.data.paginator.totalCount)
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
