import ISendMailDTO from '../dtos/ISendMailTDO';

export default interface IMailProvider {
    sendMail(data:ISendMailDTO): Promise<void>;
}
