"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
const emailTemplate_1 = require("../common/utils/emailTemplate");
let MailerService = class MailerService {
    constructor(configService) {
        this.configService = configService;
        this.mailTransport = () => {
            const transporter = nodemailer.createTransport({
                host: this.configService.get('MAIL_HOST'),
                port: this.configService.get('MAIL_PORT'),
                secure: false,
                auth: {
                    user: this.configService.get('MAIL_USER'),
                    pass: this.configService.get('MAIL_PASSWORD'),
                },
            });
            return transporter;
        };
    }
    template(html, replacement) {
        return html.replace(/%(\w*)%/g, function (p, key) {
            return replacement.hasOwnProperty(key) ? replacement[key] : '';
        });
    }
    async sendEmail(sendEmailDto) {
        const { from, recipients, subject } = sendEmailDto;
        console.log(sendEmailDto.placeholderReplacement);
        const customizedHtml = sendEmailDto.placeholderReplacement
            ? this.template(emailTemplate_1.html, sendEmailDto.placeholderReplacement)
            : emailTemplate_1.html;
        const transport = this.mailTransport();
        const options = {
            from: from ?? {
                name: this.configService.get('APP_NAME'),
                address: this.configService.get('DEFAULT_MAIL_FROM'),
            },
            html: customizedHtml,
            to: recipients,
            subject,
        };
        try {
            const result = transport.sendMail(options);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailerService);
//# sourceMappingURL=mailer.service.js.map