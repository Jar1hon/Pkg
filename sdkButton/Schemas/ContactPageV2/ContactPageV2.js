define("ContactPageV2", [], function () {
  return {
    /* Название схемы объекта страницы записи. */
    entitySchemaName: "Contact",
    /* Модули. */
    modules: /**SCHEMA_MODULES*/ {
      /* Модуль профиля контрагента. */
      AccountProfile1: {
        /* Конфигурация профиля. */
        config: {
          /* Название схемы. */
          schemaName: "UsrAccountProfileSchema",
          /* Признак, который сообщает об инициализации конфигурации схемы. */
          isSchemaConfigInitialized: true,
          /* Признак, который сообщает, что не используется HistoryState. */
          useHistoryState: false,
          /* Параметры профиля. */
          parameters: {
            /* Конфигурация модели представления. */
            viewModelConfig: {
              /* Название колонки связанной сущности. */
              masterColumnName: "Account",
            },
          },
        },
      },
    } /**SCHEMA_MODULES*/,
    /* Отображение всплывающей подсказки. */
    diff: /**SCHEMA_DIFF*/ [
      /* Метаданные для добавления к кнопке всплывающей подсказки. */
      {
        /* Выполняется операция изменения существующего элемента. */
        operation: "merge",
        /* Мета-имя родительского контейнера, в котором изменяется кнопка. */
        parentName: "LeftContainer",
        /* Кнопка изменяется в коллекции элементов родительского элемента. */
        propertyName: "items",
        /* Мета-имя изменяемой кнопки. */
        name: "SaveButton",
        /* Свойства, передаваемые в конструктор элемента. */
        values: {
          /* Всплывающая подсказка для кнопки. */
          hint: { bindTo: "Resources.Strings.SaveButtonHint" },
        },
      },
      {
        /* Операция добавления. */
        operation: "insert",
        /* Имя родительского элемента, в который выполняется вставка. */
        parentName: "LeftModulesContainer",
        /* Свойство элемента родителя, с которым выполняется операция. */
        propertyName: "items",
        /* Имя сущности. */
        name: "AccountProfile1",
        /* Значение добавляемого элемента. */
        values: {
          /* Тип элемента — модуль. */
          itemType: Terrasoft.ViewItemType.MODULE,
        },
      },
    ] /**SCHEMA_DIFF*/,
  };
});
