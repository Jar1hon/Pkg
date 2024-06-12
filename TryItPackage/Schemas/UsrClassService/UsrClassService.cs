 namespace Terrasoft.Configuration.UsrClassService
{
    using System;
    using System.ServiceModel;
    using System.ServiceModel.Web;
    using System.ServiceModel.Activation;
    using Terrasoft.Core;
    using Terrasoft.Core.DB;
    using Terrasoft.Common;
    using Terrasoft.Web.Common;
    using Terrasoft.Core.Entities; 

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrClassService: BaseService
    {

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public int GetTrainingsQuantity(string code) {
            var classQuery = new Select(UserConnection)
                .Column("Id")
                .From("UsrClass")
                .Where("UsrCode")
                    .IsEqual(Column.Parameter(code))
                as Select;
            Guid id = classQuery.ExecuteScalar<Guid>();
            if (id==Guid.Empty) {
                return -1;
            }
            var countQuery = new Select(UserConnection)
                .Column(Func.Count("Id")).As("Count")
                .From("UsrGroupTraining")
                .Where("UsrClassId")
                    .IsEqual(Column.Parameter(id))
                as Select;
            int result = countQuery.ExecuteScalar<int>();
            
            return result;
        }
    }
}