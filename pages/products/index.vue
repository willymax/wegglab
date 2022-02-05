<template>
  <div>
    <base-table :items="products" :columns="columns">
      <template #actions> </template
    ></base-table>
    <!-- <el-table
      class="table-responsive align-products-center table-flush"
      header-row-class-name="thead-light"
      :data="products"
      @sort-change="sortChange"
    >
      <el-table-column
        label="Id"
        min-width="310px"
        prop="id"
        sortable="custom"
      />
      <el-table-column
        label="Name"
        min-width="310px"
        prop="name"
        sortable="custom"
      />
      <el-table-column
        label="Description"
        prop="description"
        min-width="140px"
        sortable="custom"
      />
      <el-table-column
        label="Create Time"
        prop="create_time"
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
            >
              <i class="fas fa-trash"></i>
            </a>
          </el-tooltip>
        </div>
      </el-table-column>
    </el-table> -->
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
import BaseTable from '~/components/tables/BaseTable.vue'
export default {
  components: {
    BaseTable,
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
  layout: 'ResponsiveDashboard',
  data() {
    return {
      selectedRows: [],
      products: [],
      sort: 'created_at',
      columns: [
        {
          label: 'Id',
          'min-width': '310px',
          prop: 'id',
          sortable: 'custom',
        },
        {
          label: 'Name',
          'min-width': '310px',
          prop: 'name',
          sortable: 'custom',
        },
        {
          label: 'Description',
          'min-width': '310px',
          prop: 'description',
          sortable: 'custom',
        },
        {
          label: 'Create Time',
          'min-width': '310px',
          prop: 'create_time',
          sortable: 'custom',
        },
      ],
    }
  },
  async fetch() {
    const res = await this.$store.dispatch('paypal/getAccessToken')
    const accessToken = res.access_token
    const response = await fetch(
      'https://api-m.sandbox.paypal.com/v1/catalogs/products?page_size=2&page=1&total_required=true',
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => res.json())
    this.products = this.products.concat(response.products)
  },
  mounted() {},
  methods: {
    loadProducts() {},
    async getProducts(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization:
            'Bearer A21AAIT2KvcsVY7vfuhlqaf_QDgxxhpIdbJexwhWzyZf74-xkK-pRAtQgesPDJ5nOm2g53-Bgg3tNBZnYebYRzoqqlfOaNVwg',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      return response.json() // parses JSON response into native JavaScript objects
    },
    sortChange({ prop, order }) {
      if (order === 'descending') {
        this.sort = `-${prop}`
      } else {
        this.sort = `${prop}`
      }
      this.getProducts()
    },
  },
}
</script>

<style lang="scss" scoped></style>
