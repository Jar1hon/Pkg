//Добавление простого фильтра в раздел контакты
define("ContactSectionV2", ["BaseFiltersGenerateModule"], function (
  BaseFiltersGenerateModule
) {
  return {
    /* Название схемы объекта раздела. */
    entitySchemaName: "Contact",
    /* Методы модели представления раздела. */
    methods: {
      /* Инициализирует фиксированные фильтры. */
      initFixedFiltersConfig: function () {
        /* Создает конфигурационный объект. */
        var fixedFilterConfig = {
          /* В качестве схемы объекта для фиксированных фильтров указывается схема объекта раздела. */
          entitySchema: this.entitySchema,
          /* Массив фильтров. */
          filters: [
            /* Фильтр периода. */
            {
              /* Название фильтра. */
              name: "PeriodFilter",
              /* Заголовок фильтра. */
              caption: this.get("Resources.Strings.PeriodFilterCaption"),
              /* Тип данных — дата. */
              dataValueType: this.Terrasoft.DataValueType.DATE,
              /* Дата начала периода фильтрации. */
              startDate: {
                /* Фильтруются данные из колонки [Date]. */
                columnName: "CreatedOn",
                /* Значение по умолчанию — начало текущей недели. */
                defValue: this.Terrasoft.startOfWeek(new Date()),
              },
              /* Дата завершения периода фильтрации — завершение текущей недели. */
              dueDate: {
                columnName: "CreatedOn",
                defValue: this.Terrasoft.endOfWeek(new Date()),
              },
            },
            /* Фильтр ответственного. */
            {
              /* Название фильтра. */
              name: "Owner",
              /* Заголовок фильтра. */
              caption: this.get("Resources.Strings.OwnerFilterCaption"),
              /* Фильтрация данных из колонки [Owner]. */
              columnName: "Owner",
              /* Значение по умолчанию — контакт текущего пользователя, который содержится в системной настройке. */
              defValue: this.Terrasoft.SysValue.CURRENT_USER_CONTACT,
              /* Тип данных — справочник. */
              dataValueType: this.Terrasoft.DataValueType.LOOKUP,
              /* Фильтр. */
              filter: BaseFiltersGenerateModule.OwnerFilter,
            },
          ],
        };
        /* Атрибуту [FixedFilterConfig] присваивается ссылка на созданный конфигурационный объект. */
        this.set("FixedFilterConfig", fixedFilterConfig);
      },
    },
  };
});
