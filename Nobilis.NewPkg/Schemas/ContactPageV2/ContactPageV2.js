define("ContactPageV2", ["ServiceHelper"], function (ServiceHelper) {
  return {
    /* Название схемы объекта страницы записи. */
    entitySchemaName: "Contact",
    details: /**SCHEMA_DETAILS*/ {} /**SCHEMA_DETAILS*/,
    /* Методы модели представления страницы записи. */
    methods: {
      /* Проверяет, заполнено ли поле [ФИО] страницы. */
      isContactNameSet: function () {
        return this.get("Name") ? true : false;
      },
      /* Метод-обработчик нажатия кнопки. */
      onGetServiceInfoClick: function () {
        var name = this.get("Name");
        /* Объект, инициализирующий входящие параметры для метода сервиса. */
        var serviceData = {
          /* Название свойства совпадает с именем входящего параметра метода сервиса. */
          Name: name,
        };
        /*/ Вызов веб-сервиса и обработка результатов. */
        ServiceHelper.callService(
          "NsCustomConfigurationService",
          "GetContactIdByName",
          function (response) {
            var result = response.GetContactIdByNameResult;
            this.showInformationDialog(result);
          },
          serviceData,
          this
        );
      },
    },
    diff: /**SCHEMA_DIFF*/ [
      /* Метаданные для добавления на страницу пользовательской кнопки. */
      {
        /* Выполняется операция добавления элемента на страницу. */
        operation: "insert",
        /* Имя родительского элемента управления, в который добавляется кнопка. */
        parentName: "LeftContainer",
        /* Кнопка добавляется в коллекцию элементов управления родительского элемента, мета-имя которого указано в parentName. */
        propertyName: "items",
        /* Имя добавляемой кнопки. */
        name: "GetServiceInfoButton",
        /* Дополнительные свойства поля. */
        values: {
          /* Тип добавляемого элемента - кнопка. */
          itemType: Terrasoft.ViewItemType.BUTTON,
          /* Привязка заголовка кнопки к локализуемой строке схемы. */
          caption: { bindTo: "Resources.Strings.GetServiceInfoButtonCaption" },
          /* Привязка метода-обработчика нажатия кнопки. */
          click: { bindTo: "onGetServiceInfoClick" },
          /* Привязка свойства доступности кнопки. */
          enabled: { bindTo: "isContactNameSet" },
          /* Настройка расположения поля. */
          layout: { column: 1, row: 6, colSpan: 2, rowSpan: 1 },
        },
      },
    ] /**SCHEMA_DIFF*/,
  };
});
