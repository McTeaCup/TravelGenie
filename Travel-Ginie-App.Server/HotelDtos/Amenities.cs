namespace Travel_Ginie_App.Server.HotelDtos
{
    public class Amenities
    {
        public List<LanguagesSpoken> languages_spoken { get; set; }
        public HighlightedAmenities highlighted_amenities { get; set; }
        public NonHighlightedAmenities non_highlighted_amenities { get; set; }
    }
}
