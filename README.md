# Talker-Manager

Projeto Talker-Manager é uma REST API desenvolvida para gerenciar um sistema de palestrantes. O sistema conta com CRUD, armazenado os dados de palestrantes e conteúdo da palestra, possibilitando consultas e registros de novos palestrantes, assim como o update dos palestrantes existentes e exclusão de palestrantes cadastrados.

### Tecnologias utilizadas

- **Javascript**
- **Node.js**
- **MySQL**
- **Express.js**
- **Mocha**
- **Chai**
- **Sinon**

### Para rodar localmente

Clone o projeto para o seu repositório local.

```
git clone git@github.com:vinicius-shk/Talker-Manager.git

```

Acesse a raiz do projeto e rode os comandos para instalar as dependências e subir o docker

```
cd Talker-Manager && npm i && docker-compose up -d

```

Inicie o servidor back-end

```
docker exec talker_manager -it && npm run dev

```

Realize as requisições na porta **3000**
