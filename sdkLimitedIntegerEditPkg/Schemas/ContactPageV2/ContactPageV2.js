/* Объявление модуля. В качестве зависимости укажите модуль, в котором объявлен класс элемента управления. */
define("ContactPageV2", ["UsrLimitedIntegerEdit"], function () {
  return {
    attributes: {
      /* Атрибут, который привязан к значению элемента управления. */
      ScoresAttribute: {
        /* Тип данных атрибута — целочисленный. */
        dataValueType: this.Terrasoft.DataValueType.INTEGER,
        /* Тип атрибута — виртуальная колонка. */
        type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
        /* Значение по умолчанию. */
        value: 0,
      },
    },
    diff: /**SCHEMA_DIFF*/ [
      {
        operation: "insert",
        parentName: "ProfileContainer",
        propertyName: "items",
        name: "Scores",
        values: {
          contentType: Terrasoft.ContentType.LABEL,
          caption: { bindTo: "Resources.Strings.ScoresCaption" },
          // layout: {
          //   column: 0,
          //   row: 6,
          //   colSpan: 24,
          // },
        },
      },
      {
        /* Выполняется операция добавления элемента на страницу. */
        operation: "insert",
        /* Мета-имя родительского контейнера, в который добавляется поле. */
        parentName: "ProfileContainer",
        /* Поле добавляется в коллекцию элементов родительского элемента. */
        propertyName: "items",
        /* Мета-имя колонки схемы, к которой привязан компонент. */
        name: "ScoresValue",
        /* Свойства, передаваемые в конструктор элемента. */
        values: {
          /* Тип элемента управления — компонент. */
          itemType: Terrasoft.ViewItemType.COMPONENT,
          /* Название класса. */
          className: "Terrasoft.UsrLimitedIntegerEdit",
          /* Свойство value компонента связано с атрибутом ScoresAttribute. */
          value: { bindTo: "ScoresAttribute" },
          /* Значения свойства minLimit. */
          minLimit: -300,
          /* Значения свойства maxLimit. */
          maxLimit: 300,
          /* Настройка расположения компонента в контейнере. */
          layout: {
            /* Номер столбца. */
            column: 0,
            /* Номер строки. */
            row: 9,
            /* Диапазон занимаемых столбцов. */
            colSpan: 24,
          },
        },
      },
    ] /**SCHEMA_DIFF*/,
  };
});
