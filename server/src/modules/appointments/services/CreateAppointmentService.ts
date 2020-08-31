import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    date: Date;
};

class CreateAppointmentService {
    constructor(private appointmentsRepository: IAppointmentsRepository) {}

    public async execute({ date, provider_id}: IRequest): Promise<Appointment>{
        const appointmentDate = startOfHour(date);


        const findAppointmentInSamedate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if(findAppointmentInSamedate) {
            throw new AppError('This appointment is alread booked');
        };

        const appointment = await this.appointmentsRepository.create({
            date: appointmentDate,
            provider_id,
    });


        return appointment;
    }
};

export default CreateAppointmentService;
