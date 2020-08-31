import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Appointment from "../infra/typeorm/entities/Appointment";
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider_id: string;
    date: Date;
};

class CreateAppointmentService {
    public async execute({ date, provider_id}: Request): Promise<Appointment>{
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);


        const findAppointmentInSamedate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if(findAppointmentInSamedate) {
            throw AppError('This appointment is alreadt booked');
        };

        const appointment = await appointmentsRepository.create({
            date: appointmentDate,
            provider_id,
    });


        return appointment;
    }
};

export default CreateAppointmentService;
