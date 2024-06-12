define("ServiceEnterpriseHomePage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "crt.IndicatorWidgetd0098b07-5e75-2979-d980-efb26a3309ed",
				"values": {
					"layoutConfig": {
						"row": 3,
						"rowSpan": 2,
						"column": 3,
						"colSpan": 2
					}
				}
			},
			{
				"operation": "move",
				"name": "crt.IndicatorWidgetd0098b07-5e75-2979-d980-efb26a3309ed",
				"parentName": "Main",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "merge",
				"name": "crt.IndicatorWidget1f843599-3298-7d39-6c18-66b2aa38ba03",
				"values": {
					"layoutConfig": {
						"row": 5,
						"rowSpan": 2,
						"column": 3,
						"colSpan": 2
					}
				}
			},
			{
				"operation": "remove",
				"name": "crt.IndicatorWidgetd4b6d823-86c7-8947-005c-7d016680f4bf"
			},
			{
				"operation": "remove",
				"name": "crt.IndicatorWidget2efb8e03-18ea-f237-831c-550975cb8891"
			},
			{
				"operation": "insert",
				"name": "IndicatorWidgetf9546777-a293-9b29-cbcc-7f1ae6ce5982",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"rowSpan": 2,
						"colSpan": 2
					},
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidgetf9546777a2939b29cbcc7f1ae6ce5982_title)#",
						"theme": "full-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidgetf9546777a2939b29cbcc7f1ae6ce5982_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium"
						},
						"data": {
							"providing": {
								"schemaName": "CurrencyRate",
								"aggregation": {
									"column": {
										"expression": {
											"expressionType": 1,
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 0,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Rate"
											}
										}
									}
								},
								"filters": {
									"filter": {
										"items": {
											"8317ad8d-56af-442b-ac64-bd6ff8a0362e": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "Currency"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "Currency",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Доллар",
																"Id": "915e8a55-98d6-df11-9b2a-001d60e938c6",
																"value": "915e8a55-98d6-df11-9b2a-001d60e938c6",
																"displayValue": "Доллар"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "CurrencyRate"
									}
								}
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ",",
								"decimalPrecision": 2,
								"thousandSeparator": " "
							}
						}
					},
					"selected": false,
					"dragging": false,
					"currentLayoutConfig": {
						"column": 1,
						"row": 1,
						"rowSpan": 2,
						"colSpan": 2
					}
				},
				"parentName": "Main",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget2ca2d894-f29e-f98d-4dc9-2e60a555b71e",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"rowSpan": 2,
						"colSpan": 2
					},
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget2ca2d894f29ef98d4dc92e60a555b71e_title)#",
						"theme": "full-fill",
						"layout": {
							"color": "blue"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget2ca2d894f29ef98d4dc92e60a555b71e_template)#",
							"metricMacros": "{0}",
							"fontSizeMode": "medium"
						},
						"data": {
							"providing": {
								"schemaName": "CurrencyRate",
								"aggregation": {
									"column": {
										"expression": {
											"expressionType": 1,
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 0,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Rate"
											}
										}
									}
								},
								"filters": {
									"filter": {
										"items": {
											"8317ad8d-56af-442b-ac64-bd6ff8a0362e": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "Currency"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "Currency",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Евро",
																"Id": "c0057119-53e6-df11-971b-001d60e938c6",
																"value": "c0057119-53e6-df11-971b-001d60e938c6",
																"displayValue": "Евро"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "CurrencyRate"
									}
								}
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ",",
								"decimalPrecision": 2,
								"thousandSeparator": " "
							}
						}
					},
					"selected": false,
					"dragging": false,
					"currentLayoutConfig": {
						"column": 1,
						"row": 3,
						"rowSpan": 2,
						"colSpan": 2
					}
				},
				"parentName": "Main",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "GridContainer22965b1f-8e76-4455-27da-7ea097e4f2d8",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 13,
						"colSpan": 1,
						"rowSpan": 1
					},
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "large"
					},
					"items": []
				},
				"parentName": "Main",
				"propertyName": "items",
				"index": 12
			},
			{
				"operation": "move",
				"name": "crt.ChartWidget71615f3b-5806-d655-c1d5-28aa86aa759a",
				"parentName": "Main",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "move",
				"name": "crt.ChartWidget28ef0973-a8a1-4b3a-ca71-633a2f2e3f5d",
				"parentName": "Main",
				"propertyName": "items",
				"index": 11
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfig: /**SCHEMA_VIEW_MODEL_CONFIG*/{}/**SCHEMA_VIEW_MODEL_CONFIG*/,
		modelConfig: /**SCHEMA_MODEL_CONFIG*/{}/**SCHEMA_MODEL_CONFIG*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/
	};
});