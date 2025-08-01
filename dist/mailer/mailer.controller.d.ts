import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/send.email.dto';
export declare class MailerController {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendEmail(sendEmailDto: SendEmailDto): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
