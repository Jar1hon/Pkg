define("ContactSectionV2", [], function () {
  return {
    /* Название схемы объекта раздела. */
    entitySchemaName: "Contact",
    /* Методы модели представления раздела. */
    methods: {
      /*Для раздела Заказы*/
      /* Проверяет стадию заказа. activeRowId — значение первичной колонки выделенной записи реестра.*/
      //   isRunning: function (activeRowId) {
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
      /* Определяет доступность пункта меню. */
      // isCustomActionEnabled: function () {
      //   /* Попытка получения идентификатора активной записи. */
      //   var activeRowId = this.get("ActiveRow");
      //   /* Если идентификатор определен, то возвращается true, иначе — false. */
      //   return activeRowId ? true : false;
      // },
      /* Метод-обработчик действия. Отображает в информационном окне дату создания заказа. */
      showOrderInfo: function () {
        var activeRowId = this.get("ActiveRow");
        var gridData = this.get("GridData");
        /* Получает дату создания заказа. Колонка должна быть добавлена в реестр. */
        var dueDate = gridData.get(activeRowId).get("CreatedOn");
        /* Отображает информационное окно. */
        this.showInformationDialog(dueDate);
      },
      /* Переопределение базового виртуального метода, который возвращает коллекцию действий раздела. */
      getSectionActions: function () {
        /* Вызывается родительская реализация метода для получения коллекции проинициализированных действий раздела. */
        var actionMenuItems = this.callParent(arguments);
        /* Добавляет линию-разделитель. */
        actionMenuItems.addItem(
          this.getButtonMenuItem({
            Type: "Terrasoft.MenuSeparator",
            Caption: "",
          })
        );
        /* Добавляет пункт меню в список действий раздела. */
        actionMenuItems.addItem(
          this.getButtonMenuItem({
            /* Привязка заголовка пункта меню к локализуемой строке схемы. */
            Caption: { bindTo: "Resources.Strings.CreationDateActionCaption" },
            /* Привязка метода-обработчика действия. */
            Click: { bindTo: "showOrderInfo" },
            /* Привязка свойства доступности пункта меню к значению, которое возвращает метод isCustomActionEnabled. */
            Enabled: true,
          })
        );
        /* Возврат дополненной коллекции действий раздела. */
        return actionMenuItems;
      },
    },
  };
});
