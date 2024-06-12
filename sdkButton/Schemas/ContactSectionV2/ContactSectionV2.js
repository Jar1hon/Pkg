define("ContactSectionV2", ["ContactSectionV2Resources"], function (resources) {
  return {
    /* Название схемы объекта раздела. */
    entitySchemaName: "Contact",
    /* Методы модели представления раздела. */
    methods: {
      onActiveRowAction: function (buttonTag) {
        switch (buttonTag) {
          case "showAgeButton":
            this.onShowAgeButtonClicked();
            break;
          default:
            this.callParent(arguments);
            break;
        }
      },
      /* Метод-обработчик нажатия кнопки. */
      onShowAgeButtonClicked: function () {
        var message = "";
        var activeRow = this.getActiveRow();
        var recordId = activeRow.get("Id");
        /* Создаем экземпляр класса Terrasoft.EntitySchemaQuery с корневой схемой Contact. */
        var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
          rootSchemaName: "Contact",
        });
        /* Добавление колонки с возрастом. */
        esq.addColumn(
          "Age",
          "Age"
        ); /* Получение записи из выборки по Id объекта. */
        esq.getEntity(
          recordId,
          function (result) {
            if (!result.success) {
              this.showInformationDialog("Error");
              return;
            }
            message += "Age of contact is " + result.entity.get("Age");
            this.showInformationDialog(message);
          },
          this
        );
      },
    } /* Отображение кнопки в разделе. */,
    diff: /**SCHEMA_DIFF*/ [
      /* Метаданные для добавления в раздел пользовательской кнопки. */
      {
        /* Выполняется операция добавления элемента на страницу. */
        operation: "insert",
        /* Мета-имя добавляемой кнопки. */
        name: "DataGridActiveRowShowAgeButton",
        /* Мета-имя родительского контейнера, в который добавляется кнопка. */
        parentName: "DataGrid",
        /* Кнопка добавляется в коллекцию элементов родительского элемента. */
        propertyName: "activeRowActions",
        /* Свойства, передаваемые в конструктор элемента. */
        values: {
          className: "Terrasoft.Button",
          style: Terrasoft.controls.ButtonEnums.style.GREEN,
          /* Привязка заголовка кнопки к локализуемой строке схемы. */
          caption: resources.localizableStrings.ShowAgeOfContactButtonCaption,
          tag: "showAgeButton",
        },
      },
    ] /**SCHEMA_DIFF*/,
  };
});
