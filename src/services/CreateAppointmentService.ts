import { startOfHour } from 'date-fns';
import Appointment from "../models/Appointment";
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO  {
    provider: string;
    date: Date;
};

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    };

    execute({ provider, date }: RequestDTO ): Appointment {
        const appointmentDate = startOfHour(date);


        const findAppointmentInSamedate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if(findAppointmentInSamedate) {
            throw Error('This appointment is alreadt booked');
        };

    const appointment = this.appointmentsRepository.create({
        provider,
        date: appointmentDate,
    });

    return appointment;
    }
};

export default CreateAppointmentService;
