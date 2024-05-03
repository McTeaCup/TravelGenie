using Travel_Ginie_App.Server.Dtos;

namespace Travel_Ginie_App.Server.Services
{
    public interface ITravel
    {
        Task<List<string>> GetCountryNames();//done
        Task<List<string>> GetCities(string country);//done
        Task<ChatGptDto> GetPlanDetail(string propt);
    }
}

