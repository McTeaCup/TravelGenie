namespace Travel_Ginie_App.Server.EventDto
{
    public class Venue
    {
        public string google_id { get; set; }
        public string name { get; set; }
        public string phone_number { get; set; }
        public string website { get; set; }
        public int review_count { get; set; }
        public double rating { get; set; }
        public string subtype { get; set; }
        public List<string> subtypes { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public string street_number { get; set; }
        public string street { get; set; }
        public string country { get; set; }
        public string timezone { get; set; }
        public string google_mid { get; set; }
        public string full_address { get; set; }
        public string city { get; set; }
        public string state { get; set; }
    }
}
