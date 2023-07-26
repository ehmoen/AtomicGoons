using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace AtomicGoons.Services;

public class EmailSender : IEmailSender
{
    private readonly ILogger<EmailSender> _logger;
    private readonly EmailSenderOptions _options;

    public EmailSender(IOptions<EmailSenderOptions> optionsAccessor, ILogger<EmailSender> logger)
    {
        _options = optionsAccessor.Value;
        _logger = logger;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        if (string.IsNullOrEmpty(_options.SmtpServer))
        {
            throw new Exception("Null SMTP server configuration");
        }

        await Execute(toEmail, subject, message);
    }

    public async Task Execute(string toEmail, string subject, string message)
    {
        var emailMessage = new MimeMessage
        {
            From = { new MailboxAddress(_options.SenderName, _options.SenderEmail) },
            To = { MailboxAddress.Parse(toEmail) },
            Subject = subject,
            Body = new TextPart(TextFormat.Html) { Text = message }
        };

        using (var client = new SmtpClient())
        {
            await client.ConnectAsync(_options.SmtpServer, _options.SmtpPort, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_options.SmtpUsername, _options.SmtpPassword);
            await client.SendAsync(emailMessage);
            await client.DisconnectAsync(true);
        }

        _logger.LogInformation($"Email to {toEmail} sent successfully!");
    }
}