define("ContactSectionV2", [], function () {
  return {
    /* Название схемы страницы раздела. */
    entitySchemaName: "Contact",
    /* Методы модели представления страницы раздела. */
    methods: {
      /* Проверяет стадию заказа для определения доступности пункта меню. */
      //   isRunning: function (activeRowId) {
      //     activeRowId = this.get("ActiveRow");
      //     /* Получает коллекцию данных списочного представления реестра раздела. */
      //     var gridData = this.get("GridData");
      //     /* Получает модель выбранного заказа по заданному значению первичной колонки. */
      //     var selectedOrder = gridData.get(activeRowId);
      //     /* Получает свойства модели — статуса выбранного заказа. */
      //     var selectedOrderStatus = selectedOrder.get("Status");
      //     /* Метод возвращает true, если статус заказа [Исполнение], иначе возвращает false. */
      //     return (
      //       selectedOrderStatus.value ===
      //       OrderConfigurationConstants.Order.OrderStatus.Running
      //     );
      //   },
    },
  };
});
