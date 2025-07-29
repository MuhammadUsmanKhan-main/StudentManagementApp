import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send.email.dto';
export declare class MailerService {
    private readonly configService;
    constructor(configService: ConfigService);
    mailTransport: () => nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
    template(html: string, replacement: Record<string, string>): string;
    sendEmail(sendEmailDto: SendEmailDto): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
