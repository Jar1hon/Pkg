define("AccountPageV2", [], function () {
  return {
    /* Название схемы объекта страницы записи. */
    entitySchemaName: "Account",
    /* Атрибуты модели представления. */
    attributes: {
      /* Колонка модели представления. */
      Owner: {
        /* Тип данных колонки модели представления. */
        dataValueType: Terrasoft.DataValueType.LOOKUP,
        /* Конфигурационный объект атрибута типа LOOKUP. */
        lookupListConfig: {
          /* Массив фильтров, которые применяются к запросу для формирования данных поля-справочника. */
          filters: [
            function () {
              var filterGroup = Ext.create("Terrasoft.FilterGroup");
              /* Добавляет фильтр "IsUser" в результирующую коллекцию фильтров.
                            Выбирает все записи из корневой схемы Contact, к которой присоединена колонка [Id] из схемы [SysAdminUnit], для которых [Id] не равен null. */
              filterGroup.add(
                "IsUser",
                Terrasoft.createColumnIsNotNullFilter(
                  "[SysAdminUnit:Contact].Id"
                )
              );
              /* Добавляет фильтр "IsActive" в результирующую коллекцию фильтров.
                            Выбирает все записи из корневой схемы [Contact], к которой присоединена колонка [Active] из схемы [SysAdminUnit], для которых Active=true. */
              filterGroup.add(
                "IsActive",
                Terrasoft.createColumnFilterWithParameter(
                  Terrasoft.ComparisonType.EQUAL,
                  "[SysAdminUnit:Contact].Active",
                  true
                )
              );
              return filterGroup;
            },
          ],
        },
      },
    },
  };
});
