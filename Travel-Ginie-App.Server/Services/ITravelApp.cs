using Travel_Ginie_App.Server.AIResponseDTO;
using Travel_Ginie_App.Server.TripPlanDto;

namespace Travel_Ginie_App.Server.Services
{
    public interface ITravelApp
    {
        Task<List<string>> GetCountryNames();//done
        Task<List<string>> GetCities(string country);//done
        Task<List<string>> GetAttractions(string city);
        Task<string> GetRestaurants(string city);
        Task<List<string>> GetHotelDetails(string location);

        Task <TripPlan>GetTravelPlan(string day, string city);//done

        Task<List<object>> GetEvents(string type, string city);//done

        Task<AiTripPlanDTO>GetPlanDetail(string country,string city,DateTime startdate,DateTime enddate,string companion, decimal budjet,int numberofppl, string[]activity);
    }
}
