using ItsfAPI.Enums;

namespace ItsfAPI.Requests;
public class PlayerFilterRequest
{
    public Position? Position { get; set; }
    public int? Rating { get; set; }
    public decimal? Winrate { get; set; }
}