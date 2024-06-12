 define("AccountPageV2", [], function() {
    return {
        entitySchemaName: "Account",
        diff: /**SCHEMA_DIFF*/[
            /* Добавление вкладки [WEB].*/
            {
                "operation": "insert",
                "name": "WebTab",
                "values": {
                    "caption": "WEB",
                    "items": []
                },
                "parentName": "Tabs",
                "propertyName": "tabs",
                "index": 1
            },
            /* Добавление компонента IFrameControl.*/
            {
                "operation": "insert",
                "name": "UsrIframe",
                "parentName": "WebTab",
                "propertyName": "items",
                "values": {
                    "itemType": Terrasoft.ViewItemType.IFRAMECONTROL,
                    "src": {
                        "bindTo": "getSource"
                    }
                }
            }
        ]/**SCHEMA_DIFF*/,
        methods: {
            /* Используется для привязки данных.*/
            getSource: function() {
                return this.get("Web");
            }
        }
    };
});