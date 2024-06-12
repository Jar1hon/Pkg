 namespace Terrasoft.Configuration.NsCustomWebServiceNamespace
{
    using System;
    using System.ServiceModel;
    using System.ServiceModel.Web;
    using System.ServiceModel.Activation;
    using Terrasoft.Core;
    using Terrasoft.Web.Common;
    using Terrasoft.Core.Entities; 

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class NsCustomWebService: BaseService
    {
        
        /* Метод, возвращающий идентификатор контакта по имени контакта. */
        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public string GetContactIdByName(string Name) {
            /* Результат по умолчанию. */
            var result = "";
            /* Экземпляр EntitySchemaQuery, обращающийся в таблицу Contact базы данных. */
            var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "Contact");
            /* Добавление колонок в запрос. */
            var colId = esq.AddColumn("Id");
            var colName = esq.AddColumn("Name");
            /* Фильтрация данных запроса. */
            var esqFilter = esq.CreateFilterWithParameters(FilterComparisonType.Equal, "Name", Name);
            esq.Filters.Add(esqFilter);
            /* Получение результата запроса. */
            var entities = esq.GetEntityCollection(UserConnection);
            /* Если данные получены. */
            if (entities.Count > 0)
            {
                /* Возвратить значение колонки "Id" первой записи результата запроса. */
                result = entities[0].GetColumnValue(colId.Name).ToString();
                /* Также можно использовать такой вариант:
                result = entities[0].GetTypedColumnValue<string>(colId.Name); */
            }
            /* Возвратить результат. */
            return result;
        }
    }
}