namespace Travel_Ginie_App.Server.EventDto
{
    public class Root
    {
        public string status { get; set; }
        public string request_id { get; set; }
        public Parameters parameters { get; set; }
        public List<Datum> data { get; set; }
    }
}
