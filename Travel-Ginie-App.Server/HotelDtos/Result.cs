namespace Travel_Ginie_App.Server.HotelDtos
{
    public class Result
    {
        public int id { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int reviews { get; set; }
        public double rating { get; set; }
        public string website { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string link { get; set; }
        public string address { get; set; }
        public DetailedAddress detailed_address { get; set; }
        public string latitude_longitude { get; set; }
        public string featured_image { get; set; }
        public int total_images { get; set; }
        public int total_rooms { get; set; }
        public string hotel_classified_by { get; set; }
        public Ranking ranking { get; set; }
        public ReviewsPerRating reviews_per_rating { get; set; }
        public List<NearbyNeighborhood> nearby_neighborhoods { get; set; }
        public List<NearbyTransport> nearby_transports { get; set; }
        public string phone_simple { get; set; }
        public List<string> review_keywords { get; set; }
        public List<LocationHierarchy> location_hierarchy { get; set; }
        public Amenities amenities { get; set; }
    }
}
