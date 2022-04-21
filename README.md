# Desafio Magalu

## Objetivo do Projeto
Criação de 3 endpoints relativos ao envio de comunicação: 
1. Agendamento de envio de comunicação;
2. Consulta do envio da comunicação;
3. Cancelamento do envio da comunicação.

## Informações de Domínio 

Para implementação do projeto, foram assumidas as seguintes representações para as variáveis de domínio:

1. Formatos de Comunicação: { email: 1, sms: 2, push: 3, whatsapp: 4 }
2. Status de Comunicação: { waiting: 1, sent: 2, cancelled: 3 }


## Principio de Funcionamento

1. Toda solicitação de agendamento bem sucedida retorna como reposta da requisição um token único (RFC4122); este token é utilizado nas etapas de consulta e cancelamento de agendamento comunicação.

2. Para meios de simplificação, o identificador escolhido para o destinatário foi o e-mail, que pode ser um identificador único e pouco invasivo.

3. Status e Tipo de entrega foram definidos como inteiros considerando que ambos os conjuntos tendem a ser mantidos pequenos, alémde facilitar as operações de atualização dos registros (Mudanças de status para cancelamento e confirmação de envio).

## Linguagem de Programação Escolhida:
JavaScript (Node)

## Tecnologia de Banco de Dados Escolhida:
MySQL

## Como Executar:
1. Utilizando a CLI ou ferramenta gráfica, execute o script **create_database.sql**, que se encontra na pasta **database**.
2. Crie um arquivo chamado **config.env** dentro da pasta **communication_backend**. Este arquivo deve armazenar informações sensiveis que não devem estar no repositório. Necessariamente deve conter as propriedades:

   SERVER_PORT=**3000**
   
   DATABASE_HOST=**Endereço IP do host. Para testar com Docker, utilizar: host.docker.internal**
   
   DATABASE_USER=**usuario autorizado com as operações CRUD no banco de dados criado**
   
   DATABASE_PASSWORD=**senha do usuário**
   
   DATABASE_NAME=**dbcommunication**
   
   DATABASE_CONNECTION_LIMIT=**Número inteiro referente ao máximos de conexões permitidas (Utilizado o valor 5 durantes os testes)**
   
   
3. Para executar localmente:

  No contexto do diretório **communication_backend** execute o comando **npm install** para obter as dependências.
  
  No contexto do diretório **communication_backend** execute o comando **npm start**

4. Para executar com Docker:

   No contexto do diretório **communication_backend** execute o comando **docker-compose up**


## Como Executar a Suíte de Testes:
1.  No contexto do diretório **communication_backend** execute o comando **npm test** para executar a suíte de testes. Os testes criados foram:

   **Receive Valid Token using % as delivery type**: Verifica se um token de confirmação válido é devolvido para solicitações envolvendo todos os tipos de comunicação do escopo (endpoint 1).
   
   **Refuse invalid e-mail**: Verifica se o endpoint 1 está respondendo com mensagem de erro para os casos onde o e-mail enviado não corresponde ao padrão de validação básica.
   
   **Refuse invalid date**: Verifica se o endpoint 1 está respondendo com mensagem de erro para os casos onde a data de agendamento enviada não corresponde a uma data válida no formato ISO8601.
   
   **Refuse invalid message**: Verifica se o endpoint 1 está respondendo com mensagem de erro para os casos onde a mensagem enviada não corresponde ao padrão de validação básica (Mínimo de 10 caracteres).
    
   **Refuse invalid delivery type**: Verifica se o endpoint 1 está respondendo com mensagem de erro para os casos onde o formato de comunicação não é válido (email: 1, sms: 2, push: 3, whatsapp: 4).
   
    **Check if status of a new communication request equals to waiting**: Verifica se o endpoint 2 está respondendo com o status waiting para mensagens recem criadas.
    
    **Refuse check without token**: Verifica se o endpoint 2 está retornando erro 500 para requisições que não contenham token de verificação.
    
    **Refuse check with invalid token**: Verifica se o endpoint 2 está retornando erro 500 para requisições que não contenham token válido de verificação (RFC4122).
      
   **Check if status of a cancelled communication equals to cancelled**: Verifica se o endpoint 3 está alterando o status da solicitação de comunicação para cancelled (3).
    
    **Refuse cancellation without token**:Verifica se o endpoint 3 está retornando erro 500 para requisições que não contenham token de verificação.
    
    **Refuse cancellation without token**: Verifica se o endpoint 3 está retornando erro 500 para requisições que não contenham token válido de verificação (RFC4122).


## Exemplo de Chamada para os endpoints (Executados em localhost ou instância do Docker em localhost):

1. **Endpoint 1:**

   **Método**: POST
   
   **Endereço**: http://127.0.0.1:3000/communicationrequest/register
   
   **Corpo da request**: {"deliveryTime": "2022-05-10T01:00:00.000Z", "receiverEmail": "fulano@hotmail.com", "message": "No minimo 10 caracteres", "deliveryType": 1}


2. **Endpoint 2:**

   **Método**: POST
   
   **Endereço**: http://127.0.0.1:3000/communicationrequest/check
   
   **Corpo da request**: {
    "communicationRequestToken":"f8947372-05ca-47f1-ac4a-1711493f573c"
    }

3. **Endpoint 3:**

   **Método**: POST
   
   **Endereço**: http://127.0.0.1:3000/communicationrequest/cancel
   
   **Corpo da request**: {
    "communicationRequestToken":"f8947372-05ca-47f1-ac4a-1711493f573c"
    }

## Exemplos de arquivo config.env preenchido

1. **Docker**:

   SERVER_PORT=3000
   
   DATABASE_HOST= host.docker.internal

   DATABASE_USER=root
   
   DATABASE_PASSWORD=root
   
   DATABASE_NAME=dbcommunication

   DATABASE_CONNECTION_LIMIT=5
   
2. **Localhost**:
 
   SERVER_PORT=3000
   
   DATABASE_HOST=127.0.0.1

   DATABASE_USER=root
   
   DATABASE_PASSWORD=root
   
   DATABASE_NAME=dbcommunication

   DATABASE_CONNECTION_LIMIT=5
 
