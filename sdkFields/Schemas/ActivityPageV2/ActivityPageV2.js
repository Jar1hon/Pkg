define("ActivityPageV2", [
  "BusinessRuleModule",
  "ConfigurationConstants",
], function (BusinessRuleModule, ConfigurationConstants) {
  return {
    /* Название схемы объекта страницы записи. */
    entitySchemaName: "Activity",
    /* Методы модели представления страницы записи. */
    methods: {
      /* Переопределение базового метода Terrasoft.BasePageV2.onEntityInitialized, который срабатывает после окончания инициализации схемы объекта страницы записи. */
      onEntityInitialized: function () {
        /* Вызывается родительская реализация метода. */
        this.callParent(arguments);
        /* Вызов метода-обработчика, который рассчитывает значение колонки [Deadline]. */
        this.setDeadline();
      },
      /* Метод-обработчик, который рассчитывает значение колонки [Deadline]. */
      setDeadline: function () {
        /* Значение колонки [Deadline]. */
        //var deadline = this.get("Deadline");
        /* Проверяет установку режима новой записи. */
        //var newmode = this.isNewMode();
        /* Если значение не установлено и режим новой записи установлен. */
        //if (!deadline && newmode) {
        //if (newmode) {
        /* Получает значение колонки [StartDate]. */
        //var newDate = new Date(this.get("StartDate"));
        //newDate.setDate(newDate.getDate() + 10);
        /* Установка значения колонки [Deadline]. */
        //this.set("UsrMeetingPlace", newDate);
        var newDate = "Creatio";
        this.set("UsrMeetingPlace", newDate);
      },
    },
    rules: {
      ///////////////////////////////////////////////////////////////
      //Отображение поля
      /* Набор правил для колонки [UsrMeetingPlace] модели представления. */
      UsrMeetingPlace: {
        /* Зависимость видимости поля [UsrMeetingPlace] от значения в поле [ActivityCategory]. */
        BindParametrVisibilePlaceByType: {
          /* Тип правила BINDPARAMETER. */
          ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
          /* Правило регулирует свойство VISIBLE. */
          property: BusinessRuleModule.enums.Property.VISIBLE,
          /* Массив условий для срабатывания правила. Определяет равно ли значение в колонке [ActivityCategory] значению "Встреча". */
          conditions: [
            {
              /* Выражение левой части условия. */
              leftExpression: {
                /* Тип выражения — атрибут (колонка) модели представления. */
                type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
                /* Название колонки модели представления, значение которой сравнивается в выражении. */
                attribute: "ActivityCategory",
              },
              /* Тип операции сравнения — равно. */
              comparisonType: Terrasoft.ComparisonType.EQUAL,
              /* Выражение правой части условия. */
              rightExpression: {
                /* Тип выражения — константное значение. */
                type: BusinessRuleModule.enums.ValueType.CONSTANT,
                /* Значение, с которым сравнивается выражение левой части. */
                value: ConfigurationConstants.Activity.ActivityCategory.Meeting,
              },
            },
          ],
        },
      },
    },
    /* Отображение поля на странице записи. */
    diff: /**SCHEMA_DIFF*/ [
      //////////////////////////////////////////////////////
      //ДОБАВЛЕНИЕ ПОЛЯ "МЕСТО ВСТРЕЧИ"
      /* Метаданные для добавления на страницу пользовательского поля. */
      {
        /* Выполняется операция добавления элемента на страницу. */
        operation: "insert",
        /* Мета-имя родительского контейнера, в который добавляется поле. */
        parentName: "Header",
        /* Поле добавляется в коллекцию элементов родительского элемента. */
        propertyName: "items",
        /* Мета-имя добавляемого поля. */
        name: "UsrMeetingPlace",
        /* Свойства, передаваемые в конструктор элемента. */
        values: {
          /* Привязка заголовка поля к локализуемой строке схемы. */
          caption: { bindTo: "Resources.Strings.MeetingPlaceCaption" },
          /* Настройка расположения поля. */
          layout: {
            /* Номер столбца. */
            column: 0,
            /* Номер строки. */
            row: 5,
            /* Диапазон занимаемых столбцов. */
            colSpan: 12,
          },
        },
      },
    ] /**SCHEMA_DIFF*/,
  };
});
