namespace Terrasoft.Core.Process.Configuration
{

	using Newtonsoft.Json;
	using Newtonsoft.Json.Linq;
	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
    using System.Data;
    using System.Globalization;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Process;
	using Terrasoft.UI.WebControls.Controls;

	#region Class: NsSelectUserTask

	/// <exclude/>
	public partial class NsSelectCountryUserTask
	{

		#region Methods: Protected

		protected override bool InternalExecute(ProcessExecutingContext context)
		{
			var select = new Select(UserConnection)
			 .Column("Country","Name")
			 .From("Country")
             .Join(JoinType.Inner, "City")
             .On("Country", "Id").IsEqual("City", "CountryId")
			 .Where("City","Id").IsEqual(Column.Parameter(CityId)) as Select;
			Result = select.ExecuteScalar<String>();
			return true;
		}


		#endregion

		#region Methods: Public

		public override bool CompleteExecuting(params object[] parameters) {
			return base.CompleteExecuting(parameters);
		}

		public override void CancelExecuting(params object[] parameters) {
			base.CancelExecuting(parameters);
		}

		public override string GetExecutionData() {
			return string.Empty;
		}

		public override ProcessElementNotification GetNotificationData() {
			return base.GetNotificationData();
		}

		#endregion

	}

	#endregion

}

