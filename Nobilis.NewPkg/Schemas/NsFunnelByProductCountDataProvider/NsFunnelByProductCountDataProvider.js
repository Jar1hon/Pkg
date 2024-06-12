define("NsFunnelByProductCountDataProvider", [
  "ext-base",
  "terrasoft",
  "NsFunnelByProductCountDataProviderResources",
  "FunnelBaseDataProvider",
], function (Ext, Terrasoft, resources) {
  // Определение нового провайдера расчетов.
  Ext.define("Terrasoft.configuration.NsFunnelByProductCountDataProvider", {
    // Наследование от базового провайдера.
    extend: "Terrasoft.FunnelBaseDataProvider",
    // Сокращенное имя нового провайдера
    alternateClassName: "Terrasoft.NsFunnelByProductCountDataProvider",
    // Метод для обработки всей коллекции.
    prepareFunnelResponseCollection: function (collection) {
      this.callParent(arguments);
    },
    // Расширение метода базового модуля FunnelBaseDataProvider.
    // Устанавливает колонку количества продуктов для выборки данных.
    addQueryColumns: function (entitySchemaQuery) {
      // Вызов родительского метода.
      this.callParent(arguments);
      // Добавляет в выборку колонку количества продуктов
      entitySchemaQuery.addAggregationSchemaColumn(
        "[Status:Activity].Quantity",
        Terrasoft.AggregationType.SUM,
        "StatusAmount"
      );
    },
    // Расширение метода базового класса FunnelBaseDataProvider.
    // Устанавливает фильтрацию для выборки
    applyFunnelPeriodFilters: function (filterGroup) {
      // Вызов родительского метода.
      this.callParent(arguments);
      // Создает группу фильтров.
      var endStageFilterGroup = Terrasoft.createFilterGroup();
      // Устанавливает тип оператора для группы.
      //endStageFilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
      // Добавляет фильтр, который указывает, что стадия на продаже еще не окончена.
      //   endStageFilterGroup.addItem(
      //     Terrasoft.createColumnIsNullFilter(this.getDetailColumnPath("DueDate"))
      //   );

      endStageFilterGroup.addItem(
        Terrasoft.createColumnFilterWithParameter(
          Terrasoft.ComparisonType.GREATER,
          this.getDetailColumnPath("DueDate"),
          Date.now()
        )
      );
      filterGroup.addItem(endStageFilterGroup);
    },
    // Расширение метода базового модуля FunnelBaseDataProvider.
    // Обрабатывает данные для стадий в воронке.
    getSeriesDataConfigByItem: function (responseItem) {
      // Объект, хранящий локализируемые строки.
      var lcz = resources.localizableStrings;
      // Получает объект данных стадии из родительского метода.
      var config = this.callParent(arguments);
      // Получает данные о количестве продуктов в продаже из результата выборки.
      var products = responseItem.get("StatusAmount");
      products = Ext.isNumber(products) ? products : 0;
      // Форматирует строки.
      var name = Ext.String.format(
        "{0}<br/>{1}: {2}<br/>{3}: {4}",
        config.menuHeaderValue,
        lcz.CntOpportunity,
        config.y,
        lcz.FunnelProductsCaption,
        products
      );
      var displayValue = Ext.String.format(
        "<br/>{0}: {1}",
        lcz.FunnelProductsCaption,
        products
      );
      // Устанавливает новые данные в объект данных и возвращает его.
      return Ext.apply(config, {
        name: name,
        displayValue: displayValue,
      });
    },
  });
});
