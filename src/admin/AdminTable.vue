<template lang="html">
  <div class="admintable">
    <form v-if="table" class="add_row_form" @submit="createRow()">
      <h3>Добавить новую строку в таблице</h3>
      <div class="add_new_form">
          <label class="add_new_input">
            <span>Название</span>
            <input min="3" max="30" type="text" v-model="row.name" placeholder="Название" required />
          </label>
          <label class="add_new_input">
            <span>Цена</span>
            <input type="number" v-model="row.price" placeholder="Цена от" required />
          </label>
          <label class="add_new_textarea">
            <span>Описание</span>
            <textarea min="15" max="200" v-model="row.description" placeholder="Описание" required></textarea>
          </label>
      </div>
      <button class="add_new_save" type="submit">Сохранить</button>
      <table>
        <caption>Table Example</caption>
        <thead>
          <tr class="">
            <th class="">Название</th>
            <th class="">Описание</th>
            <th class="">Примерная цена</th>
            <th class="">Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in table" :key="index">
            <td>{{row.name}}</td>
            <td>{{row.description}}</td>
            <td>от {{row.price}}₽</td>
            <td> <a href="javascript:void(0)" class="row_remove_btn" @click.prevent="removeRow(row.id, index)">Удалить</a></td>
          </tr>
          <tr v-if="!table.length">
            <td colspan="4"><b>Ещё ничего не добавлено</b></td>
          </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="">
                <input min="3" max="30" type="text" v-model="row.name" placeholder="Название" required />
              </td>
              <td class="">
                <textarea min="15" max="200" v-model="row.description" placeholder="Описание" required></textarea>
              </td>
              <td class="">
                <input type="number" v-model="row.price" placeholder="Цена от" required />
              </td>
              <td class="">
                <button type="submit" @click.prevent="createRow()">Добавить</button>
              </td>
            </tr>
          </tfoot>
      </table>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
const tableRef = firebase.database().ref('table')

export default {
  name: 'AdminTable',
  data () {
    return {
      table: [],
      row: {
        name: '',
        description: '',
        price: ''
      }
    }
  },
  created () {
    tableRef.once('value', table => {
      table.forEach(row => {
        this.table.push({
          id: row.ref.key,
          name: row.child('name').val(),
          description: row.child('description').val(),
          price: row.child('price').val()
        })
      })
    })
  },
  methods: {
    createRow () {
      const row = Object.assign({}, this.row)
      row.id = tableRef.push(row).key
      this.table.push(row)
      this.row.name = this.row.description = this.row.price = ''
    },
    removeRow (id, index) {
      this.table.splice(index, 1)
      tableRef.child(id).remove()
    }
  }
}
</script>

<style lang="scss" scoped>

  table {
    max-width: 1140px;
    width: 100%;
    text-align: center;
    margin: 50px auto;
    border-spacing: 0;

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

  .add_row_form {
    max-width: 1140px;
    margin: 0 auto;

    h3 {
      text-align: center;
      font-size: 24px;
      color: #b962d6;
    }

    .add_new_form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .add_new_input {
        width: 48%;
      }

      .add_new_textarea {
        width: 100%;
        margin-top: 15px;
      }

      label span {
        color: #b962d6;
        font-size: 13px;
      }

      input {
        border: 1px solid #b962d6;
        min-height: 46px;
        box-sizing: border-box;
        width: 100%;
        text-indent: 10px;
      }

      textarea {
        border: 1px solid #b962d6;
        resize: vertical;
        min-height: 46px;
        padding-top: 10px;
        box-sizing: border-box;
        width: 100%;
        text-indent: 10px;
      }

    }

    .add_new_save {
      padding: 10px 17px;
      line-height: 30px;
      border: none;
      background-color: #b962d6;
      font-weight: 500;
      color: #fff;
      right: 20px;
      min-width: 150px;
      text-align: center;
      transition: 0.3s;
      margin: 20px 0 0 auto;
      display: block;
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
      }
    }

  }

  tfoot input, tfoot textarea {
    width: 90%;
    height: 35px;
    border: 1px solid #b962d6;
    background-color: transparent;
    text-indent: 5px;
    color: #000;
    resize: vertical;
    box-sizing: border-box;
  }

  tfoot textarea {
    padding-top: 6px;
  }

  tfoot button {
    height: 35px;
    line-height: 30px;
    border: none;
    background-color: #b962d6;
    font-weight: 500;
    color: #fff;
    min-width: 150px;
    text-align: center;
    transition: 0.3s;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.2);
      transition: 0.3s;
    }
  }

  .row_remove_btn {
    height: 35px;
    line-height: 35px;
    border: none;
    display: inline-block;
    text-decoration: none;
    width: fit-content;
    background-color: red;
    font-weight: 500;
    color: #fff;
    min-width: 150px;
    text-align: center;
    transition: 0.3s;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.2);
      transition: 0.3s;
    }
  }

</style>
