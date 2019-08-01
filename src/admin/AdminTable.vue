<template lang="html">
  <div class="admintable">
    Заполнение таблицы
    <table>
      <caption>Table Example</caption>
      <thead>
        <tr class="">
          <th class="">Название</th>
          <th class="">Описание</th>
          <th class="">Примерный рост</th>
          <th class="">Примерная цена</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="">Division</td>
          <td class="">Division</td>
          <td class="">Division</td>
          <td class="">Division</td>
        </tr>
        <tr>
          <td class="">Division</td>
          <td class="">Division</td>
          <td class="">Division</td>
          <td class="">Division</td>
        </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="">Название</td>
            <td class="">Описание</td>
            <td class="">Примерный рост</td>
            <td class="">Примерная цена</td>
          </tr>
        </tfoot>
      </table>
  </div>
</template>

<script>
export default {
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

</style>
