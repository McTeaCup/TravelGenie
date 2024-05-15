namespace Travel_Ginie_App.Server.Dtos.GeoId
{
	public class GeoInfo
	{

		public bool status { get; set; }
		public string message { get; set; }
		public long timestamp { get; set; }
		public List<GeoData> data { get; set; }
	}

	public class GeoData
	{
		public string title { get; set; }
		public int geoId { get; set; }
		public string documentId { get; set; }
		public string trackingItems { get; set; }
		public string secondaryText { get; set; }
	}

}
