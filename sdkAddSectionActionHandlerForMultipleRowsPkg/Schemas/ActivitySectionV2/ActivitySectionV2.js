define("ActivitySectionV2", ["ConfigurationConstants"], function (
  ConfigurationConstants
) {
  return {
    /* Название схемы объекта раздела. */
    entitySchemaName: "Activity",
    /* Методы модели представления раздела. */
    methods: {
      /* Определяет доступность пункта меню. */
      isCustomActionEnabled: function () {
        /* Попытка получить массив идентификаторов выбранных записей. */
        var selectedRows = this.get("SelectedRows");
        /* Если массив содержит элементы (выбрана хотя бы одна запись в реестре), то возвращается true, иначе — false. */
        return selectedRows ? selectedRows.length > 0 : false;
      },
      /* Метод-обработчик действия. Устанавливает для выбранных записей статус [Выполнено]. */
      setAllDone: function () {
        /* Получает массив идентификаторов выбранных записей. */
        var selectedRows = this.get("SelectedRows");
        /* Обработка запускается в случае, если выбрана хотя бы одна запись. */
        if (selectedRows.length > 0) {
          /* Создает экземпляр класса пакетных запросов. */
          var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
          /* Обновляет каждую из выбранных записей. */
          selectedRows.forEach(function (selectedRowId) {
            /* Создает экземпляр класса UpdateQuery с корневой схемой Activity. */
            var update = this.Ext.create("Terrasoft.UpdateQuery", {
              rootSchemaName: "Activity",
            });
            /* Применяет фильтр для определения записи для обновления. */
            update.enablePrimaryColumnFilter(selectedRowId);
            /* Для колонки [Status] устанавливается значение "Завершена" с помощью конфигурационной константы ConfigurationConstants.Activity.Status.Done. */
            update.setParameterValue(
              "Status",
              ConfigurationConstants.Activity.Status.Done,
              this.Terrasoft.DataValueType.GUID
            );
            /* Добавляет запрос на обновление записи в пакетный запрос. */
            batchQuery.add(update);
          }, this);
          /* Выполняет пакетный запрос к серверу. */
          batchQuery.execute(function () {
            /* Обновляет реестр. */
            this.reloadGridData();
          }, this);
        }
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
            Caption: { bindTo: "Resources.Strings.AllDoneCaption" },
            /* Привязка метода-обработчика действия. */
            Click: { bindTo: "setAllDone" },
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
