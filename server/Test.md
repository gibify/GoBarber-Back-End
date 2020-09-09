# Recuperação de Senha:

**Requisitos Funcionais**

- O usuário deve poder recuparar sua senha informando o seu email.
- O usuário deve receber um email com as instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos Não Funcionais**

- Ultilizar o Mailtrap para testar os envios em ambiente de dev;
- Ultilizar Amazon SES para envios de email em produção;
- O envio de email deve acontecer em segundo plano (background job);

**Regra de Negócio**

- O link enviado por email para resetar a senha, deve expirar em 2horas;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do Perfil:

**Requisitos Funcionais**

- O usuário deve poder atualizar seu perfil (nome, email e senha);

**Regra de Negócio**

- O usuário não pode alterar seu email para um email já ultilizado;
 - Para atualizar sua senha, o usuário deve informar a senha antiga;
 - Para atualizar sua senha, o usuário precisa confirmar a nova senha;


# Agendamento de Serviços:

**Requisitos Funcionais**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazenada em cache;

**Regra de Negócio**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar dispníveis entre 8h ás 18h (Primeiro às 8h, último as 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuártio não pode agendar serviços consigo mesmo;

 # Painel do Prestador:

 **Requisitos Funcionais**

 - O usuário deve poder listar seus agendamentos de um dia específico;
 - O prestador deve receber uma notificação sempre que houver um novo agendamento;
 - O prestador deve pdoer visualizar as notificações não lidas;

 **Requisitos Não Funcionais**

 - Os agendamentos do prestador no dia devem ser armazendas em cache;
 - As notificações do prestador devem ser enviadas em tempo real ultilizando Socket.io;

 **Regra de Negócio**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;
