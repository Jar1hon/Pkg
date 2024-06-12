define("ContactSectionV2", [], function () {
  return {
    /* Название схемы объекта раздела. */
    entitySchemaName: "Contact",
    /* Методы модели представления раздела. */
    methods: {
      /* Определяет доступность пункта меню. */
      isCustomActionEnabled: function () {
        /* Попытка получить массив идентификаторов выбранных записей. */
        var selectedRows = this.get("SelectedRows");
        /* Если массив содержит элементы (выбрана хотя бы одна запись в реестре), то возвращается true, иначе — false. */
        return selectedRows ? selectedRows.length > 0 : false;
      },
      /* Метод-обработчик действия. Отображает в информационном окне перечень контрагентов. */
      showOrdersInfo: function () {
        /* Получает массив идентификаторов выбранных записей. */
        var selectedRows = this.get("SelectedRows");
        /* Получает коллекцию данных записей реестра. */
        var gridData = this.get("GridData");
        /* Переменная для хранения модели объекта выбранного заказа. */
        var selectedOrder = null;
        /* Переменная для хранения названия контрагента выбранного заказа. */
        var selectedOrderAccount = "";
        /* Переменная для формирования текста информационного окна. */
        var infoText = "";
        /* Обработка массива идентификаторов выбранных записей реестра. */
        selectedRows.forEach(function (selectedRowId) {
          /* Получает модель объекта выбранного заказа. */
          selectedOrder = gridData.get(selectedRowId);
          /* Получает название контрагента выбранного заказа. Колонка должна быть добавлена в реестр. */
          selectedOrderAccount = selectedOrder.get("Account").displayValue;
          /* Добавляет название контрагента в текст информационного окна. */
          infoText += "\n" + selectedOrderAccount;
        });
        /* Отображает информационное окно. */
        this.showInformationDialog(infoText);
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
            Caption: { bindTo: "Resources.Strings.AccountsSectionAction" },
            /* Привязка метода-обработчика действия. */
            Click: { bindTo: "showOrdersInfo" },
            /* Привязка свойства доступности пункта меню к значению, которое возвращает метод isCustomActionEnabled. */
            Enabled: { bindTo: "isCustomActionEnabled" },
            /* Поддержка режима множественного выбора. */
            IsEnabledForSelectedAll: true,
          })
        );
        /* Возврат дополненной коллекции действий раздела. */
        return actionMenuItems;
      },
    },
  };
});
