using System;

namespace Travel_Ginie_App.Server.EventDto
{
    public class Datum
    {
        public string event_id { get; set; }
        public string event_mid { get; set; }
        public string name { get; set; }
        public string link { get; set; }
        public string description { get; set; }
        public string start_time { get; set; }
        public string end_time { get; set; }
        public bool is_virtual { get; set; }
        public List<TicketLink> ticket_links { get; set; }
        public List<InfoLink> info_links { get; set; }
        public Venue venue { get; set; }
        public List<string> tags { get; set; }
        public string language { get; set; }
        public string thumbnail { get; set; }
    }
}
