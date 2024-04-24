namespace Travel_Ginie_App.Server.HotelDtos
{
    public class NearbyTransport
    {
        public int location_id { get; set; }
        public string name { get; set; }
        public string location_description { get; set; }
        public double distance_from_location_km { get; set; }
    }
}
