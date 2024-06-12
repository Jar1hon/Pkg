define("AccountPageV2", ["ProcessModuleUtilities"], function (
  ProcessModuleUtilities
) {
  return {
    /* Название схемы объекта страницы записи. */
    entitySchemaName: "Account",
    /* Методы модели представления страницы записи. */
    methods: {
      /* Проверяет заполнение поля [Основной контакт] страницы контрагента. */
      isAccountPrimaryContactSet: function () {
        return this.get("PrimaryContact") ? true : false;
      },
      /* Переопределяет базовый виртуальный метод, который возвращает коллекцию действий страницы записи. */
      getActions: function () {
        /* Вызывает родительскую реализацию метода для получения коллекции проинициализированных действий базовой страницы. */
        var actionMenuItems = this.callParent(arguments);
        /* Добавляет линию-разделитель. */
        actionMenuItems.addItem(
          this.getActionsMenuItem({
            Type: "Terrasoft.MenuSeparator",
            Caption: "",
          })
        );
        /* Добавляет пункт меню в перечень действий страницы записи. */
        actionMenuItems.addItem(
          this.getActionsMenuItem({
            /* Привязывает заголовок пункта меню к локализуемой строке схемы. */
            Caption: { bindTo: "Resources.Strings.CallProcessCaption" },
            /* Привязывает метод-обработчик действия. */
            Tag: "callCustomProcess",
            /* Привязывает свойство видимости пункта меню к значению, которое возвращает метод isAccountPrimaryContactSet(). */
            Visible: true,
          })
        );
        return actionMenuItems;
      },
      /* Метод-обработчик действия. */
      callCustomProcess: function () {
        /* Получает идентификатор основного контакта контрагента. */
        var contactParameter = this.get("PrimaryContact");
        /* Объект, который передается в качестве параметра метода executeProcess(). */
        var args = {
          /* Имя процесса, который необходимо запустить. */
          sysProcessName: "UsrProcess_3e62943",
          /* Объект со значением входящего параметра ContactParameter для процесса UsrProcess_3e62943. */
          parameters: {
            ProcessSchemaContactParameter: contactParameter.value,
          },
        };
        /* Запускает пользовательский бизнес-процесс. */
        ProcessModuleUtilities.executeProcess(args);
      },
    },
  };
});
