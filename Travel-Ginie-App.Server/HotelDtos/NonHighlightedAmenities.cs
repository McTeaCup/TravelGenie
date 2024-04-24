using Microsoft.AspNetCore.Http.Features;

namespace Travel_Ginie_App.Server.HotelDtos
{
    public class NonHighlightedAmenities
    {
        public List<RoomFeature> room_features { get; set; }
        public List<object> room_types { get; set; }
        public List<PropertyAmenity> property_amenities { get; set; }
    }
}
