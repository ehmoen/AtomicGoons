﻿namespace AtomicGoons.Models;

public class ActionResponse
{
    public ActionResponse()
    {
        
    }
    
    public ActionResponse(bool success, string message)
    {
        Success = success;
        Messages = new List<string>() { message };
    }

    public bool Success { get; set; }
    public List<string> Messages { get; set; }
}