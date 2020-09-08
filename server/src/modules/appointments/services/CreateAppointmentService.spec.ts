import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('Should be able to create a new appointmnet',  async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

        const appointmnet = await createAppointment.execute({
            date: new Date(),
            provider_id: '123123',
        });

        expect(appointmnet).toHaveProperty('id');
        expect(appointmnet.provider_id).toBe('123123');

    });

    it('Should not be able to create two appointmnet on the same time',  async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123',
        });

        expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123',
        })).rejects.toBeInstanceOf(AppError)

    });

});