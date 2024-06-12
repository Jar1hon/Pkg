define("AccountSectionV2", [], function () {
  return {
    /* Название схемы объекта раздела. */
    entitySchemaName: "Account",
    /* Методы модели представления раздела. */
    methods: {
      //   /* Метод-обработчик нажатия кнопки. */
      //   onOpenPrimaryContactClick: function () {
      //     /* Получение идентификатора выбранной записи. */
      //     var activeRow = this.get("ActiveRow");
      //     if (!activeRow) {
      //       return;
      //     }
      //     /* Определение идентификатора основного контакта. */
      //     var primaryId = this.get("GridData")
      //       .get(activeRow)
      //       .get("PrimaryContact").value;
      //     if (!primaryId) {
      //       return;
      //     }
      //     /* Формирование строки адреса. */
      //     var requestUrl = "CardModuleV2/ContactPageV2/edit/" + primaryId;
      //     /* Публикация сообщения о пополнении истории навигации по страницам и переход на страницу основного контакта. */
      //     this.sandbox.publish("PushHistoryState", {
      //       hash: requestUrl,
      //     });
      //   },
      //   /* Проверяет заполнение поля [Основной контакт] выбранного элемента. */
      //   isAccountPrimaryContactSet: function () {
      //     var activeRow = this.get("ActiveRow");
      //     if (!activeRow) {
      //       return false;
      //     }
      //     var pc = this.get("GridData").get(activeRow).get("PrimaryContact");
      //     return pc || pc !== "" ? true : false;
      //   },
    },
    /* Отображение кнопки в разделе. */
    diff: /**SCHEMA_DIFF*/ [
      /* Метаданные для добавления в раздел пользовательской кнопки. */
      // {
      //   /* Выполняется операция добавления элемента на страницу. */
      //   operation: "insert",
      //   /* Мета-имя родительского контейнера, в который добавляется кнопка. */
      //   parentName: "ActionButtonsContainer",
      //   /* Кнопка добавляется в коллекцию элементов родительского элемента. */
      //   propertyName: "items",
      //   /* Мета-имя добавляемой кнопки. */
      //   name: "MainContactSectionButton",
      //   /* Свойства, передаваемые в конструктор элемента. */
      //   values: {
      //     /* Тип добавляемого элемента — кнопка. */
      //     itemType: Terrasoft.ViewItemType.BUTTON,
      //     /* Привязка заголовка кнопки к локализуемой строке схемы. */
      //     caption: {
      //       bindTo: "Resources.Strings.OpenPrimaryContactButtonCaption",
      //     },
      //     /* Привязка метода-обработчика нажатия кнопки. */
      //     click: { bindTo: "onOpenPrimaryContactClick" },
      //     /* Привязка свойства доступности кнопки. */
      //     enabled: { bindTo: "isAccountPrimaryContactSet" },
      //     /* Настройка расположения кнопки. */
      //     layout: {
      //       /* Номер столбца. */
      //       column: 1,
      //       /* Номер строки. */
      //       row: 6,
      //       /* Диапазон занимаемых столбцов. */
      //       colSpan: 1,
      //     },
      //   },
      // },
    ] /**SCHEMA_DIFF*/,
  };
});
