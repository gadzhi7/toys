<template lang="html">
  <div class="table">
    <BreadCrumbs #breadcrubs>Таблица с игрушками</BreadCrumbs>
    <h1 class="title">Описание работ</h1>
    <div class="table_wrapper">
      <table>
        <thead>
          <tr class="">
            <th class="">Название</th>
            <th class="">Описание</th>
            <th class="">Цена</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in table" :key="index">
            <td class="">{{row.name}}</td>
            <td class="">{{row.description}}</td>
            <td class="">от {{row.price}}₽</td>
          </tr>
          <tr v-if="!table.length">
            <td colspan="4"><b>Ещё ничего не добавлено</b></td>
          </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="">Название</td>
              <td class="">Описание</td>
              <td class="">Цена</td>
            </tr>
          </tfoot>
        </table>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from './../components/BreadCrumbs'
import firebase from 'firebase/app'
const tableRef = firebase.database().ref('table')

export default {
  name: 'Table',
  components: {
    BreadCrumbs
  },
  data () {
    return {
      table: []
    }
  },
  created () {
    this.$store.state.loading = true
    tableRef.once('value', table => {
      table.forEach(row => {
        this.table.push({
          id: row.ref.key,
          name: row.child('name').val(),
          description: row.child('description').val(),
          price: row.child('price').val()
        })
      })

      this.$store.state.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
  .table_wrapper {
    width: 100%;
    overflow-x: auto;
    margin: 50px auto;
  }

  table {
    max-width: 1200px;
    min-width: 767px;
    overflow-x: auto;
    width: 100%;
    text-align: center;
    border-spacing: 0;
    margin: 0 auto;

    th, td {
      padding: 15px 0;
    }

    caption {}

    thead th {
      background-color: #d68662;
      color: #fff;
      border-left: 1px solid #c37c5d;
      border-right: 1px solid #c37c5d;
    }

    tbody td {
      border: 1px solid #ebebeb;
      border-top: 0;
    }

    tfoot td {
      font-weight: bold;
      border: 1px solid #ebebeb;
      border-top: 0;
    }

  }

  @media (max-width: 480px) {

    h1 {
      font-size: 24px;
      padding: 0 50px;

      &:after, &:before {
        width: 35px;
        top: 12px;
      }
    }
  }

</style>
