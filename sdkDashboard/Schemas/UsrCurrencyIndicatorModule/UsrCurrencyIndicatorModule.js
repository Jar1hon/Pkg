 define("UsrCurrencyIndicatorModule", ["UsrCurrencyIndicatorModuleResources", "IndicatorModule"], function() {

    /* Класс, который генерирует конфигурацию представления модуля показателя валюты. */
    Ext.define("Terrasoft.configuration.CurrencyIndicatorViewConfig", {
        extend: "Terrasoft.BaseModel",
        alternateClassName: "Terrasoft.CurrencyIndicatorViewConfig",
        /* Генерирует конфигурацию представления модуля показателя валюты. */
        generate: function(config) {
            var style = config.style || "";
            var fontStyle = config.fontStyle || "";
            var wrapClassName = Ext.String.format("{0}", style);
            var id = Terrasoft.Component.generateId();
            /* Возвращаемый конфигурационный объект представления. */
            var result = {
                "name": id,
                "itemType": Terrasoft.ViewItemType.CONTAINER,
                "classes": {wrapClassName: [wrapClassName, "indicator-module-wrapper"]},
                "styles": {
                    "display": "table",
                    "width": "100%",
                    "height": "100%"
                },
                "items": [
                    {
                        "name": id + "-wrap",
                        "itemType": Terrasoft.ViewItemType.CONTAINER,
                        "styles": {
                            "display": "table-cell",
                            "vertical-align": "middle"
                        },
                        "classes": {wrapClassName: ["indicator-wrap"]},
                        "items": [
                            /* Отображение названия валюты. */
                            {
                                "name": "indicator-caption" + id,
                                "itemType": Terrasoft.ViewItemType.LABEL,
                                "caption": {"bindTo": "CurrencyName"},
                                "classes": {"labelClass": ["indicator-caption"]}
                            },
                            /* Отображение курса валюты. */
                            {
                                "name": "indicator-value" + id,
                                "itemType": Terrasoft.ViewItemType.LABEL,
                                "caption": {
                                    "bindTo": "CurrencyValue"
                                },
                                "classes": {"labelClass": ["indicator-value " + fontStyle]}
                            }
                        ]
                    }
                ]
            };
            return result;
        }
    });

    /* Класс модели представления модуля показателя валюты. */
    Ext.define("Terrasoft.configuration.CurrencyIndicatorViewModel", {
        extend: "Terrasoft.BaseModel",
        alternateClassName: "Terrasoft.CurrencyIndicatorViewModel",
        Ext: null,
        Terrasoft: null,
        sandbox: null,
        columns: {
            /* Название валюты. */
            CurrencyName: {
                type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
                dataValueType: Terrasoft.DataValueType.TEXT,
                value: null
            },
            /* Значение валюты. */
            CurrencyValue: {
                type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
                dataValueType: Terrasoft.DataValueType.FLOAT,
                value: null
            }
        },
        onRender: Ext.emptyFn,
        /* В зависимости от названия, возвращает значение валюты. Метод приведен в качестве примера. Для пользовательской задачи необходимо выбрать индивидуальный способ получения данных, например, REST API, запрос к базе данных и т. д. */
        getCurrencyValue: function(currencyName, callback, scope) {
            var result = 0;
            if (currencyName === "USD to EUR") {
                result = 0.95;
            }
            if (currencyName === "EUR to USD") {
                result = 1.06;
            }
            callback.call(scope || this, result);
        },
        /* Получает и отображает данные на дашборде. */
        prepareIndicator: function(callback, scope) {
            this.getCurrencyValue(this.get("CurrencyName"), function(currencyValue) {
                this.set("CurrencyValue", currencyValue);
                callback.call(scope);
            }, this);
        },
        /* Инициализирует дашборд. */
        init: function(callback, scope) {
            this.prepareIndicator(callback, scope);
        }
    });

    /* Класс модуля дашборда. */
    Ext.define("Terrasoft.configuration.CurrencyIndicatorModule", {
        extend: "Terrasoft.IndicatorModule",
        alternateClassName: "Terrasoft.CurrencyIndicatorModule",
        /* Название класса модели представления дашборда. */
        viewModelClassName: "Terrasoft.CurrencyIndicatorViewModel",
        /* Название класса-генератора конфигурации представления. */
        viewConfigClassName: "Terrasoft.CurrencyIndicatorViewConfig",
        /* Подписка на сообщения сторонних модулей. */
        subscribeMessages: function() {
            this.sandbox.subscribe("GenerateIndicator", this.onGenerateIndicator, this, [this.sandbox.id]);
        }
    });

    return Terrasoft.CurrencyIndicatorModule;
});