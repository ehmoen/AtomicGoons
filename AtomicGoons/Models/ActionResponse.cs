namespace AtomicGoons.Models;

public class ActionResponse
{
    public ActionResponse(List<string> messages)
    {
        Messages = messages;
    }
    
    public ActionResponse(bool success, string message, List<string> messages)
    {
        Success = success;
        Messages = new List<string>() { message };
    }

    public bool Success { get; set; }
    public List<string> Messages { get; set; }
}