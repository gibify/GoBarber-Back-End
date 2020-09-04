import { container } from 'tsyringe';

import IHahsProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHahsProvider>('HashProvider', BCryptHashProvider)
