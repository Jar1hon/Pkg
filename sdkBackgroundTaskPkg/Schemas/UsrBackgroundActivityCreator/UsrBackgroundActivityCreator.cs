namespace Terrasoft.Configuration
{
    using System;
    using Terrasoft.Common;
    using Terrasoft.Core;
    using Terrasoft.Core.DB;
    using Terrasoft.Core.Tasks;
    using System.Threading.Tasks;
        
    public class UsrBackgroundActivityCreator : IBackgroundTask<UsrActivityData>, IUserConnectionRequired
    {
        private UserConnection _userConnection;

        /* Implement the Run method of the IBackgroundTask interface. */
        public void Run(UsrActivityData data) {
            /* Forced 30-second delay. */
            System.Threading.Tasks.Task.Delay(TimeSpan.FromSeconds(45));
            /* Creating activity. */
            var activity = new Activity(_userConnection){
                UseAdminRights = false,
                Id = Guid.NewGuid(),
                TypeId = data.TypeId,
                Title = data.Title,

                /* Activity category is "To do". */
                ActivityCategoryId = new Guid("F51C4643-58E6-DF11-971B-001D60E938C6")
            };
            activity.SetDefColumnValues();
            activity.Save(false);
        }

        /* Implement the SetUserConnection method of the IUserConnectionRequired interface. */
        public void SetUserConnection(UserConnection userConnection) {
            _userConnection = userConnection;
        }
    }
}